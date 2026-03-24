import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonComponent, ButtonType, DrawerComponent, DrawerConfig, FieldConfig, PaginationConfig, SelectComponent, SnackbarConfig, SnackbarService, TableColumn, TableComponent, TableConfig, TableFilterConfig, TextboxComponent, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ActiveDefenseDataService } from '../../../data-access/tools/active-defense/active-defense.api';
@Component({
  selector: 'app-active-defense',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule, ButtonComponent, TextboxComponent, DrawerComponent, SelectComponent],
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
      click: () => this.open()
    }
  ]


  @ViewChild('drawer') drawer!: DrawerComponent;
  drawerDetails: any = {};
  drawerOpen = false;
  isEditMode = false
  isCreateMode = false;

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


  drawerConfig: DrawerConfig = {
    title: '',
    hasClose: true,
    closeOnBackdropClick: true,
    autoOpen: false
  };

  selectConfig: FieldConfig = {
    name: 'id',
    label: 'Account ID',
    placeholder: 'Select Account ID',
    hasSearch: true,
    options: [
      { key: '100075', value: '100075' },
      { key: '100112', value: '100112' },
      { key: '100113', value: '100113' },
      { key: '100114', value: '100114' },
      { key: '100115', value: '100115' },
      { key: '100116', value: '100116' },
      { key: '100117', value: '100117' },
      { key: '100118', value: '100118' },
      { key: '104793', value: '104793' },



    ]
  };
  selectEnabledConfig: FieldConfig = {
    name: 'enabled',
    label: 'Enabled',
    placeholder: 'Select Enabled',
    hasSearch: false,
    options: [
      // { key: 'Yes', value: 'Yes' },
      // { key: 'No', value: 'No' },

      { key: 'true', value: 'true' },
      { key: 'false', value: 'false' },


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


  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', searchable: true },
    { key: 'id', label: 'Account ID', searchable: true, clickable: true, onClick: (row) => { this.openDrawer(row, false) } },
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

        { icon: 'edit', tooltip: 'Edit', callback: (row) => this.editRow(row) },
        { icon: 'delete', tooltip: 'Delete', callback: (row) => this.deleteRow(row) },
      ],
    },


  ];


  defenseForm = new FormGroup({
    id: new FormControl(''),
    min_dial_level: new FormControl(''),
    throttle_percentage: new FormControl(''),
    throttle_duration: new FormControl(''),
    trigger_percentage: new FormControl(''),
    trigger_duration: new FormControl(''),
    enabled: new FormControl('')

  })

  constructor(private activedefenseDataService: ActiveDefenseDataService, private snackbarService: SnackbarService) { }
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



  open() {
    this.isCreateMode = true;
    this.isEditMode = true;
    this.drawerDetails = null;
    this.defenseForm.reset();


    this.drawerConfig = {
      ...this.drawerConfig,
      title: 'Add Active Defense Account'
    };


    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('closed');
    drawerEl?.classList.add('open');

    this.drawer.open();
  }


  openDrawer(row: any, editMode: boolean = false) {
    console.log("clicked", row)

    this.drawerDetails = row;
    this.isCreateMode = false;

    this.isEditMode = editMode;

    this.drawerConfig = {
      ...this.drawerConfig,
      title: `Account ID: ${row.id}`
    };

    if (this.isEditMode) {
      this.defenseForm.patchValue({
        id: row.id,
        min_dial_level: row.min_dial_level,
        throttle_percentage: row.throttle_percentage,
        throttle_duration: row.throttle_duration,
        trigger_percentage: row.trigger_percentage,
        trigger_duration: row.trigger_duration,
        enabled: row.enabled

      })
    }

    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('closed');
    drawerEl?.classList.add('open');

    this.drawer.open();

  }



  editRow(row: UserData) {
    console.log('Edit:', row);

    this.openDrawer(row, true);
  }




  handleDrawerClose() {
    const drawerEl = document.querySelector('.table-attached-drawer');
    drawerEl?.classList.remove('open');
    drawerEl?.classList.add('closed');
  }

  setEditMode(value: boolean) {
    this.isEditMode = value;

    if (value) {

      this.defenseForm.patchValue({
        id: this.drawerDetails.id,
        min_dial_level: this.drawerDetails.min_dial_level,
        throttle_percentage: this.drawerDetails.throttle_percentage,
        throttle_duration: this.drawerDetails.throttle_duration,
        trigger_percentage: this.drawerDetails.trigger_percentage,
        trigger_duration: this.drawerDetails.trigger_duration,
        enabled: this.drawerDetails.enabled
      });
    } else {
    }
  }


  saveChanges() {

    const formData = this.defenseForm.value

    if (this.drawerDetails) {
      this.updateActiveDefense(formData)
      this.drawer.close()

      this.snackbarService.showOverlay(this.snackconfig[1]);
    }
    else {
      this.saveActiveDefense(formData)
      this.drawer.close()


      this.snackbarService.showOverlay(this.snackconfig[0]);
    }

  }

  saveActiveDefense(formData: any) {
    const payload = {
      id: formData.id,
      min_dial_level: formData.min_dial_level,
      throttle_percentage: formData.throttle_percentage,
      throttle_duration: formData.throttle_duration,
      trigger_percentage: formData.trigger_percentage,
      trigger_duration: formData.trigger_duration,
      enabled: formData.enabled

    }

    this.activedefenseDataService.createActiveDefense(payload).subscribe({
      next: (res) => {
        const newData = [...this.fullData, res]
        this.fullData = newData
        this.dataSubject.next(newData)

        this.snackbarService.showOverlay(this.snackconfig[0]);
      }
    })
  }

  updateActiveDefense(formData: any) {
    const id = this.drawerDetails.id

    const updatePayload = {
      id: formData.id,
      min_dial_level: formData.min_dial_level,
      throttle_percentage: formData.throttle_percentage,
      throttle_duration: formData.throttle_duration,
      trigger_percentage: formData.trigger_percentage,
      trigger_duration: formData.trigger_duration,
      enabled: formData.enabled

    }

    this.activedefenseDataService.updateActiveDefense(id, updatePayload).subscribe({
      next: (res) => {
        const updatedData = this.fullData.map(row => {
          if (row.id === id) {
            return { ...row, ...formData }
          }
          return row
        })

        this.fullData = updatedData
        this.dataSubject.next(updatedData)
        this.snackbarService.showOverlay(this.snackconfig[1]); // update message
      },
      error: (error) => {
        console.error('Error updating ', error);
      }

    })
  }

  deleteRow(row: any) {
    this.activedefenseDataService.deleteActiveDefense(row.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.fullData = this.fullData.filter(item => item.id !== row.id)

        const start = (this.currentPage - 1) * this.pageSize
        const end = start + this.pageSize

        const paginated = this.fullData.slice(start, end).map((item, index) => ({
          ...item,
          sl: start + index + 1
        })
        )
        this.dataSubject.next(paginated)
        this.totalRecordsSubject.next(this.fullData.length)
        this.snackbarService.showOverlay({
          id: 'deleteSuccess',
          text: ' deleted successfully',
          type: 'success',
          delay: 1000,
          showClose: true,
          dismissOnAction: true,
          bold: true,
          mode: 'list'
        });

      },
      error: (err: any) => {
        console.error('Delete failed', err);
        this.snackbarService.showOverlay({
          id: 'deleteError',
          text: 'Failed to delete ',
          delay: 1500,
          showClose: true,
          dismissOnAction: true,
          bold: true,
          mode: 'list'
        });
      }
    })
  }
}

