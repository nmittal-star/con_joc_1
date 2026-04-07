import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonType, DialogService, FieldConfig, PaginationConfig, SelectComponent, TableColumn, TableComponent, TableConfig, TableFilterConfig, TextboxComponent, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { VendorsDataService } from '../../../data-access/tools/vendors/vendors.api';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule,SelectComponent,TextboxComponent],
  templateUrl: './vendors.html',
  styleUrl: './vendors.scss',
})
export class Vendors {
  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);

@ViewChild('namesTemplate') namesTemplate!: TemplateRef<any>;



  fullData: any[] = []
  currentPage = 1;
  pageSize = 20;
  readonly pageSizeOptions = [20, 40, 60, 80, 100];
  startRecord = 1;
  endRecord = 10;
  currentSearchTerm = '';
  currentSort: Sort = { active: '', direction: '' };
  dialogRef: any;
  selectedRow: any = null;

  vendorsConfig: TableConfig = {
    showSearch: true,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: true,
    isCheckBox: false
  }

  selectConfig: FieldConfig = {
    name: 'priority',
    label: 'Priority',
    placeholder: 'Select Priority',
    hasSearch: false,
    options: [
      { key: '1', value: '1' },
      { key: '2', value: '2' },
      { key: '3', value: '3' },
      { key: '4', value: '4' },
      { key: '5', value: '5' },

    ]
  };

  vendorForm = new FormGroup({
    name: new FormControl(''),
    priority: new FormControl(''), 
  })
  
  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', searchable: true },
    { key: 'id', label: 'ID', searchable: true },
    { key: 'name', label: 'Name', sortable: true, searchable: true },
    { key: 'distribution_percentage', label: '% Distribution', sortable: true, searchable: true },
    { key: 'priority', label: 'Priority', sortable: true, searchable: true },
    { key: 'status', label: 'Status', sortable: true, searchable: true },

    {
      key: 'actions',
      label: 'Actions',
      type: 'action',
      sortable: false,
      actions: [

        { icon: 'edit', tooltip: 'Settings', callback: (row) => this.editSettings(row) },

      ],
    },
  ];


  constructor(private vendorsDataService: VendorsDataService,private dialogService:DialogService) { }
  ngOnInit() {
    this.loadVendors()

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


  loadVendors(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ): void {

    this.vendorsDataService.getVendors().pipe(takeUntil(this.destroy$)).subscribe({
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
        this.vendorsConfig.loading = false;
      }
    });

  }

  onSortChange(sort: Sort) {
    this.loadVendors(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onPageChange(page: number) {
    this.loadVendors(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadVendors(1, size, this.currentSearchTerm, this.currentSort);
  }

  onSearch(term: string) {
    this.loadVendors(1, this.pageSize, term, this.currentSort);
  }

  editSettings(row: any) {
    this.selectedRow = row;
    this.vendorForm.patchValue({
      name: row.name ?? '',
      priority: row.priority ?? '',
    });

    this.dialogRef = this.dialogService.open({
      title: "Edit Priority",
      dialogContent: this.namesTemplate,
      actionButtons: [
        {
          label: 'Save',
          type: 'primary',
          onClick: () => this.saveVendor()
        }
      ],
      width: '500px',
      panelClass: 'custom-dialog-panel'
    });
  }

  saveVendor() {
    if (!this.selectedRow) return;
    const payload = {
      priority: this.vendorForm.get('priority')?.value ?? ''
    };

    this.vendorsDataService.updateVendor(this.selectedRow.id, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.dialogRef?.close();
          this.vendorForm.reset();
          this.selectedRow = null;
          this.loadVendors();
        },
        error: (err) => console.error('Failed to update vendor:', err)
      });
  }
  


}

