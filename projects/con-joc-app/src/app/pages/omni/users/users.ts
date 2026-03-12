import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonComponent, ButtonType, DrawerComponent, PaginationConfig, SelectComponent, TableColumn, TableComponent, TableConfig, TableFilterConfig, TextboxComponent, UserData, DrawerConfig, FieldConfig } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { UsersDataService } from '../../../data-access/omni/users/users.api';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule, ButtonComponent, TextboxComponent, SelectComponent, DrawerComponent],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {

  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);

  @ViewChild('drawer') drawer!: DrawerComponent;


  selectedName: any = null;

  drawerDetails: any = {};

  isEditMode: boolean = false;


  fullData: any[] = []
  currentPage = 1;
  pageSize = 20;
  readonly pageSizeOptions = [20, 40, 60, 80, 100];
  startRecord = 1;
  endRecord = 10;
  currentSearchTerm = '';
  currentSort: Sort = { active: '', direction: '' };

  userForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    record_remote_session: new FormControl(''),
    low_debug_level: new FormControl(''),
    talkdesk_userid: new FormControl('')
  })

  usersConfig: TableConfig = {
    showSearch: true,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: true,
    isCheckBox: false
  }

  drawerConfig: DrawerConfig = {
    title: '',
    hasClose: true,
    closeOnBackdropClick: true,
    autoOpen: false
  };

  selectConfig: FieldConfig = {
    name: 'record_remote_session',
    label: 'Record Remote Session',
    placeholder: 'Select Record Remote Session',
    hasSearch: false,
    options: [
      { key: 'Yes', value: 'Yes' },
      { key: 'No', value: 'No' },


    ]
  };

  logDebugConfig: FieldConfig = {
    name: 'low_debug_level',
    label: 'Low Debug Level',
    placeholder: 'Select Low Debug Level',
    hasSearch: false,
    options: [
      { key: 'None', value: 'None' },
      { key: '2-Silent', value: '2-Silent' },
      { key: '3-Verbose', value: '3-Verbose' },


    ]
  };

  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', sortable: false },
    { key: 'name', label: 'Name', sortable: true, searchable: true, clickable: true, onClick: (row) => this.openDrawer(row, false) },
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
    this.loadUsers()

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


  loadUsers(
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
          sl: start + index + 1,
          name: `${item.first_name ?? ''} ${item.last_name ?? ''}`.trim()
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
        this.usersConfig.loading = false;
      }
    });

  }

  onSortChange(sort: Sort) {
    this.loadUsers(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onPageChange(page: number) {
    this.loadUsers(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadUsers(1, size, this.currentSearchTerm, this.currentSort);
  }

  onSearch(term: string) {
    this.loadUsers(1, this.pageSize, term, this.currentSort);
  }

  editSettings(row: UserData) {
    console.log('Edit:', row);

    this.openDrawer(row, true);
  }
  loginAdmin(row: any) {

  }
  loginAgent(row: any) {

  }

  openDrawer(row: any, editMode: boolean = false) {
    console.log(" clicked:", row);

    this.drawerDetails = row;

    this.isEditMode = editMode;

    this.drawerConfig = {
      ...this.drawerConfig,
      title: `User Credentials/${row.name}`
    };

    if (this.isEditMode) {
      this.userForm.patchValue({
        id: row.id,
        title: row.title,
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email,
        talkdesk_userid: row.talkdesk_userid,
        record_remote_session: row.record_remote_session,
        low_debug_level: row.low_debug_level,

      })
    }

    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('closed');
    drawerEl?.classList.add('open');

    this.drawer.open();
  }

  handleDrawerClose() {
    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('open');
    drawerEl?.classList.add('closed');
  }


  onEditMode(value: boolean) {
    this.isEditMode = value;
  }


  closeDrawer() {
    this.drawer.close()
  }
  onEditModeChange(value: boolean) {
    this.isEditMode = value;
  }

  setEditMode(value: boolean) {
    this.isEditMode = value;

    if (value) {

      this.userForm.patchValue({
        id: this.drawerDetails.id,
        title: this.drawerDetails.title,
        first_name: this.drawerDetails.first_name,
        last_name: this.drawerDetails.last_name,
        email: this.drawerDetails.email,
        talkdesk_userid: this.drawerDetails.talkdesk_userid,
        record_remote_session: this.drawerDetails.record_remote_session,
        low_debug_level: this.drawerDetails.low_debug_level,
      });
    } else {
    }
  }

  saveChanges() {
    const formData = this.userForm.value;
    const id = this.drawerDetails.id;

    const updatePayload = {
      id: id,
      title: formData.title,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      talkdesk_userid: formData.talkdesk_userid,
      record_remote_session: formData.record_remote_session,
      low_debug_level: formData.low_debug_level,
    };

    this.usersDataService.updateUser(id, updatePayload).subscribe({
      next: (response) => {
        console.log('User updated successfully', response);

        const updatedData = this.fullData.map(row => {
          if (row.id === id) {
            return { ...row, ...updatePayload };
          }
          return row;
        });

        this.fullData = updatedData;
        this.dataSubject.next(updatedData);
      },
      error: (error) => {
        console.error('Error updating user', error);
      }
    });
    this.drawer.close();
    this.loadUsers()
  }

}
