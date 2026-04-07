import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonComponent, ButtonType, DrawerComponent, DrawerConfig, PaginationConfig, SelectComponent, TableColumn, TableComponent, TableConfig, TableFilterConfig, TextboxComponent, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { OAuthClientDataService } from '../../../data-access/tools/oauth-clients/oauth-clients.api';

@Component({
  selector: 'app-oauth-client',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule,DrawerComponent,ButtonComponent,TextboxComponent],
  templateUrl: './oauth-client.html',
  styleUrl: './oauth-client.scss',
})
export class OauthClient {
  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);
  private fb = inject(FormBuilder);

  @ViewChild ('drawer') drawer! : DrawerComponent

  extraButtons = [
    {
      label: 'Add New OAuth Client',
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
  drawerDetails: any = {};
  isEditMode = false;
  isCreateMode=false 



  oauthclientConfig: TableConfig = {
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

  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', searchable: true },
    { key: 'name', label: 'Name', searchable: true ,clickable:true,onClick:(row)=>this.openDrawer(row,false)},
    { key: 'id', label: 'ID', sortable: true, searchable: true },
    { key: 'client_secret', label: 'Client Secret', sortable: true, searchable: true },
    { key: 'redirect_uris', label: 'Redirect URIs', searchable: true },
    {
      key: 'actions',
      label: 'Actions',
      type: 'action',
      sortable: false,
      actions: [

        { icon: 'edit', tooltip: 'edit', callback: (row) => this.editClients(row) },
        { icon: 'delete', tooltip: 'Delete', callback: (row) => this.deleteClients(row) }
      ],
    },


  ];
  


  constructor(private oauthClientDataService: OAuthClientDataService) { }
  ngOnInit() {
    this.loadOAuthClient()

  }

  userForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    client_secret: new FormControl(''),
    redirect_uris: this.fb.array([])
  })

  get redirectUris(): FormArray {
    return this.userForm.get('redirect_uris') as FormArray;
  }

  get redirectUriGroups(): FormGroup[] {
    return this.redirectUris.controls as FormGroup[];
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


  loadOAuthClient(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ): void {

    this.oauthClientDataService.getOAuthClient().pipe(takeUntil(this.destroy$)).subscribe({
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
        this.oauthclientConfig.loading = false;
      }
    });

  }

  onSortChange(sort: Sort) {
    this.loadOAuthClient(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onPageChange(page: number) {
    this.loadOAuthClient(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadOAuthClient(1, size, this.currentSearchTerm, this.currentSort);
  }

  onSearch(term: string) {
    this.loadOAuthClient(1, this.pageSize, term, this.currentSort);
  }


   open() {
    this.isCreateMode = true;
    this.isEditMode = true;
    this.drawerDetails = null;
    this.userForm.reset();
    this.setRedirectUris();


    this.drawerConfig = {
      ...this.drawerConfig,
      title: 'Add OAuth Client'
    };

    
    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('closed');
    drawerEl?.classList.add('open');

    this.drawer.open();
  }

   openDrawer(row: any, editMode: boolean = false) {
    console.log(" clicked:", row);

    this.drawerDetails = row
    this.isCreateMode = false

    this.isEditMode = editMode;

    this.drawerConfig = {
      ...this.drawerConfig,
      title: `User Credentials/${row.name}`
    };

    if (this.isEditMode) {
      this.userForm.patchValue({
        id: row.id,
        name: row.name,
        client_secret: row.client_secret,

      });
      this.setRedirectUris(this.normalizeRedirectUris(row.redirect_uris));
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
        name: this.drawerDetails.name,
        client_secret: this.drawerDetails.client_secret,
      });
      this.setRedirectUris(this.normalizeRedirectUris(this.drawerDetails.redirect_uris));
    } else {
    }
  }

  saveChanges() {
    const updatedFormValue = {
      ...this.userForm.getRawValue(),
      redirect_uris: this.normalizeRedirectUris(this.redirectUris.getRawValue())
    };

    console.log(updatedFormValue, 'updated')
    this.drawer.close() 

  }

  addRedirectUri(value = '') {
    this.redirectUris.push(
      this.fb.group({
        url: [value]
      })
    );
  }

  removeRedirectUri(index: number) {
    if (this.redirectUris.length > 1) {
      this.redirectUris.removeAt(index);
      return;
    }

    this.redirectUris.at(0)?.patchValue({ url: '' });
  }

  getDisplayRedirectUris(redirectUris: string[] | string | null | undefined): string[] {
    return this.normalizeRedirectUris(redirectUris);
  }

  private setRedirectUris(redirectUris: string[] = ['']) {
    this.redirectUris.clear();

    const values = redirectUris.length ? redirectUris : [''];
    values.forEach((redirectUri) => this.addRedirectUri(redirectUri));
  }

  private normalizeRedirectUris(redirectUris: Array<{ url: string } | string> | string | null | undefined): string[] {
    if (Array.isArray(redirectUris)) {
      return redirectUris
        .map((uri) => typeof uri === 'string' ? uri : uri?.url)
        .map((uri) => uri?.trim())
        .filter((uri): uri is string => !!uri);
    }

    if (typeof redirectUris === 'string') {
      return redirectUris
        .split(/\r?\n|,/)
        .map((uri) => uri.trim())
        .filter(Boolean);
    }

    return [];
  }

editClients(row: any) {
  this.openDrawer(row, true)

}
deleteClients(row: any) {

  
}
 
}

