import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonComponent, ButtonType, DrawerComponent, DrawerConfig, FieldConfig, PaginationConfig, SelectComponent, TableColumn, TableComponent, TableConfig, TextboxComponent, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ProviderRatesDataService } from '../../../data-access/tools/provider-rates/provider-rates.api';

@Component({
  selector: 'app-provider-rates',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule, ButtonComponent, TextboxComponent,DrawerComponent,SelectComponent],
  templateUrl: './provider-rates.html',
  styleUrl: './provider-rates.scss',
})
export class ProviderRates {
  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);

  @ViewChild('drawer') drawer!: DrawerComponent;

  extraButtons = [
    {
      label: 'Add Rate',
      type: 'primary' as ButtonType,
      icon: 'add',
      click: () => this.open()
    }
  ]



  fullData: any[] = []
  currentPage = 1;
  pageSize = 20;
  readonly pageSizeOptions = [20, 40, 60, 80, 100];
  startRecord = 1;
  endRecord = 10;
  currentSearchTerm = '';
  currentSort: Sort = { active: '', direction: '' };
  drawerDetails: any = {}
  isEditMode = false
  isCreateMode = false;

  rateConfig: TableConfig = {
    showSearch: true,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: true,
    isCheckBox: false
  }

  drawerConfig: DrawerConfig = {
    title: '',
    hasClose: true,
    closeOnBackdropClick: true,
    autoOpen: false
  }

   selectConfig: FieldConfig = {
    name: 'type',
    label: 'Type',
    placeholder: 'Select Type',
    hasSearch: false,
    options: [
      { key: 'SMS', value: 'sms' },
      { key: 'VOICE', value: 'voice' },
      { key: 'EMAIL', value: 'email' },
      { key: 'TEXT TO SPEECH', value: 'text_to_speech' },
      { key: 'SPEECH TO TEXT', value: 'speech_to_text' },
      { key: 'PAY PER ACTION RVM', value: 'pay_per_action_rvm' },
      { key: 'PAY PER ACTION CAI', value: 'pay_per_action_cai' },
      { key: 'IVA INTENT DETECTION', value: 'iva_intent_detection' },

    ]
  };

  selectRoleConfig: FieldConfig = {
    name: 'role_type',
    label: 'Role Type',
    placeholder: 'Select Role Type',
    hasSearch: false,
    options: [
      { key: 'Open AI($0.015+)', value: 'open_ai' },
      { key: 'Azure ($0.016+)', value: 'azure' },
      { key: 'Basic($0.004+)', value: 'basic' },
      { key: 'Enhanced($0.016+)', value: 'enhanced' },

    ]
  };
  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', searchable: true },
    { key: 'id', label: 'ID', searchable: true },
    { key: 'name', label: 'Name', sortable: true, searchable: true,clickable:true,onClick:(row)=>{this.openDrawer(row,false)}  },
    { key: 'rate_out_cents', label: 'Rate Out (Cents)', sortable: true, searchable: true },
    { key: 'rate_in_cents', label: 'Rate In (Cents)', searchable: true },
    { key: 'rate_toll_free_out_cents', label: 'Rate Toll-free Out (Cents', sortable: true, searchable: true },
    { key: 'rate_toll_free_in_cents', label: 'Rate Toll-free In (Cents', sortable: true, searchable: true },
    { key: 'rate_short_code_out_cents', label: 'Rate Short-code Out (Cents)', sortable: true, searchable: true },
    { key: 'rate_short_code_in_cents', label: 'Rate Short-code In (Cents)', sortable: true, searchable: true },
    { key: 'unit_cost_name', label: 'Unit Cost Name', sortable: true, searchable: true },
    { key: 'unit_cost_cents', label: 'Unit Cost (Cents)', sortable: true, searchable: true },
    { key: 'type', label: 'Type', sortable: true, searchable: true },
    { key: 'created_at', label: 'Created At', sortable: true, searchable: true },

    {
      key: 'actions',
      label: 'Actions',
      type: 'action',
      sortable: false,
      actions: [

        { icon: 'edit', tooltip: 'Settings', callback: (row) => this.editSettings(row) },

      ],
    },
  ];


  createRateForm = new FormGroup({
    type: new FormControl(''),
    name: new FormControl(''),
    rate_out: new FormControl(''),
    rate_in: new FormControl(''),
    rate_toll_free_out: new FormControl(''),
    rate_toll_free_in: new FormControl(''),
    rate_short_code_out: new FormControl(''),
    rate_short_code_in: new FormControl(''),
  
  });

  editRateForm = new FormGroup({
    type: new FormControl(''),
    rate_type: new FormControl(''),
    name: new FormControl(''),
    unit_cost_name: new FormControl(''),
    unit_cost_cents: new FormControl(''),
  });

  constructor(private providerratesDataService: ProviderRatesDataService) { }
  ngOnInit() {
    this.loadRates()

  }

  private destroy$ = new Subject<void>()

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }


  get paginationConfig(): PaginationConfig {
    const total = this.totalRecordsSubject.getValue();
    return {
      totalRecords: total,
      currentPage: this.currentPage,
      totalPages: Math.max(1, Math.ceil(total / this.pageSize)),
      pageSize: this.pageSize,
      pageSizeOptions: this.pageSizeOptions,
      startRecord: this.startRecord,
      endRecord: this.endRecord
    };
  }


  loadRates(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ): void {

    this.providerratesDataService.getProviderRates().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        const fullData = res

        if (!Array.isArray(fullData)) {
          console.error("Expected array but received:", res);
          return;
        }


        this.fullData = [...fullData];

        let data = [...fullData];


        /** ----------------- Searching ----------------- */
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();



          data = data.filter(row =>
            Object.values(row).some((value) =>
              String(value).toLowerCase().includes(term)
            )
          );
        }

        /** ----------------- Sorting ----------------- */
        if (sort.active && sort.direction) {
          const direction = sort.direction === 'asc' ? 1 : -1;

          data = data.sort((a, b) => {
            const A = a[sort.active];
            const B = b[sort.active];

            if (A < B) return -1 * direction;
            if (A > B) return 1 * direction;
            return 0;
          });
        }

        /** ----------------- Pagination ----------------- */
        const start = (page - 1) * size;
        const end = start + size;

        const paginated = data.slice(start, end).map((item, index) => ({
          ...item,
          sl: start + index + 1
        }));


        /** ----- Update subjects ----- */
        this.dataSubject.next(paginated);
        this.totalRecordsSubject.next(data.length);

        /** ----- Update internal state ----- */
        this.currentPage = page;
        this.pageSize = size;
        this.currentSearchTerm = searchTerm;
        this.currentSort = sort;

        /** ----- Update display ---- */
        this.startRecord = start + 1;
        this.endRecord = Math.min(end, data.length);
      },

      error: (err) => {
        console.error("Failed to load :", err);
      },

      complete: () => {
        this.rateConfig.loading = false;
      }
    });

  }

  onSortChange(sort: Sort) {
    this.loadRates(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onPageChange(page: number) {
    this.loadRates(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadRates(1, size, this.currentSearchTerm, this.currentSort);
  }

  onSearch(term: string) {
    this.loadRates(1, this.pageSize, term, this.currentSort);
  }

  editSettings(row: any) {
    this.openDrawer(row, true)

  }

  open(){
    this.drawerDetails = null;
    this.isEditMode = true;
    this.isCreateMode = true;
    this.createRateForm.reset();

    this.drawerConfig = {
      ...this.drawerConfig,
      title: 'Add Provider Rates'
    };

    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('closed');
    drawerEl?.classList.add('open');

    this.drawer.open()
    
  }

  openDrawer(row:any, isEditMode: boolean = false) {
    this.drawerDetails = row;
    this.isEditMode = isEditMode;
    this.isCreateMode = false;

    this.drawerConfig = {
      ...this.drawerConfig,
      title: isEditMode ? `Edit Provider Rate/${row.name}` : `Provider Rate/${row.name}`,
      autoOpen: true
    };

    if(this.isEditMode){
      this.patchEditForm(row);
    }
    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('closed');
    drawerEl?.classList.add('open');
    this.drawer.open();

  }

    
  handleDrawerClose() {
    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('open');
    drawerEl?.classList.add('closed');
  }


   setEditMode(value: boolean) {
    this.isEditMode = value;

    if (value) {
      if (this.drawerDetails) {
        this.patchEditForm(this.drawerDetails);
      }
    } else {
    }
  }

  saveChanges() {
    const formValue = this.isCreateMode ? this.createRateForm.getRawValue() : this.editRateForm.getRawValue();
    console.log(formValue, this.isCreateMode ? 'created' : 'updated');
    this.drawer.close();
  }

  private patchEditForm(row: any) {
    this.editRateForm.patchValue({
      rate_type: row.rate_type ?? '',
      name: row.name ?? '',
      unit_cost_name: row.unit_cost_name ?? '',
      unit_cost_cents: row.unit_cost_cents ?? '',
      type: row.type ?? '',
      
    });
  }


}

