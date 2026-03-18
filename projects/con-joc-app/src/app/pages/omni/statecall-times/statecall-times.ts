import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonComponent, ButtonType, DrawerComponent, DrawerConfig, FieldConfig, PaginationConfig, SelectComponent, TableColumn, TableComponent, TableConfig, TableFilterConfig, TextboxComponent, TimepickerComponent, TimepickerConfig, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { StatecallDataService } from '../../../data-access/omni/statecall-times/statecall-times.api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statecall-times',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule, ButtonComponent, TimepickerComponent, SelectComponent, TextboxComponent, DrawerComponent],
  templateUrl: './statecall-times.html',
  styleUrl: './statecall-times.scss',
})
export class StatecallTimes {


  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);

  private destroy$ = new Subject<void>()


  extraButtons = [
    {
      label: 'Add State Call Times',
      type: 'primary' as ButtonType,
      icon: 'add',
      click: () => this.onAddSettings()
    }
  ]

  settingsForm = new FormGroup({
    state: new FormControl(''),
    name: new FormControl(''),
    prefix: new FormControl(''),

  })

  fullData: any[] = []
  currentPage = 1;
  pageSize = 20;
  readonly pageSizeOptions = [20, 40, 60, 80, 100];
  startRecord = 1;
  endRecord = 10;
  currentSearchTerm = '';
  currentSort: Sort = { active: '', direction: '' };

  isEditMode = false
  isCreateMode = false;

  statecallConfig: TableConfig = {
    showSearch: true,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: true,
    isCheckBox: false
  }


  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', sortable: false },
    { key: 'state', label: 'State', searchable: true },
    { key: 'name', label: '	State Call Time Name', sortable: true, searchable: true, clickable: true, onClick: (row) => this.onClickSettings(row) },
    { key: 'startTime', label: 'Start Time', sortable: true, searchable: true },
    { key: 'endTime', label: 'End Time', sortable: true, searchable: true },
    {
      key: 'actions',
      label: 'Actions',
      type: 'action',
      sortable: false,
      actions: [

        { icon: 'edit', tooltip: 'Settings', callback: (row) => this.onClickSettings(row) },
        { icon: 'delete', tooltip: 'Delete', callback: (row) => this.deleteRow(row) },
      ],
    },
  ];


  constructor(private statecallDataService: StatecallDataService,private router:Router) { }
  ngOnInit() {
    this.loadStatecall()

  }




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


  loadStatecall(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ): void {

    this.statecallDataService.getStateCall().pipe(takeUntil(this.destroy$)).subscribe({
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
        this.statecallConfig.loading = false;
      }
    });

  }

  onSortChange(sort: Sort) {
    this.loadStatecall(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onPageChange(page: number) {
    this.loadStatecall(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadStatecall(1, size, this.currentSearchTerm, this.currentSort);
  }

  onSearch(term: string) {
    this.loadStatecall(1, this.pageSize, term, this.currentSort);
  }

  deleteRow(row: any) {

  }


  saveChanges() {

  }

  configBasic: TimepickerConfig = {
    label: 'Basic',
    value: '07:30',
    color: 'primary',
  };




  onClickSettings(row:any){

  //    localStorage.setItem(
  //   'selectedStateName',
  //   JSON.stringify(row)
  // );

    this.router.navigate(['/statecall-settings',row.name])
  }
  
  onAddSettings() {
  this.router.navigate(['/statecall-settings']);
}
}
