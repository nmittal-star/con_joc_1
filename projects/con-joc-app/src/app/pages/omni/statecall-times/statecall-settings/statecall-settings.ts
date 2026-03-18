import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ButtonComponent, ButtonType, CheckboxComponent, DatePickerComponent, DialogService, ExportService, FieldConfig, PaginationConfig, SelectComponent, TableColumn, TableComponent, TableConfig, TextboxComponent, TimepickerConfig, UserData } from '@eh-library/common';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TimepickerComponent } from '@eh-library/common';
import { Sort } from '@angular/material/sort';
import { StatecallDataService } from '../../../../data-access/omni/statecall-times/statecall-times.api';
import { StateCallService } from '../../../../services/statecall.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-statecall-settings',
  standalone: true,
  imports: [CommonModule, TableComponent, ReactiveFormsModule, FormsModule, MatIconModule, MatButtonModule, TextboxComponent, ButtonComponent, SelectComponent, MatDividerModule, TranslateModule, TimepickerComponent, SelectComponent, TableComponent, DatePickerComponent],
  templateUrl: './statecall-settings.html',
  styleUrl: './statecall-settings.scss',
})
export class StatecallSettings {

  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  



  private dataSubject = new BehaviorSubject<UserData[]>([]);
  readonly dataSources$: Observable<UserData[]> = this.dataSubject.asObservable()
  private totalRecordsSubject = new BehaviorSubject<number>(0);

  @ViewChild('namesTemplate', { static: true }) namesTemplate!: TemplateRef<any>;

  private destroy$ = new Subject<void>()

  extraButtons = [
    {
      label: 'Add ',
      type: 'primary' as ButtonType,
      icon: 'add',
      click: () => this.open()
    }
  ]

   settingsForm = new FormGroup({
    state: new FormControl(''),
    name: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl('')
  })


  
  scheduleForm = new FormGroup(
    this.days.reduce((acc: any, day: string) => {
      acc[day] = new FormGroup({
        start: new FormControl(null),
        end: new FormControl(null)
      });
      return acc;
    }, {})
  );


  holidaysForm = new FormGroup({

    date: new FormControl(''),
    name: new FormControl(''),
  })


  fullData: any[] = []
  currentPage = 1;
  pageSize = 20;
  readonly pageSizeOptions = [20, 40, 60, 80, 100];
  startRecord = 1;
  endRecord = 10;
  currentSearchTerm = '';
  currentSort: Sort = { active: '', direction: '' };
  selectedStateName: any
  isCreateMode = false
  isEditmode = false
  selectedValue: string = ''
  dialogRef: any


 
  statecallConfig: TableConfig = {
    showSearch: false,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: true,
    isCheckBox: false
  }


  selectConfig: FieldConfig = {
    name: 'state',
    label: 'State',
    placeholder: 'Select State',
    hasSearch: true,
    options: [
      { key: 'Active', value: 'Active' },
      { key: 'InActive', value: 'InActive' },


    ]
  };

  configBasic: TimepickerConfig = {
    // label: 'Basic',
    value: '',
    color: 'primary',
  };

  dateFieldConfig: FieldConfig = {
    name: 'date',
    label: 'Date',
    placeholder: 'Select your date',
    optional: false,
    utilityClasses: 'my-datepicker-class',
    width: '200px'
  };


  constructor(private statecallDataService: StatecallDataService, public routingState: StateCallService, private dialogService: DialogService,private router:Router,private route:ActivatedRoute) { }

  // ngOnInit(): void {

  //   const navigation = this.router.getCurrentNavigation();
  // const state = navigation?.extras.state as any;

  // if (state) {
  //   this.isCreateMode = state.isCreateMode ?? false;
  //   this.isEditmode = state.isEditMode ?? false;
  // }

  // // 👇 OPTIONAL: fallback if user refreshes page
  // if (!state) {
  //   this.isCreateMode = false;
  //   this.isEditmode = true; // or whatever default you want
  // } 

  //   this.selectedStateName = this.routingState.getRoutingData();

  //   if (!this.selectedStateName) {
  //     console.warn('Not selected');
  //     return;
  //   }


  //   this.settingsForm.patchValue({
  //     state: this.selectedStateName.state,
  //     name: this.selectedStateName.name,
  //     startTime: this.selectedStateName.startTime,
  //     endTime: this.selectedStateName.endTime,

  //   });

  //   const stored = localStorage.getItem('selectedStateName');
  //   if (stored) {
  //     this.settingsForm.patchValue(JSON.parse(stored));
  //   }

  //   this.loadStatecallHolidays()
  // }

  ngOnInit(): void {

  this.route.paramMap.subscribe(params => {
    const name = params.get('name');

    if (name) {
      // ✅ EDIT MODE
      this.isEditmode = true;
      this.isCreateMode = false;

      // TODO: Replace with API call
      const stored = localStorage.getItem('selectedStateName');
      if (stored) {
        this.settingsForm.patchValue(JSON.parse(stored));
      }

    } else {
      // ✅ CREATE MODE
      this.isCreateMode = true;
      this.isEditmode = false;

      this.settingsForm.reset();
    }
  });

  this.loadStatecallHolidays();
}

  readonly columns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', sortable: false },
    { key: 'date', label: 'Date', searchable: true },
    { key: 'name', label: 'Name', sortable: true, searchable: true },

    {
      key: 'actions',
      label: 'Actions',
      type: 'action',
      sortable: false,
      actions: [

        { icon: 'delete', tooltip: 'Delete', callback: (row) => this.deleteHolidays(row) },
      ],
    },
  ];


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

  loadStatecallHolidays(
    page = this.currentPage,
    size = this.pageSize,
    sort: Sort = this.currentSort
  ): void {

    this.statecallDataService.getStateCallHolidays().pipe(takeUntil(this.destroy$)).subscribe({
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
        this.statecallConfig.loading = false;
      }
    });

  }

  onSortChange(sort: Sort) {
    this.loadStatecallHolidays(1, this.pageSize, sort);
  }

  onPageChange(page: number) {
    this.loadStatecallHolidays(page, this.pageSize, this.currentSort);
  }

  onPageSizeChange(size: number) {
    this.loadStatecallHolidays(1, size, this.currentSort);
  }


  saveChanges() {
  if (this.isCreateMode) {
    console.log('CREATE API', this.settingsForm.value);
  } else if (this.isEditmode) {
    console.log('UPDATE API', this.settingsForm.value);
  }
}
  goBack() {

  }

  deleteHolidays(row: any) {

  }

  toggleEditMode(): void {
    this.isEditmode = !this.isEditmode;


   
  }
  get isViewMode() {
  return !this.isEditmode && !this.isCreateMode;
}

  
  updateTimesValue(value: string) {
    this.selectedValue = value;
  }

  updateTimeValue(day: string, type: 'start' | 'end', value: any) {
    this.scheduleForm.get(day)?.get(type)?.setValue(value);
  }


  open(): void {
    this.dialogRef = this.dialogService.open({
      title: 'Add Holidays',
      dialogContent: this.namesTemplate,
      actionButtons: [
        { label: 'Save', type: 'primary', disabled: true, onClick: () => this.onConfirmClick() },
      ],
      width: '500px',
      panelClass: 'custom-dialog-panel'
    });
  }

  onConfirmClick(): void {
    console.log(this.holidaysForm.value, 'value');
    this.holidaysForm.reset()
    this.dialogRef.close()

  }

  

}
