import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonType, PaginationConfig, TableColumn, TableComponent, TableConfig, TableFilterConfig, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { AccountsDataService } from '../../../data-access/omni/accounts/accounts.api';
import { GeneralSetting } from '../../common/general-setting/general-setting';
import { Router } from '@angular/router';
import { accountFieldsArray } from '../../../shared/field-config';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule, GeneralSetting],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss',
})
export class Accounts implements OnInit, OnDestroy {
  // ── Inject FormBuilder directly ────────────────────────
  private readonly fb = inject(FormBuilder);
  private readonly accountsDataService = inject(AccountsDataService);
  private router = inject(Router);


  // ── Form definition (dynamic from fieldsArray) ────────────
  form!: FormGroup;

  private createFormFromFields(): FormGroup {
    const group: { [key: string]: any } = {};
    for (const field of this.fieldsArray) {
      let validators = [];
      // Add validators based on field type or name if needed
      if (field.type === 'text' || field.type === 'number') {
        validators.push(Validators.required);
      }
      if (field.name === 'email') {
        validators.push(Validators.email);
      }
      // Set default value based on type
      let defaultValue: any = '';
      if (field.type === 'select') {
        defaultValue = null;
      } else if (field.type === 'number') {
        defaultValue = null;
      } else if (field.type === 'text') {
        defaultValue = '';
      }
      group[field.name] = [defaultValue, validators];
    }
    return this.fb.group(group);
  }

  // ── Observables & Subjects ────────────────────────────
  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable();
  
  private totalRecordsSubject = new BehaviorSubject<number>(0);
  private destroy$ = new Subject<void>();

  // ── Component State ───────────────────────────────────
  fullData: any[] = [];
  currentPage = 1;
  pageSize = 20;
  readonly pageSizeOptions = [20, 40, 60, 80, 100];
  startRecord = 1;
  endRecord = 10;
  currentSearchTerm = '';
  currentSort: Sort = { active: '', direction: '' };

  extraButtons = [
    {
      label: 'Add Account',
      type: 'primary' as ButtonType,
      icon: 'add',
    }
  ];

  accountsConfig: TableConfig = {
    showSearch: true,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: true,
  };

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
  showGeneralSetting = false;
  selectedRow: any = null;

  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', sortable: false },
    { key: 'id', label: 'ID', searchable: true },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      searchable: true,
      clickable: true,
      onClick: (row) => this.goToGeneralSetting(row)
    },
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
  // Remove empty constructor; use ngOnInit for form init


  goToGeneralSetting(row: any) {
    this.router.navigate(['/general-setting', row.id, 'general']);
  }

  fieldsArray = accountFieldsArray;

  // ── Lifecycle Hooks ───────────────────────────────────
  ngOnInit(): void {
    this.form = this.createFormFromFields();
    this.loadAccounts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openGeneralSetting(row: any) {
  this.selectedRow = row;
  this.showGeneralSetting = true;
  // this.form.patchValue(row);
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
    this.accountsConfig.loading = true;

    this.accountsDataService.getAccounts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          const fullData = res;

          if (!Array.isArray(fullData)) {
            console.error("Expected array but received:", res);
            return;
          }

          this.fullData = [...fullData];
          let data = [...fullData];

          /** ─────────── Searching ─────────── */
          if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            data = data.filter(row =>
              Object.values(row).some((value) =>
                String(value).toLowerCase().includes(term)
              )
            );
          }

          /** ─────────── Sorting ─────────── */
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

          /** ─────────── Pagination ─────────── */
          const start = (page - 1) * size;
          const end = start + size;

          const paginated = data.slice(start, end).map((item, index) => ({
            ...item,
            sl: start + index + 1
          }));

          /** ─────────── Update subjects ─────────── */
          this.dataSubject.next(paginated);
          this.totalRecordsSubject.next(data.length);

          /** ─────────── Update internal state ─────────── */
          this.currentPage = page;
          this.pageSize = size;
          this.currentSearchTerm = searchTerm;
          this.currentSort = sort;

          /** ─────────── Update display ─────────── */
          this.startRecord = start + 1;
          this.endRecord = Math.min(end, data.length);
        },

        error: (err) => {
          console.error("Failed to load accounts:", err);
          this.accountsConfig.loading = false;
        },

        complete: () => {
          this.accountsConfig.loading = false;
        }
      });
  }

  onSortChange(sort: Sort): void {
    this.loadAccounts(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onPageChange(page: number): void {
    this.loadAccounts(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onPageSizeChange(size: number): void {
    this.loadAccounts(1, size, this.currentSearchTerm, this.currentSort);
  }

  onSearch(term: string): void {
    this.loadAccounts(1, this.pageSize, term, this.currentSort);
  }

  editSettings(row: any): void {
    this.openGeneralSetting(row);
  }

  createDialer(row: any): void {
    console.log('Create dialer for row:', row);
  }
}
