import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonType, PaginationConfig, TableColumn, TableComponent, TableConfig, TableFilterConfig, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { FeatureFlagsDataService } from '../../../data-access/tools/feature-flags/feature-flags.api';

@Component({
  selector: 'app-feature-flags',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './feature-flags.html',
  styleUrl: './feature-flags.scss',
})
export class FeatureFlags {
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

  featureflagsConfig: TableConfig = {
    showSearch: false,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: false,
    isCheckBox: false
  }

  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', searchable: true },
    { key: 'flag', label: 'Flag', sortable: true, searchable: true },
    { key: 'accounts_deployed', label: 'Accounts Deployed', sortable: true, searchable: true },
    { key: 'deployed_on', label: 'Deployed On', searchable: true },


    {
      key: 'actions',
      label: 'Auditlog',
      type: 'action',
      sortable: false,
      actions: [

        { icon: 'visibility', tooltip: 'View', callback: (row) => this.viewSettings(row) },
      ],
    },
  ];


  constructor(private featureflagsDataService: FeatureFlagsDataService) { }
  ngOnInit() {
    this.loadFeatureFlags()

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


  loadFeatureFlags(
    page = this.currentPage,
    size = this.pageSize,
    sort: Sort = this.currentSort
  ): void {

    this.featureflagsDataService.getFeatureFlags().pipe(takeUntil(this.destroy$)).subscribe({
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
          sl: start + index + 1,
          accounts_deployed: item.accounts_deployed
            ?.map((a: any) => `${a.account_id} - ${a.account_name}`)
            .join(', ')
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
        this.featureflagsConfig.loading = false;
      }
    });

  }

  onSortChange(sort: Sort) {
    this.loadFeatureFlags(1, this.pageSize, sort);
  }

  onPageChange(page: number) {
    this.loadFeatureFlags(page, this.pageSize, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadFeatureFlags(1, size, this.currentSort);
  }

 

  viewSettings(row: any) {

  }


}

