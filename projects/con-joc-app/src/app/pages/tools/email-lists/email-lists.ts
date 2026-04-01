import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { ButtonType, DialogService, PaginationConfig, TableColumn, TableComponent, TableConfig, TableFilterConfig, TextareaComponent, TextboxComponent, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { EmailListsDataService } from '../../../data-access/tools/email-lists/email-lists.api';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-lists',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule,TextboxComponent,TextareaComponent],
  templateUrl: './email-lists.html',
  styleUrl: './email-lists.scss',
})
export class EmailLists {
  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);

  @ViewChild('namesTemplate',{static:true}) namesTemplate!: TemplateRef<any>;

  extraButtons = [
    {
      label: 'Add List',
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

  listConfig: TableConfig = {
    showSearch: true,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: true,
    isCheckBox: false
  }

   emailForm = new FormGroup({
  
      description: new FormControl(''),
      name: new FormControl(''),
    })
  

  readonly columns: TableColumn[] = [
    {key: 'sl', label: 'Sl.No', searchable: true},
    { key: 'id', label: 'ID', searchable: true },
    { key: 'handle', label: 'Handle', sortable: true, searchable: true },
    { key: 'name', label: 'Name', sortable: true, searchable: true,clickable:true,onClick:(row)=>{this.editEmailLists(row)}  },
    { key: 'description', label: 'Description', searchable: true },

    {
      key: 'actions',
      label: 'Actions',
      type: 'action',
      sortable: false,
      actions: [

        { icon: 'edit', tooltip: 'Settings', callback: (row) => this.editEmailLists(row) },
      ],
    },
  ];


  constructor(private emaillistsDataService: EmailListsDataService,private dialogService:DialogService,private router: Router) { }
  ngOnInit() {
    this.loadEmailLists()

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


  loadEmailLists(
    page = this.currentPage,
    size = this.pageSize,
    searchTerm = this.currentSearchTerm,
    sort: Sort = this.currentSort
  ): void {

    this.emaillistsDataService.getEmailLists().pipe(takeUntil(this.destroy$)).subscribe({
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
        this.listConfig.loading = false;
      }
    });

  }

  onSortChange(sort: Sort) {
    this.loadEmailLists(1, this.pageSize, this.currentSearchTerm, sort);
  }

  onPageChange(page: number) {
    this.loadEmailLists(page, this.pageSize, this.currentSearchTerm, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadEmailLists(1, size, this.currentSearchTerm, this.currentSort);
  }

  onSearch(term: string) {
    this.loadEmailLists(1, this.pageSize, term, this.currentSort);
  }




    open(): void {
    this.dialogRef = this.dialogService.open({
      title: 'Add New Email List',
      dialogContent: this.namesTemplate,
      actionButtons: [
        { label: 'Save', type: 'primary', disabled: true, onClick: () => this.onConfirmClick() },
      ],
      width: '500px',
      panelClass: 'custom-dialog-panel'
    });
  }

  onConfirmClick(): void {
    console.log(this.emailForm.value, 'value');
    this.emailForm.reset()
    this.dialogRef.close()

  }


    editEmailLists(row: any) {
    
    const selectedId = String(row.id).trim();

    this.emaillistsDataService.getEmailLists()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          const response = res?.items || res?.data || res || [];

          const selectedEmailList = response.find((d: any) =>
            String(d.id).trim().toLowerCase() === selectedId.toLowerCase()
          );

          if (selectedEmailList) {
            console.log("FOUND:", selectedEmailList);

            
            localStorage.setItem('selectedEmailList', JSON.stringify(selectedEmailList));
            this.router.navigate(
              ['/email-settings', ],
              // ['/email-settings', selectedEmailList.id, 'general-settings'],
              // { state: { outboundDataSettings: selectedEmailList } }
            );
          } else {
            console.error('Dialplan not found for', selectedId);
          }
        },
        error: (err) => console.error(err)
      });
  }


}