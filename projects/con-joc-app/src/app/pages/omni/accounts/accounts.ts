import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonType, PaginationConfig, TableColumn, TableComponent, TableConfig, TableFilterConfig, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { AccountsDataService } from '../../../data-access/omni/accounts/accounts.api';

@Component({
  selector: 'app-accounts',
  standalone:true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss',
})
export class Accounts {

    private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);

   extraButtons = [
    {
      label: 'Add Account',
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

    accountsConfig: TableConfig = {
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
    { key: 'sl', label: 'Sl.No', sortable: false },
    { key: 'id', label: 'ID', searchable: true },
    { key: 'name', label: 'Name', sortable: true, searchable: true },
    { key: 'companyName', label: 'Company Name', sortable: true, searchable: true },
    { key: 'customerTier', label: 'Customer Tier', sortable: true, searchable: true },
    { key: 'activeSeats', label: 'Active Seats', sortable: true, searchable: true },
    { key: 'status', label: 'Status', searchable: true },
    { key: 'voipProvider', label: 'Voip Provider', sortable: true, searchable: true },
    { key: 'billing', label: 'Billing', sortable: true, searchable: true },
    { key: 'salesRepresentative', label: 'Sales Representative', sortable: true, searchable: true },
    { key: 'csmRepresentative', label: 'csm Representative', searchable: true },
    { key: 'cluster', label: 'Cluster', sortable: true, searchable: true },
    { key: 'creationDate', label: 'Creation Date', sortable: true, searchable: true },
    { key: 'platform', label: 'Platform', sortable: true, searchable: true },
    { key: 'accountType', label: 'Account Type', sortable: true, searchable: true },
    {
      key: 'actions',
      label: 'Actions',
      type: 'action',
      sortable: false,
      actions: [

        { icon: 'edit', tooltip: 'Settings', callback: (row) => this.editSettings(row) },
         { icon: 'add', tooltip: 'Create Dialer Account', callback: (row) => this.createDialer(row) },
      ],
    },
  ];

  constructor(private accountsDataService:AccountsDataService){}
  ngOnInit(){
    this.loadAccounts()

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


   loadAccounts(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ): void {

    this.accountsDataService.getAccounts().pipe(takeUntil(this.destroy$)).subscribe({
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
        this.accountsConfig.loading = false;
      }
    });

  }

    onSortChange(sort: Sort) {
    this.loadAccounts(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onPageChange(page: number) {
    this.loadAccounts(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadAccounts(1, size, this.currentSearchTerm, this.currentSort);
  }

  onSearch(term: string) {
    this.loadAccounts(1, this.pageSize, term, this.currentSort);
  }

  editSettings(row:any){

  }
  createDialer(row:any){

  }


}
