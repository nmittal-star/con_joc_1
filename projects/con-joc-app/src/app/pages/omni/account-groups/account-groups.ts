import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonType, DialogService, DrawerComponent, FieldConfig, PaginationConfig, SelectComponent, SnackbarConfig, TableColumn, TableComponent, TableConfig, TableFilterConfig, TextboxComponent, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { AccountGroupsDataService } from '../../../data-access/omni/account-groups/account-group.api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-groups',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule, TextboxComponent, SelectComponent],
  templateUrl: './account-groups.html',
  styleUrl: './account-groups.scss',
})
export class AccountGroups {

  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);

  @ViewChild('namesTemplate', { static: true }) namesTemplate!: TemplateRef<any>;

  extraButtons = [
    {
      label: 'Add Account Group',
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
   dialogRef: any;


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


   checkboxConfig = {
    name: 'active',
    id: 'active',
    label: 'Active',
    value: true,
    indeterminate: false,
    highlighted: true,
    utilityClasses: 'custom-checkbox'
  };

  
   selectConfig: FieldConfig = {
    name: 'status',
    label: 'Status',
    placeholder: 'Select Status',
    hasSearch: false,
    options: [
      { key: 'Active', value: 'Active' },
      { key: 'InActive', value: 'InActive' },
      

    ]
  };


   snackconfig: SnackbarConfig[] = [
    {
      id: 'success1',
      text: 'Form Created Successfully',
      type: 'success',
      showClose: true,
      delay: 1000,
      dismissOnAction: true,
      ariaLabel: 'Success Snackbar',
      bold: true,
      useFadeAnimation: true,
      mode: 'list'
    },
    {
      id: 'success1',
      text: 'Form Updated Successfully',
      type: 'success',
      showClose: true,
      delay: 1000,
      dismissOnAction: true,
      ariaLabel: 'Success Snackbar',
      bold: true,
      useFadeAnimation: true,
      mode: 'list'
    },


  ]

  advFilterConfig: TableFilterConfig = {
    field: {
      name: 'field',
      placeholder: 'Choose',
      hasSearch: true,
      options: [
        { key: 'Accounts', value: 'accounts' },
        { key: 'ID', value: 'id' },
        { key: 'Name', value: 'name' },
        { key: 'Status', value: 'status' },
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
        { key: 'Accounts', value: 'accounts' },
        { key: 'ID', value: 'id' },
        { key: 'Name', value: 'name' },
        { key: 'Status', value: 'status' },
      ]
    },
  };



  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', sortable: false },
    { key: 'id', label: 'ID', searchable: true },
    { key: 'name', label: 'Name', sortable: true, searchable: true,clickable:true,onClick:(row)=>{this.onClickSettings(row)} },
    { key: 'description', label: 'Description', sortable: true, searchable: true },
    { key: 'accounts', label: 'Accounts', sortable: true, searchable: true },
    { key: 'impersonation', label: 'Impersonation', sortable: true, searchable: true },
    { key: 'status', label: 'Status', searchable: true },
    { key: 'creationDate', label: 'Creation Date', sortable: true, searchable: true },
    {
      key: 'actions',
      label: 'Actions',
      type: 'action',
      sortable: false,
      actions: [

        { icon: 'edit', tooltip: 'Settings', callback: (row) => this.editSettings(row) },
        { icon: 'delete', tooltip: 'Delete', callback: (row) => this.deleteRow(row) },
      ],
    },
  ];
 
  

  constructor(private accountGroupsDataService: AccountGroupsDataService,private dialogService: DialogService,private router:Router) { }
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


   accountGroupsForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),

  })




  loadAccountGroups(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ): void {

    this.accountGroupsDataService.getAccountGroups().pipe(takeUntil(this.destroy$)).subscribe({
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
    this.router.navigate(['/settings',row.id])

  }
  deleteRow(row: any) {

  }


   open(): void {
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
   console.log(this.accountGroupsForm.value,'value');
   this.accountGroupsForm.reset()
   this.dialogRef.close()
   
  }

  cancel(): void {
    this.dialogRef.close();
  }


  onClickSettings(row:any){

     localStorage.setItem(
    'selectedAccountgroupId',
    JSON.stringify(row)
  );

    this.router.navigate(['/settings',row.id])
  }

}
