import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonType, PaginationConfig, TableColumn, TableComponent, TableConfig, TableFilterConfig, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ActiveDefenseDataService } from '../../../data-access/tools/active-defense/active-defense.api';
@Component({
  selector: 'app-active-defense',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './active-defense.html',
  styleUrl: './active-defense.scss',
})
export class ActiveDefense {
  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);

  extraButtons = [
    {
      label: 'Add Active Defense Accounts',
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

  activedefenseConfig: TableConfig = {
    showSearch: false,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: true,
    isCheckBox: false
  }


  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', searchable: true },
    { key: 'id', label: 'Account ID', searchable: true },
    { key: 'min_dial_level', label: 'Min.Dial Level', sortable: true, searchable: true },
    { key: 'throttle_percentage', label: 'Throttle Percentage', sortable: true, searchable: true },
    { key: 'throttle_duration', label: 'throttle_duration (min)', searchable: true },
    { key: 'trigger_percentage', label: 'Trigger Percentage', sortable: true, searchable: true },
    { key: 'trigger_duration', label: 'Trigger Duration', sortable: true, searchable: true },
    { key: 'created_at', label: 'Created At', sortable: true, searchable: true },
    { key: 'enabled', label: 'Enabled', sortable: true, searchable: true },
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


  constructor(private activedefenseDataService: ActiveDefenseDataService) { }
  ngOnInit() {
    this.loadActiveDefense()

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


  loadActiveDefense(
    page = this.currentPage,
    size = this.pageSize,
    sort: Sort = this.currentSort
  ): void {

    this.activedefenseDataService.getActiveDefense().pipe(takeUntil(this.destroy$)).subscribe({
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
        this.activedefenseConfig.loading = false;
      }
    });

  }

  onSortChange(sort: Sort) {
    this.loadActiveDefense(1, this.pageSize, sort);
  }

  onPageChange(page: number) {
    this.loadActiveDefense(page, this.pageSize, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadActiveDefense(1, size, this.currentSort);
  }


  editSettings(row:any){

  }

   deleteSettings(row:any){
    
  }





}

