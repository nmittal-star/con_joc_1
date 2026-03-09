import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonType, PaginationConfig, TableColumn, TableComponent, TableConfig, TableFilterConfig, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { BlacklistDataService } from '../../../data-access/tools/blacklist-management/blacklist-management.api';
@Component({
  selector: 'app-blacklist-management',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './blacklist-management.html',
  styleUrl: './blacklist-management.scss',
})
export class BlacklistManagement {
  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);

  extraButtons = [
    {
      label: 'Add DNIS',
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

  blacklistConfig: TableConfig = {
    showSearch: true,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: true,
    isCheckBox: false
  }

    advFilterConfig: TableFilterConfig = {
    field: {
      name: 'field',
      placeholder: 'Choose',
      hasSearch: true,
      options: [
        { key: 'Blacklist ID', value: 'id' },
        { key: 'DNIS', value: 'dnis' },
        { key: 'Insert Date/Time', value: 'dateTime' },
        { key: 'Submitted By', value: 'submittedBy' },
      ]
    },
    operator: {
      name: 'operator',
      placeholder: 'Operator',
      hasSearch: false,
      options: [
        { key: '=', value: '=' },
        { key: '!=', value: '!=' },
        { key: 'In', value: 'In' },
      ]
    },
    orderField: {
      name: 'orderField',
      placeholder: 'Order Field',
      hasSearch: true,
      options: [
        { key: 'Blacklist ID', value: 'id' },
        { key: 'DNIS', value: 'dnis' },
        { key: 'Insert Date/Time', value: 'dateTime' },
        { key: 'Submitted By', value: 'submittedBy' },
      ]
    },
  };

  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', searchable: true },
    { key: 'id', label: 'Blacklist ID', searchable: true },
    { key: 'dnis', label: 'DNIS', sortable: true, searchable: true },
    { key: 'inserted_at', label: 'Inserted At', sortable: true, searchable: true },
    { key: 'submitted_by', label: 'Submitted By', searchable: true },
    { key: 'description', label: 'Description', sortable: true, searchable: true },


  ];


  constructor(private blacklistDataService: BlacklistDataService) { }
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

    this.blacklistDataService.getBlacklist().pipe(takeUntil(this.destroy$)).subscribe({
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
        this.blacklistConfig.loading = false;
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

 



}

