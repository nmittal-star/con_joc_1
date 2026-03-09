import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonType, PaginationConfig, TableColumn, TableComponent, TableConfig, TableFilterConfig, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DatabaseStatusesDataService } from '../../../../data-access/tools/database-statuses/database-statuses/database-statuses.api';


@Component({
  selector: 'app-database-statuses',
  standalone:true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './database-statuses.html',
  styleUrl: './database-statuses.scss',
})
export class DatabaseStatuses {
  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);


  

    fullData: any[] = []
  currentPage = 1;
  pageSize = 20;
  readonly pageSizeOptions = [20, 40, 60, 80, 100];
  startRecord = 1;
  endRecord = 10;
  currentSearchTerm = '';
  currentSort: Sort = { active: '', direction: '' };

    databaseConfig: TableConfig = {
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
    { key: 'clusterName', label: 'Cluster Name', searchable: true },
    { key: 'serverIp', label: 'serverIp', sortable: true, searchable: true },
    { key: 'port', label: 'Port', sortable: true, searchable: true },
    { key: 'secondsBehind', label: 'Seconds Behind', sortable: true, searchable: true },
    { key: 'lastUpdated', label: 'Last Updated', searchable: true },
    { key: 'status', label: 'Status', searchable: true },
    { key: 'excluded', label: 'Excluded', searchable: true },
  
  ];


    constructor(private databaseStatusesDataService:DatabaseStatusesDataService){}
    ngOnInit(){
      this.loadDatabase()
  
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


   loadDatabase(
    page = this.currentPage,
    size = this.pageSize,
    sort: Sort = this.currentSort
  ): void {

    this.databaseStatusesDataService.getDatabaseStatuses().pipe(takeUntil(this.destroy$)).subscribe({
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
        this.currentSort = sort;

        /** ----- Update display ---- */
        this.startRecord = start + 1;
        this.endRecord = Math.min(end, data.length);
      },

      error: (err) => {
        console.error("Failed to load :", err);
      },

      complete: () => {
        this.databaseConfig.loading = false;
      }
    });

  }

    onSortChange(sort: Sort) {
    this.loadDatabase(1, this.pageSize,  sort);
  }

  onPageChange(page: number) {
    this.loadDatabase(page, this.pageSize,  this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadDatabase(1, size,  this.currentSort);
  }



  editSettings(row:any){

  }




}
