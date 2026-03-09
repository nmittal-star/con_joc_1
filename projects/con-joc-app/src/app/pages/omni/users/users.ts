import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonType, PaginationConfig, TableColumn, TableComponent, TableConfig, TableFilterConfig, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { UsersDataService } from '../../../data-access/omni/users/users.api';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {

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
  
    accountgroupsConfig: TableConfig = {
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
      { key: 'name', label: 'Name', sortable: true, searchable: true },
      { key: 'email', label: 'Email', sortable: true, searchable: true },
      { key: 'id', label: 'Account ID', searchable: true },
      { key: 'registration', label: 'Registration', sortable: true, searchable: true },
      { key: 'creationDate', label: 'Creation Date', sortable: true, searchable: true },
      { key: 'acl', label: 'ACL', sortable: true, searchable: true },
      { key: 'session', label: 'Session', searchable: true },

      {
        key: 'actions',
        label: 'Actions',
        type: 'action',
        sortable: false,
        actions: [
  
          { icon: 'edit', tooltip: 'Settings', callback: (row) => this.editSettings(row) },
          { icon: 'lock', tooltip: 'Login to Admin', callback: (row) => this.loginAdmin(row) },
          { icon: 'lock', tooltip: 'Login to Agent', callback: (row) => this.loginAgent(row) },
        ],
      },
    ];
  
    constructor(private usersDataService: UsersDataService) { }
    ngOnInit() {
      this.loadAccountGroups()
  
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
  
  
    loadAccountGroups(
      page = this.currentPage,
      size = this.pageSize,
      searchTerm = this.currentSearchTerm,
      sort: Sort = this.currentSort
    ): void {
  
      this.usersDataService.getUsers().pipe(takeUntil(this.destroy$)).subscribe({
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
          console.error("Failed to load clients:", err);
        },
  
        complete: () => {
          this.accountgroupsConfig.loading = false;
        }
      });
  
    }
  
    onSortChange(sort: Sort) {
      this.loadAccountGroups(1, this.pageSize, this.currentSearchTerm, sort);
    }
  
    onPageChange(page: number) {
      this.loadAccountGroups(page, this.pageSize, this.currentSearchTerm, this.currentSort);
    }
  
    onPageSizeChange(size: number) {
      this.loadAccountGroups(1, size, this.currentSearchTerm, this.currentSort);
    }
  
    onSearch(term: string) {
      this.loadAccountGroups(1, this.pageSize, term, this.currentSort);
    }
  
    editSettings(row: any) {
  
    }
    loginAdmin(row:any){

    }
    loginAgent(row: any) {
  
    }

}
