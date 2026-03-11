import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ButtonComponent, ButtonType, CheckboxComponent, DialogService, ExportService, FieldConfig, PaginationConfig, SelectComponent, TableColumn, TableComponent, TableConfig, TextboxComponent, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AccountGroupsStateService } from '../../../../services/accountgroup.service';
import { Sort } from '@angular/material/sort';
import { AccountGroupsDataService } from '../../../../data-access/omni/account-groups/account-group.api';

@Component({
  selector: 'app-accountgroup-settings',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule, MatButtonModule, TextboxComponent, ButtonComponent, SelectComponent, MatDividerModule, TranslateModule, CheckboxComponent],
  templateUrl: './accountgroup-settings.html',
  styleUrl: './accountgroup-settings.scss',
})
export class AccountgroupSettings {

  extraButtons = [
    {
      label: 'Export',
      type: 'primary' as ButtonType,
      icon: 'file_download',
      click: () => this.onAccountExport('csv')
    },
    {
      label: 'Add Account ',
      type: 'primary' as ButtonType,
      icon: 'add',
      click: () => this.openAccount()
    }
  ]
  ImpersonationButtons = [
    {
      label: 'Export',
      type: 'primary' as ButtonType,
      icon: 'file_download',
      click: () => this.onImpersonationExport('csv')
    },
    {
      label: 'Add Impersonation ',
      type: 'primary' as ButtonType,
      icon: 'add',
      click: () => this.openImpersonation()
    }
  ]

  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly settingsDataSource$: Observable<UserData[]> = this.dataSubject.asObservable();
  private totalRecordsSubject = new BehaviorSubject<number>(0);


  private impersonationDataSubject = new BehaviorSubject<UserData[]>([]);
  readonly impersonationDataSource$ = this.impersonationDataSubject.asObservable();
  private impersonationTotalRecords = new BehaviorSubject<number>(0);

  @ViewChild('namesTemplate', { static: true }) namesTemplate!: TemplateRef<any>;
  @ViewChild('impersonationTemplate', { static: true }) impersonationTemplate!: TemplateRef<any>;

  settingsForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl('')
  })


  accountForm = new FormGroup({

    id: new FormControl(''),
    name: new FormControl(''),
  })

  impersonationForm = new FormGroup({

    from_account: new FormControl(''),
    from_user: new FormControl(''),
    to_account: new FormControl(''),
    to_user: new FormControl(''),


  })


  selectConfig: FieldConfig = {
    name: 'status',
    label: 'Status',
    placeholder: 'Select Status',
    hasSearch: true,
    options: [
      { key: 'Active', value: 'Active' },
      { key: 'InActive', value: 'InActive' },


    ]
  };

  fromAccountConfig: FieldConfig = {
    name: 'from_account',
    label: 'From Account',
    placeholder: 'Select From Account',
    hasSearch: true,
    options: [
      { key: 'Active', value: 'Active' },
      { key: 'InActive', value: 'InActive' },


    ]
  };
  fromUserConfig: FieldConfig = {
    name: 'from_user',
    label: 'From User',
    placeholder: 'Select From User',
    hasSearch: true,
    options: [
      { key: 'Active', value: 'Active' },
      { key: 'InActive', value: 'InActive' },


    ]
  };
  toAccountConfig: FieldConfig = {
    name: 'to_account',
    label: 'To Account',
    placeholder: 'Select To Account',
    hasSearch: false,
    options: [
      { key: 'Active', value: 'Active' },
      { key: 'InActive', value: 'InActive' },


    ]
  };
  toUserConfig: FieldConfig = {
    name: 'to_user',
    label: 'To User',
    placeholder: 'Select To User',
    hasSearch: true,
    options: [
      { key: 'Active', value: 'Active' },
      { key: 'InActive', value: 'InActive' },


    ]
  };


  checkboxConfig = {
    name: 'active',
    id: 'active',
    label: 'Active',
    value: true,
    indeterminate: false,
    highlighted: true,
    utilityClasses: 'custom-checkbox'
  };



  accountConfig: TableConfig = {
    showSearch: true,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: true,
    isCheckBox: false
  }

  impersonationConfig: TableConfig = {
    showSearch: true,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: true,
    isCheckBox: false
  }

  fullData: any[] = []
  currentPage = 1;
  pageSize = 20;
  readonly pageSizeOptions = [20, 40, 60, 80, 100];
  startRecord = 1;
  endRecord = 10;
  currentSearchTerm = '';
  currentSort: Sort = { active: '', direction: '' };
  dialogRef: any;

  impersonationCurrentPage = 1;
  impersonationPageSize = 20;
  readonly impersonationPageSizeOptions = [20, 40, 60, 80, 100];
  impersonationStartRecord = 1;
  impersonationEndRecord = 10;


  isEditmode = false
  selectedAccountgroup: any;


  constructor(private routingState: AccountGroupsStateService, private accountGroupsDataService: AccountGroupsDataService, private readonly exportService: ExportService, private dialogService: DialogService,) { }
  ngOnInit(): void {
    this.selectedAccountgroup = this.routingState.getRoutingData();

    if (!this.selectedAccountgroup) {
      console.warn('No Account Group selected');
      return;
    }

    console.log('Selected Account Group:', this.selectedAccountgroup);

    this.settingsForm.patchValue({
      id: this.selectedAccountgroup.id,
      name: this.selectedAccountgroup.name,
      description: this.selectedAccountgroup.description,
      status: this.selectedAccountgroup.status

    });

    const stored = localStorage.getItem('selectedAccountgroupId');
    if (stored) {
      this.settingsForm.patchValue(JSON.parse(stored));
    }

    this.loadSettings()
    this.loadImpersonation()
  }

  private destroy$ = new Subject<void>()

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }

/** --- Account Table --- */

  Columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', sortable: false },
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true, },
    { key: 'company_name', label: 'Company Name', sortable: true },
    { key: 'customer_tier', label: 'Customer_Tier' },
    { key: 'active_seats', label: 'Active Seats', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'billing', label: 'Billing', sortable: true },
    { key: 'sales_representive', label: 'Sales Representive', sortable: true },
    { key: 'csm_representive', label: ' CSM Representive', sortable: true },
    { key: 'cluster', label: 'Cluster', sortable: true },
    { key: 'creation_date', label: 'Creation Date', sortable: true },
    { key: 'platform', label: 'Platform', sortable: true },
    { key: 'account_type', label: 'Account Type', sortable: true },

    {
      key: 'actions', type: 'action', label: 'Actions', sortable: false,
      actions: [
        {
          icon: 'delete', tooltip: 'Delete', callback: (row) => this.deleteRow(row)
        }
      ]
    }
  ];


/** --- Impersonation Table --- */

  ImpersonationColumns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', sortable: false },
    { key: 'from_account', label: 'From Account', sortable: true },
    { key: 'from_user', label: 'From User', sortable: true, },
    { key: 'profile_1', label: 'Profile', sortable: true, },
    { key: 'to_account', label: 'To Account', sortable: true },
    { key: 'to_user', label: 'To User', sortable: true },
    { key: 'profile_2', label: 'Profile', sortable: true, },
    {
      key: 'actions', type: 'action', label: 'Actions', sortable: false,
      actions: [
        {
          icon: 'delete', tooltip: 'Delete', callback: (row) => this.deleteRow(row)
        }
      ]
    }
  ];

   /** --- Account PaginationConfig --- */
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

   /** --- Impersonation Pagination --- */

  get impersonationPaginationConfig(): PaginationConfig {
    const total = this.impersonationTotalRecords.getValue();
    return {
      totalRecords: total,
      currentPage: this.impersonationCurrentPage,
      totalPages: Math.max(1, Math.ceil(total / this.impersonationPageSize)),
      pageSize: this.impersonationPageSize,
      pageSizeOptions: this.impersonationPageSizeOptions,
      startRecord: this.impersonationStartRecord,
      endRecord: this.impersonationEndRecord
    };
  }

  private loadData(
    dataServiceMethod: () => Observable<any[]>,
    dataSubject: BehaviorSubject<UserData[]>,
    totalRecordsSubject: BehaviorSubject<number>,
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ): void {

    dataServiceMethod().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        if (!Array.isArray(res)) {
          console.error("Expected array but received:", res);
          return;
        }

        this.fullData = [...res];
        let data = [...res];

        /** Searching */
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          data = data.filter(row =>
            Object.values(row).some(value =>
              String(value).toLowerCase().includes(term)
            )
          );
        }

        /** Sorting */
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

        /** Pagination */
        const start = (page - 1) * size;
        const end = start + size;
        const paginated = data.slice(start, end).map((item, index) => ({
          ...item,
          sl: start + index + 1
        }));

        /** Update subjects */
        dataSubject.next(paginated);
        totalRecordsSubject.next(data.length);

        /** Update internal state */
        this.currentPage = page;
        this.pageSize = size;
        this.currentSearchTerm = searchTerm;
        this.currentSort = sort;

        /** Update display */
        this.startRecord = start + 1;
        this.endRecord = Math.min(end, data.length);
      },
      error: (err) => {
        console.error("Failed to load data:", err);
      },
      complete: () => {
        this.accountConfig.loading = false;
      }
    });

  }

  loadSettings(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ) {
    this.loadData(
      () => this.accountGroupsDataService.getSettings(),
      this.dataSubject,
      this.totalRecordsSubject,
      page,
      size,
      searchTerm,
      sort
    );
  }

  loadImpersonation(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ) {
    this.loadData(
      () => this.accountGroupsDataService.getImpersonations(),
      this.impersonationDataSubject,
      this.impersonationTotalRecords,
      page,
      size,
      searchTerm,
      sort
    );
  }


  /** --- Account Table Handlers --- */
  onAccountPageChange(page: number) {
    this.loadSettings(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onAccountPageSizeChange(size: number) {
    this.loadSettings(1, size, this.currentSearchTerm, this.currentSort);
  }

  onAccountSortChange(sort: Sort) {
    this.loadSettings(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onAccountSearch(term: string) {
    this.loadSettings(1, this.pageSize, term, this.currentSort);
  }

  onAccountExport(format: 'csv' | 'excel' | 'pdf') {
    const rows = this.dataSubject.getValue();
    const columnsToExport = this.Columns.filter(c => c.type !== 'action');
    const exportData = rows.map(row => Object.fromEntries(columnsToExport.map(col => [col.key, row[col.key]])));
    const exportHeaders = columnsToExport.map(c => c.label);
    const pdfRows = rows.map(row => columnsToExport.map(col => row[col.key]));

    switch (format) {
      case 'csv': this.exportService.exportToCSV(exportData, 'account_data'); break;
      case 'excel': this.exportService.exportToExcel(exportData, 'account_data'); break;
      case 'pdf': this.exportService.exportToPDF(exportHeaders, pdfRows, 'account_data'); break;
    }
  }

  /** --- Impersonation Table Handlers --- */
  onImpersonationPageChange(page: number) {
    this.loadImpersonation(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onImpersonationPageSizeChange(size: number) {
    this.loadImpersonation(1, size, this.currentSearchTerm, this.currentSort);
  }

  onImpersonationSortChange(sort: Sort) {
    this.loadImpersonation(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onImpersonationSearch(term: string) {
    this.loadImpersonation(1, this.pageSize, term, this.currentSort);
  }

  onImpersonationExport(format: 'csv' | 'excel' | 'pdf') {
    const rows = this.impersonationDataSubject.getValue();
    const columnsToExport = this.ImpersonationColumns.filter(c => c.type !== 'action');
    const exportData = rows.map(row => Object.fromEntries(columnsToExport.map(col => [col.key, row[col.key]])));
    const exportHeaders = columnsToExport.map(c => c.label);
    const pdfRows = rows.map(row => columnsToExport.map(col => row[col.key]));

    switch (format) {
      case 'csv': this.exportService.exportToCSV(exportData, 'impersonation_data'); break;
      case 'excel': this.exportService.exportToExcel(exportData, 'impersonation_data'); break;
      case 'pdf': this.exportService.exportToPDF(exportHeaders, pdfRows, 'impersonation_data'); break;
    }
  }

  saveChanges() {

  }
  goBack() {

  }

  toggleEditMode() {
    this.isEditmode = !this.isEditmode;
    Object.keys(this.settingsForm.controls).forEach(control => {
      if (this.isEditmode) this.settingsForm.get(control)?.enable();
      else this.settingsForm.get(control)?.disable();
    });
  }

  deleteRow(row: any) {

  }

  openAccount(): void {
    this.dialogRef = this.dialogService.open({
      title: 'Create Account Group',
      dialogContent: this.namesTemplate,
      actionButtons: [
        { label: 'Save', type: 'primary', disabled: true, onClick: () => this.onConfirmClick() },
      ],
      width: '500px',
      panelClass: 'custom-dialog-panel'
    });
  }

  onConfirmClick(): void {
    console.log(this.accountForm.value, 'value');
    this.accountForm.reset()
    this.dialogRef.close()

  }

  openImpersonation(): void {
    this.dialogRef = this.dialogService.open({
      title: 'Create Impersonation',
      dialogContent: this.impersonationTemplate,
      actionButtons: [
        { label: 'Save', type: 'primary', disabled: true, onClick: () => this.submitImpersonation() },
      ],
      width: '500px',
      panelClass: 'custom-dialog-panel'
    });

  }

  submitImpersonation() {
    console.log(this.impersonationForm.value, 'value');
    this.impersonationForm.reset()
    this.dialogRef.close()

  }
}
