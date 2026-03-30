import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonComponent, ButtonType, DrawerComponent, DrawerConfig, FieldConfig, PaginationConfig, SelectComponent, SnackbarConfig, SnackbarService, TableColumn, TableComponent, TableConfig, TableFilterConfig, TextareaComponent, TextboxComponent, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, scheduled, Subject, takeUntil } from 'rxjs';
import { CronManagerDataService } from '../../../data-access/tools/cron-manager/cron-manager.api';

@Component({
  selector: 'app-cron-manager',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule,DrawerComponent,ButtonComponent,SelectComponent,TextareaComponent,TextboxComponent],
  templateUrl: './cron-manager.html',
  styleUrl: './cron-manager.scss',
})
export class CronManager {
  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);

  extraButtons = [
    {
      label: 'Add Cron Manager',
      type: 'primary' as ButtonType,
      icon: 'add',
      click: () => this.open()
    }
  ]

  @ViewChild ('drawer') drawer! :DrawerComponent

  fullData: any[] = []
  currentPage = 1;
  pageSize = 20;
  readonly pageSizeOptions = [20, 40, 60, 80, 100];
  startRecord = 1;
  endRecord = 10;
  currentSearchTerm = '';
  currentSort: Sort = { active: '', direction: '' };
  isEditMode=false
  isCreateMode=false
  drawerDetails:any={}

  cronmanagerConfig: TableConfig = {
    showSearch: true,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: true,
    isCheckBox: false
  }

  drawerConfig :DrawerConfig ={
    title:'',
    hasClose:true,
    closeOnBackdropClick:true,
    autoOpen:false
  }

   selectConfig: FieldConfig = {
    name: 'status',
    label: 'Status',
    placeholder: 'Select Status',
    hasSearch: false,
    options: [
      { key: 'ACTIVE', value: 'ACTIVE' },
      { key: 'INACTIVE', value: 'INACTIVE' },
      

    ]
  };


   runonceConfig: FieldConfig = {
    name: 'runonce',
    label: 'Run Once A Day',
    placeholder: 'Select Run Once A Day',
    hasSearch: false,
    options: [
      { key: 'YES', value: 'YES' },
      { key: 'NO', value: 'NO' },
      

    ]
  };

    snackconfig: SnackbarConfig[] = [
    {
      id: 'success1',
      text: 'Form Created Successfully',
      type: 'success',
      showClose: true,
      delay: 1000,
      dismissOnAction: true,
      ariaLabel: 'Success Snackbar',
      bold: true,
      useFadeAnimation: true,
      mode: 'list'
    },
    {
      id: 'success1',
      text: 'Form Updated Successfully',
      type: 'success',
      showClose: true,
      delay: 1000,
      dismissOnAction: true,
      ariaLabel: 'Success Snackbar',
      bold: true,
      useFadeAnimation: true,
      mode: 'list'
    },


  ]

  cronForm = new FormGroup({
    name: new FormControl(''),
    status:new FormControl(''),
    runonce:new FormControl(''),
    command:new FormControl(''),
    schedule_days:new FormControl(''),
    scheduled_time: new FormControl(''),
    description:new FormControl('')

  })

  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', searchable: true },
    { key: 'name', label: 'Name', sortable: true, searchable: true ,clickable:true,onClick:row=>{this.openDrawer(row,false)}},
    { key: 'scheduled_time', label: 'Scheduled Time', sortable: true, searchable: true },
    { key: 'description', label: 'Description', searchable: true },
    { key: 'lastrun', label: 'Last Run At', sortable: true, searchable: true },
    { key: 'status', label: 'Status', sortable: true, searchable: true },

    {
      key: 'actions',
      label: 'Actions',
      type: 'action',
      sortable: false,
      actions: [

        { icon: 'edit', tooltip: 'Settings', callback: (row) => this.editSettings(row) },
        { icon: 'delete', tooltip: 'Delete', callback: (row) => this.deleteSettings(row) },
      ],
    },
  ];


  constructor(private cronmanagerDataService: CronManagerDataService,private snackbarService: SnackbarService) { }
  ngOnInit() {
    this.loadCronManager()

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


  loadCronManager(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ): void {

    this.cronmanagerDataService.getCronManager().pipe(takeUntil(this.destroy$)).subscribe({
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
        this.cronmanagerConfig.loading = false;
      }
    });

  }

  onSortChange(sort: Sort) {
    this.loadCronManager(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onPageChange(page: number) {
    this.loadCronManager(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadCronManager(1, size, this.currentSearchTerm, this.currentSort);
  }

  onSearch(term: string) {
    this.loadCronManager(1, this.pageSize, term, this.currentSort);
  }

  editSettings(row: UserData) {
    console.log('Edit:', row);

    this.openDrawer(row, true);

  }

  deleteSettings(row: any) {
    this.cronmanagerDataService.deleteCronManager(row.id).pipe(takeUntil(this.destroy$)).subscribe({
      next:()=>{
        this.fullData = this.fullData.filter(item => item.id! == row.id)

        const start =(this.currentPage - 1) * this.pageSize
        const end = start + this.pageSize

        const paginated = this.fullData.slice(start,end).map((item,index)=>({
        ...item,
        sl:start + index +1
        })
      )
      this.dataSubject.next(paginated)
      this.totalRecordsSubject.next(this.fullData.length)
      this.snackbarService.showOverlay({
          id: 'deleteSuccess',
          text: ' deleted successfully',
          type: 'success',
          delay: 1000,
          showClose: true,
          dismissOnAction: true,
          bold: true,
          mode: 'list'
        });
      },
       error: (err: any) => {
        console.error('Delete failed', err);
        this.snackbarService.showOverlay({
          id: 'deleteError',
          text: 'Failed to delete ',
          delay: 1500,
          showClose: true,
          dismissOnAction: true,
          bold: true,
          mode: 'list'
        });
      }
    })

  }

  
  openDrawer(row: any, editMode: boolean = false) {
    console.log("clicked", row)

    this.drawerDetails = row;
    this.isCreateMode = false;

    this.isEditMode = editMode;

    this.drawerConfig = {
      ...this.drawerConfig,
      title: `${row.name}`
    };

    if (this.isEditMode) {
      this.cronForm.patchValue({

        name:row.name,
        status:row.status,
        scheduled_time:row.scheduled_time,
        description:row.description
        

      })
    }

    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('closed');
    drawerEl?.classList.add('open');

    this.drawer.open();

  }

 saveChanges() {

    const formData = this.cronForm.value

    if (this.drawerDetails) {
    console.log(formData,'Updated Data')
      this.drawer.close()

      this.snackbarService.showOverlay(this.snackconfig[1]);
    }
    else {
      console.log(formData,'Saved Data')
      this.drawer.close()


      this.snackbarService.showOverlay(this.snackconfig[0]);
    }

  }

    handleDrawerClose() {
    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('open');
    drawerEl?.classList.add('closed');
  }

  setEditMode(value: boolean) {
    this.isEditMode = value;

    if (value) {

      this.cronForm.patchValue({
        name: this.drawerDetails.name,
        status: this.drawerDetails.status,
        scheduled_time: this.drawerDetails.scheduled_time,
        description: this.drawerDetails.description,
        // lastrun: this.drawerDetails.lastrun,
        // enabled: this.drawerDetails.enabled
      });
    } else {
    }
  }

   open() {
    this.isCreateMode = true;
    this.isEditMode = true;
    this.drawerDetails = null;
    this.cronForm.reset();


    this.drawerConfig = {
      ...this.drawerConfig,
      title: 'Add Active Defense Account'
    };


    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('closed');
    drawerEl?.classList.add('open');

    this.drawer.open();
  }
}

