import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonType, PaginationConfig, TableColumn, TableComponent, TableConfig, TableFilterConfig, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ReleaseLogsDataService } from '../../../data-access/logs/release-logs/release-logs.api';

@Component({
  selector: 'app-release-logs',
   standalone:true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './release-logs.html',
  styleUrl: './release-logs.scss',
})
export class ReleaseLogs {
  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);

   extraButtons = [
    {
      label: 'Add Release Logs',
      type: 'primary' as ButtonType,
      icon: 'add',
      // click: () => this.open()
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

    releaselogConfig: TableConfig = {
    showSearch: true,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: true,
    isCheckBox: false
  }

    readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', sortable: false },
    { key: 'id', label: 'ID', searchable: true },
    { key: 'type', label: 'Type', sortable: true, searchable: true },
    { key: 'notes', label: 'Notes', sortable: true, searchable: true },
    { key: 'tickets', label: 'Tickets', sortable: true, searchable: true },
    { key: 'feature', label: 'Highlighted Feature', searchable: true },
    { key: 'createdat', label: 'Created At', sortable: true, searchable: true },
    { key: 'publishedat', label: 'Published At', sortable: true, searchable: true },

    {
      key: 'actions',
      label: 'Actions',
      type: 'action',
      sortable: false,
      actions: [

        { icon: 'edit', tooltip: 'Settings', callback: (row) => this.editSettings(row) },
        { icon: 'check', tooltip: 'Publishing', callback: (row) => this.editSettings(row) },
         { icon: 'delete', tooltip: 'Delete', callback: (row) => this.deleteSettings(row) },
      ],
    },
  ];


    constructor(private releaseLogsDataService:ReleaseLogsDataService){}
    ngOnInit(){
      this.loadReleaseLogs()
  
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


   loadReleaseLogs(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ): void {

    this.releaseLogsDataService.getReleaseLogs().pipe(takeUntil(this.destroy$)).subscribe({
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
        this.releaselogConfig.loading = false;
      }
    });

  }

    onSortChange(sort: Sort) {
    this.loadReleaseLogs(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onPageChange(page: number) {
    this.loadReleaseLogs(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadReleaseLogs(1, size, this.currentSearchTerm, this.currentSort);
  }

  onSearch(term: string) {
    this.loadReleaseLogs(1, this.pageSize, term, this.currentSort);
  }

  editSettings(row:any){

  }
  deleteSettings(row:any){

  }



}
