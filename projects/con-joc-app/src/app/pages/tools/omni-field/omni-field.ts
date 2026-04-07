import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonComponent, ButtonType, DrawerComponent, DrawerConfig, FieldConfig, PaginationConfig, SelectComponent, TableColumn, TableComponent, TableConfig, TableFilterConfig, TextareaComponent, TextboxComponent, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { OmniFieldDataService } from '../../../data-access/tools/omni-field/omni-field.api';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-omni-field',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule, ButtonComponent, TextboxComponent, DrawerComponent, TextareaComponent, SelectComponent],
  templateUrl: './omni-field.html',
  styleUrl: './omni-field.scss',
})
export class OmniField {
  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);

  @ViewChild('drawer') drawer!: DrawerComponent


  extraButtons = [
    {
      label: 'Add Field Description',
      type: 'primary' as ButtonType,
      icon: 'add',
      click: () => this.open()
    }
  ]

  clientForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    description: new FormControl(''),
    route: new FormControl(''),
  })


  fullData: any[] = []
  currentPage = 1;
  pageSize = 20;
  readonly pageSizeOptions = [20, 40, 60, 80, 100];
  startRecord = 1;
  endRecord = 10;
  currentSearchTerm = '';
  currentSort: Sort = { active: '', direction: '' };
  drawerDetails: any = {}
  isEditMode = false
  isCreateMode = false;

  fieldConfig: TableConfig = {
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

  }

  selectConfig: FieldConfig = {
    name: 'type',
    label: 'Object Type',
    placeholder: 'Select Object Type',
    hasSearch: true,
    options: [
      { key: 'Account', value: 'Account' },
      { key: 'Acid', value: 'Acid' },
      { key: 'Apps', value: 'Apps' },
      { key: 'Adaptor', value: 'Adaptor' },
      { key: 'campaign', value: 'campaign' },
      { key: 'Drip', value: 'Drip' },
      { key: 'Note', value: 'Note' },


    ]
  };

  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', searchable: true },
    { key: 'name', label: 'Name', sortable: true, searchable: true, clickable: true, onClick: (row) => { this.openDrawer(row, false) } },
    { key: 'type', label: 'Types', sortable: true, searchable: true },
    { key: 'description', label: 'Description', searchable: true },
    { key: 'route', label: 'Route', sortable: true, searchable: true },
    {
      key: 'actions',
      label: 'Actions',
      type: 'action',
      sortable: false,
      actions: [

        { icon: 'edit', tooltip: 'Settings', callback: (row) => this.editSettings(row) },
        { icon: 'delete', tooltip: 'Delete', callback: (row) => this.deleteSettings(row) },
      ],
    },
  ];


  constructor(private omniFieldDataService: OmniFieldDataService) { }
  ngOnInit() {
    this.loadFields()

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


  loadFields(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ): void {

    this.omniFieldDataService.getOmniField().pipe(takeUntil(this.destroy$)).subscribe({
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
        this.fieldConfig.loading = false;
      }
    });

  }

  onSortChange(sort: Sort) {
    this.loadFields(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onPageChange(page: number) {
    this.loadFields(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadFields(1, size, this.currentSearchTerm, this.currentSort);
  }

  onSearch(term: string) {
    this.loadFields(1, this.pageSize, term, this.currentSort);
  }

  editSettings(row: any) {
    this.openDrawer(row, true)

  }
  deleteSettings(row: any) {

  }


  openDrawer(row: any, editMode: boolean = false) {
    this.drawerDetails = row;
    this.isEditMode = editMode
    this.isCreateMode = false

    this.drawerConfig = {
      ...this.drawerConfig,
      title: `Field Description Settings - ${row.name}`
    };

    if (this.isEditMode) {
      this.clientForm.patchValue({
        name: row.name,
        type: row.type,
        description: row.description,
        route: row.route,
      })
    }
    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('closed');
    drawerEl?.classList.add('open');
    this.drawer.open()

  }

  open() {
     this.drawerDetails = null
    this.isCreateMode = true;
    this.isEditMode = true;
    this.clientForm.reset()
   

    this.drawerConfig = {
      ...this.drawerConfig,
      title: 'Add Field Description'
    };


    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('closed');
    drawerEl?.classList.add('open');

    this.drawer.open()
  }

  handleDrawerClose() {
    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('open');
    drawerEl?.classList.add('closed');
  }

  setEditMode(value: boolean) {
    this.isEditMode = value;

    if (value) {
      this.clientForm.patchValue({
        name: this.drawerDetails.name,
        type: this.drawerDetails.type,
        description: this.drawerDetails.description,
        route: this.drawerDetails.route,
      })
    }
  }


  saveChanges() {

    console.log(this.clientForm.value, 'saved details');
    this.drawer.close()
  }

}

