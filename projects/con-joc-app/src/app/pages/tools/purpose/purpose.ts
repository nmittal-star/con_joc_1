import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonComponent, ButtonType, DrawerComponent, DrawerConfig, FieldConfig, PaginationConfig, SelectComponent, TableColumn, TableComponent, TableConfig, TableFilterConfig, TextareaComponent, TextboxComponent, User, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { PurposeDataService } from '../../../data-access/tools/purpose/purpose.api';
import { log } from 'console';

@Component({
  selector: 'app-purpose',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule,ButtonComponent,DrawerComponent,TextboxComponent,TextareaComponent,SelectComponent],
  templateUrl: './purpose.html',
  styleUrl: './purpose.scss',
})
export class Purpose {
  private dataSubject = new BehaviorSubject<UserData[]>([])
  readonly dataSources$:Observable<UserData[]>=this.dataSubject.asObservable();
  private totalRecordsSubject = new BehaviorSubject<number>(0)

  @ViewChild('drawer') drawer!: DrawerComponent;
  
 extraButtons = [
    {
      label: 'Add New Purpose',
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
  isEditMode = false
  isCreateMode = false;
  drawerDetails: any = {}
  drawerConfig: DrawerConfig = {
    title: '',
    hasClose: true,
    closeOnBackdropClick: true,
    autoOpen: false
  }

  purposeConfig: TableConfig = {
    showSearch: false,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: true,
    isCheckBox: false
  }

   selectConfig: FieldConfig = {
    name: 'active',
    label: 'Active',
    placeholder: 'Select Active ',
    hasSearch: false,
    options: [
      { key: 'Yes', value: 'yes' },
      { key: 'No', value: 'no' },

    ]
  };

  purposeForm = new FormGroup({
    purpose: new FormControl(''),
    description: new FormControl(''),
    active: new FormControl('yes'),
  })  

  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', searchable: true },
    { key: 'purpose', label: 'Purpose', searchable: true,clickable:true,onClick:(row)=>{this.openDrawer(row,false)} },
    { key: 'description', label: 'Description', sortable: true, searchable: true },
    { key: 'active', label: 'Active', sortable: true, searchable: true },
    { key: 'created_at', label: 'Created At', searchable: true },
    { key: 'updated_at', label: 'Updated At', searchable: true },

     {
      key: 'actions',
      label: 'Actions',
      type: 'action',
      sortable: false,
      actions: [

        { icon: 'edit', tooltip: 'Edit', callback: (row) => this.editSettings(row) },
        
      ],
    },


  ];


  constructor(private purposeDataService: PurposeDataService) { }
  ngOnInit() {
    this.loadPurpose()

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


  loadPurpose(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ): void {

    this.purposeDataService.getPurpose().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        const fullData = res

        if (!Array.isArray(fullData)) {
          console.error("Expected array but received:", res);
          return;
        }


        this.fullData = [...fullData];

        let data = [...fullData];




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
        this.purposeConfig.loading = false;
      }
    });

  }

  onSortChange(sort: Sort) {
    this.loadPurpose(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onPageChange(page: number) {
    this.loadPurpose(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadPurpose(1, size, this.currentSearchTerm, this.currentSort);
  }

  open() {
    this.drawerDetails = null
    this.isCreateMode = true;
    this.isEditMode = true;
    this.purposeForm.reset()    
    this.drawerConfig = {
      ...this.drawerConfig,
      title: 'Add Purpose'
    };

    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('closed');
    drawerEl?.classList.add('open');

    this.drawer.open()
  }

  openDrawer(row: any, editMode: boolean = false) {
    this.drawerDetails = row;
    this.isEditMode = editMode
    this.isCreateMode = false

    this.drawerConfig = {
      ...this.drawerConfig,
      title: `Purpose Settings - ${row.purpose}`
    };

    if (this.isEditMode) {
      this.purposeForm.patchValue({
        purpose: row.purpose,
        description: row.description,
        active: row.active,
      })
    }
    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('closed');
    drawerEl?.classList.add('open');

    this.drawer.open()
  }

  editSettings(row:any){
    this.openDrawer(row, true)
  }


  
  handleDrawerClose() {
    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('open');
    drawerEl?.classList.add('closed');
  }


   setEditMode(value: boolean) {
    this.isEditMode = value;

    if (value) {

      this.purposeForm.patchValue({
        purpose: this.drawerDetails.purpose,
        description: this.drawerDetails.description,
        active: this.drawerDetails.active,
      });
    
    } else {
    }
  }


  saveChanges() {
   console.log(this.purposeForm.value, 'value');
   this.drawer.close()
   

  }
}


