import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonComponent, ButtonType, DrawerComponent, DrawerConfig, PaginationConfig, TableColumn, TableComponent, TableConfig, TableFilterConfig, TextareaComponent, TextboxComponent, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { BillingComponentDataService } from '../../../data-access/tools/billing-component/billing-component.api';

@Component({
  selector: 'app-billing-component',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule,ButtonComponent,DrawerComponent,TextboxComponent,TextareaComponent],
  templateUrl: './billing-component.html',
  styleUrl: './billing-component.scss',
})
export class BillingComponent {
  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);


 @ViewChild ('drawer') drawer! : DrawerComponent

  fullData: any[] = []
  currentPage = 1;
  pageSize = 20;
  readonly pageSizeOptions = [20, 40, 60, 80, 100];
  startRecord = 1;
  endRecord = 10;
  currentSearchTerm = '';
  currentSort: Sort = { active: '', direction: '' };
  drawerDetails:any={}
  isEditMode = false;

  billingConfig: TableConfig = {
    showSearch: true,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: false,
    isCheckBox: false
  }

   drawerConfig: DrawerConfig = {
    title: '',
    hasClose: true,
    closeOnBackdropClick: true,
    autoOpen: false
  };


  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', searchable: true },
    { key: 'name', label: 'Name', sortable: true, searchable: true ,clickable:true,onClick:(row)=>{this.openDrawer(row,false)}},
    { key: 'description', label: 'Description', searchable: true },
    { key: 'unit_name', label: 'Unit Name', sortable: true, searchable: true },
    

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


  billingForm = new FormGroup({
    name: new FormControl (''),
    description:new FormControl(''),
    unit_name:new FormControl('')

  })

  constructor(private billingComponentDataService: BillingComponentDataService) { }
  ngOnInit() {
    this.loadBillings()

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


  loadBillings(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ): void {

    this.billingComponentDataService.getBillingComponent().pipe(takeUntil(this.destroy$)).subscribe({
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
        this.billingConfig.loading = false;
      }
    });

  }

  onSortChange(sort: Sort) {
    this.loadBillings(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onPageChange(page: number) {
    this.loadBillings(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadBillings(1, size, this.currentSearchTerm, this.currentSort);
  }

  onSearch(term: string) {
    this.loadBillings(1, this.pageSize, term, this.currentSort);
  }

  editSettings(row: UserData) {
      console.log('Edit:', row);

    this.openDrawer(row, true);

  }
  

  openDrawer(row: any, editMode: boolean = false) {
    console.log("clicked", row)

    this.drawerDetails = row;

    this.isEditMode = editMode;

    this.drawerConfig = {
      ...this.drawerConfig,
      title: `${row.name}`
    };

    if (this.isEditMode) {
      this.billingForm.patchValue({
        name: row.name,
        description: row.description,
        unit_name: row.unit_name,

      })
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

      this.billingForm.patchValue({
        name: this.drawerDetails.name,
        description: this.drawerDetails.description,
        unit_name: this.drawerDetails.unit_name,
      });
    } else {
    }
  }


saveChanges(){

console.log(this.billingForm.value,'updated')
this.drawer.close()
}

}

