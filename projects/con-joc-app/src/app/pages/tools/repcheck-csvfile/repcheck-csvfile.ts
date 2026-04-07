import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonType, PaginationConfig, TableColumn, TableComponent, TableConfig, TableFilterConfig, UserData, DropAreaConfig, FieldConfig } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { RepCheckCsvFileDataService } from '../../../data-access/tools/repcheck-csvfile/repcheck-csvfile.api';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-repcheck-csvfile',
  standalone: true,
  imports: [CommonModule, MatDividerModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './repcheck-csvfile.html',
  styleUrl: './repcheck-csvfile.scss',
})
export class RepcheckCsvfile {
  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);

  uploadedFile: File | null = null;


  repCheckForm = new FormGroup({

    file: new FormControl<File | null>(null),
    mode: new FormControl(''),
    note: new FormControl(''),


  })



  dropSingleConfig: DropAreaConfig = {
    instructions: 'Drag and drop a single file here or use the button',
    buttonLabel: 'Browse to upload file',
    state: 'idle',
    accept: '.jpg,.jpeg,.png,.pdf',
    multiple: false,
    progress: 0,
    fileName: ''
  };

  handleDrop(files: FileList): void {
    if (!files || files.length === 0) return;

    const file = files.item(0);
    if (!file) return;

    this.uploadedFile = file;

    this.repCheckForm.patchValue({ file: file });

    // Update drop area UI
    this.dropSingleConfig = {
      ...this.dropSingleConfig,
      state: 'success',
      fileName: file.name
    };
  }

  selectConfig: FieldConfig = {
    name: 'mode',
    label: 'Mode',
    placeholder: 'Select Mode',
    hasSearch: true,
    options: [
      { key: 'Clear', value: 'Clear' },
      { key: 'Flagged', value: 'Flagged' },
      { key: 'Mixed', value: 'Mixed' },
      { key: 'Checked', value: 'Checked' },

    ]
  };

  fullData: any[] = []
  currentPage = 1;
  pageSize = 20;
  readonly pageSizeOptions = [20, 40, 60, 80, 100];
  startRecord = 1;
  endRecord = 10;
  currentSearchTerm = '';
  currentSort: Sort = { active: '', direction: '' };

  sinchorderConfig: TableConfig = {
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
    { key: 'id', label: 'ID', sortable: true, searchable: true },
    { key: 'file_name', label: 'File Name', sortable: true, searchable: true },
    { key: 'status', label: 'Status', sortable: true, searchable: true },
    { key: 'mode', label: 'Mode', sortable: true, searchable: true },
    { key: 'note', label: 'Note', sortable: true, searchable: true },
    { key: 'result', label: 'Result', sortable: true, searchable: true },
    { key: 'created_at', label: 'Created At', sortable: true, searchable: true },
    { key: 'processed_at', label: 'Processed At', sortable: true, searchable: true },
    { key: 'deleted_at', label: 'Deleted At', sortable: true, searchable: true },

    {
      key: 'actions',
      label: 'Actions',
      type: 'action',
      sortable: false,
      actions: [

        { icon: 'edit', tooltip: 'Download', callback: (row) => this.downloadFile(row) },
        { icon: 'delete', tooltip: 'Delete', callback: (row) => this.delete(row) },

      ],
    },



  ];


  constructor(private repCheckCsvFileDataService: RepCheckCsvFileDataService) { }
  ngOnInit() {
    this.loadSinchOrder()

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


  loadSinchOrder(
    page = this.currentPage,
    size = this.pageSize,
    sort: Sort = this.currentSort
  ): void {

    this.repCheckCsvFileDataService.getRepCheckCsvFile().pipe(takeUntil(this.destroy$)).subscribe({
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
        this.sinchorderConfig.loading = false;
      }
    });

  }

  onSortChange(sort: Sort) {
    this.loadSinchOrder(1, this.pageSize, sort);
  }

  onPageChange(page: number) {
    this.loadSinchOrder(page, this.pageSize, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadSinchOrder(1, size, this.currentSort);
  }




  delete(row: any) {

  }
  downloadFile(row: any) {

  }

}

