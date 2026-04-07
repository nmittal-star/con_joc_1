import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonComponent, ButtonType, DrawerComponent, DrawerConfig, PaginationConfig, SelectComponent, TableColumn, TableComponent, TableConfig, TableFilterConfig, TextboxComponent, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { StateTrackerDataService } from '../../../data-access/tools/state-tracker/state-tracker.api';

@Component({
  selector: 'app-state-tracker',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule,DrawerComponent,SelectComponent,TextboxComponent,ButtonComponent],
  templateUrl: './state-tracker.html',
  styleUrl: './state-tracker.scss',
})
export class StateTracker {
  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);

  @ViewChild('drawer') drawer!: DrawerComponent

  extraButtons = [
    {
      label: 'Add New Global Rule',
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
  isEditMode = false;
  isCreateMode = false;

  statetrackerConfig: TableConfig = {
    showSearch: true,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: true,
    isCheckBox: false
  }

  drawerConfig:DrawerConfig = {
    title: '',
    hasClose: true,
    closeOnBackdropClick: true,
    autoOpen: false
  }

  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', searchable: true },
    { key: 'state', label: 'State', sortable: true, searchable: true ,clickable:true,onClick:(row)=>{this.openDrawer(row,false)}},
    { key: 'status', label: 'Status', sortable: true, searchable: true },

    {
      key: 'actions',
      label: 'Actions',
      type: 'action',
      sortable: false,
      actions: [

        { icon: 'edit', tooltip: 'Edit', callback: (row) => this.editSettings(row) },
        { icon: 'delete', tooltip: 'Delete', callback: (row) => this.deleteSettings(row) },
      ],
    },
  ];


  constructor(private statetrackerDataService: StateTrackerDataService) { }
  ngOnInit() {
    this.loadStateTracker()

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


  loadStateTracker(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ): void {

    this.statetrackerDataService.getStateTracker().pipe(takeUntil(this.destroy$)).subscribe({
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
        this.statetrackerConfig.loading = false;
      }
    });

  }

  onSortChange(sort: Sort) {
    this.loadStateTracker(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onPageChange(page: number) {
    this.loadStateTracker(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadStateTracker(1, size, this.currentSearchTerm, this.currentSort);
  }

  onSearch(term: string) {
    this.loadStateTracker(1, this.pageSize, term, this.currentSort);
  }

  editSettings(row: any) {

  }
  deleteSettings(row: any) {

  }


  openDrawer(row:any,isEditMode:boolean=false){
    this.drawerDetails = row;
    this.isCreateMode=false
    this.isEditMode=isEditMode;
    this.drawer.open();
  }

  open(){
    this.isCreateMode=true;
    this.isEditMode=true;
    this.drawerDetails=null;
    this.drawer.open();
    this.drawerConfig = {
      ...this.drawerConfig,
      title: 'Add New State'
    }     

    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('closed');
    drawerEl?.classList.add('open');
  }

   handleDrawerClose() {
    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('open');
    drawerEl?.classList.add('closed');
  }

  saveChanges() {
  }

   setEditMode(value: boolean) {
    this.isEditMode = value;

    if (value) {

     
     
    } else {
    }
  }

}
