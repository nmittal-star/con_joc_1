import { ChangeDetectionStrategy, Component, ViewChild, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent, DrawerComponent, DrawerConfig, FieldConfig, SelectComponent, TableColumn, TableConfig, TextareaComponent, TextboxComponent, UserData, DatePickerComponent } from '@eh-library/common';
import { GenericTable } from '../generic-table/generic-table';
import { MatIcon } from '@angular/material/icon';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { ServiceCompliance } from './service-compliance';

@Component({
  selector: 'app-service-page',
  imports: [ReactiveFormsModule, ButtonComponent, TextboxComponent, SelectComponent, TextareaComponent, DrawerComponent, GenericTable, MatIcon, DragDropModule, ServiceCompliance, DatePickerComponent],
  templateUrl: './service-page.html',
  styleUrls: ['./service-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicePage {
  @ViewChild('complianceDrawer') complianceDrawer!: DrawerComponent;

  private readonly route = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);

  readonly accountNotesForm = this.formBuilder.nonNullable.group({
    accountNotes: [''],
  });

  readonly complianceForm = this.formBuilder.nonNullable.group({
    displayName: ['', [Validators.required]],
    companyName: ['', [Validators.required]],
    ein: [''],
    website: [''],
    phone: ['', [Validators.pattern(/^\+[1-9]\d{7,14}$/)]],
    street: [''],
    city: ['', [Validators.pattern(/^[A-Za-z .'-]{2,}$/)]],
    state: ['Alabama', [Validators.required]],
    zipCode: ['', [Validators.pattern(/^\d{5}(?:-\d{4})?$/)]],
    country: ['United States', [Validators.required]],
    email: ['', [Validators.email]],
    relationshipWithConvoso: ['Basic Account', [Validators.required]],
    vertical: ['', [Validators.required]],
    verificationStatus: ['Unverified', [Validators.required]],
  });

  readonly sfdcConfigForm = this.formBuilder.nonNullable.group({
    sfdcdate: [null],
    sfdcquantity: [null],
    sfdcOrgId: [null],
  });

  quantityFieldConfig: FieldConfig = {
  name: 'sfdcquantity',
  label: '',
  placeholder: 'Enter number',
  optional: false,
  type: 'number',             
  utilityClasses: 'my-input-class',
  width: '200px'
};

orgFieldConfig: FieldConfig = {
  name: 'sfdcOrgId',
  label: '',
  placeholder: 'Enter organization ID',
  optional: false,
  type: 'string',             
  utilityClasses: 'my-input-class',
  width: '200px'
};

  readonly stateConfig: FieldConfig = {
    name: 'state',
    label: 'State',
    placeholder: 'Select state',
    hasSearch: false,
    options: [
      { key: 'Alabama', value: 'Alabama' },
    ],
  };

  readonly countryConfig: FieldConfig = {
    name: 'country',
    label: 'Country',
    placeholder: 'Select country',
    hasSearch: false,
    options: [
      { key: 'United States', value: 'United States' },
    ],
  };

  readonly relationshipConfig: FieldConfig = {
    name: 'relationshipWithConvoso',
    label: 'Relationship with Convoso',
    placeholder: 'Select...',
    hasSearch: false,
    options: [
      { key: 'Basic Account', value: 'Basic Account' },
    ],
  };

  readonly verticalConfig: FieldConfig = {
    name: 'vertical',
    label: 'Vertical',
    placeholder: '---Select---',
    hasSearch: false,
    options: [
      { key: 'Healthcare', value: 'Healthcare' },
      { key: 'Insurance', value: 'Insurance' },
      { key: 'Real Estate', value: 'Real Estate' },
      { key: 'Financial Services', value: 'Financial Services' },
    ],
  };

  readonly brandColumns: TableColumn[] = [
    { key: 'displayName', label: 'Display Name', sortable: true },
    { key: 'companyName', label: 'Company Name', sortable: true },
    { key: 'ein', label: 'EIN' },
    { key: 'website', label: 'Website' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'street', label: 'Street' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'zipCode', label: 'Zip Code' },
    { key: 'country', label: 'Country' },
    { key: 'relationshipWithConvoso', label: 'Relationship with Convoso' },
    { key: 'vertical', label: 'Vertical' },
    { key: 'verificationStatus', label: 'Verification Status' },
  ];

  readonly ccaiColumns: TableColumn[] = [
    { key: 'callStatus', label: 'Call Status', sortable: true },
    { key: 'callType', label: 'Call Type', sortable: true },
    { key: 'agentAI', label: 'Agent AI', sortable: true },
    { key: 'callCount', label: 'Call Count' },
    { key: 'lisAvg', label: 'LIS Average' },
    { key: 'pauseAvg', label: 'Pause Average' },
    { key: 'pauseMax', label: 'Pause Max' },
    { key: 'pauseSd', label: 'Pause SD' },
    { key: 'waitAvg', label: 'Wait Average' },
    { key: 'waitMax', label: 'Wait Max' },
    { key: 'waitSd', label: 'Wait SD' },
    { key: 'talkAvg', label: 'Talk Average' },
    { key: 'talkMax', label: 'Talk Max' },
    { key: 'dispoAvg', label: 'Disp Average' },
    { key: 'dispoMax', label: 'Dispo Max' },
  ];
  
  readonly ccairecColumns: TableColumn[] = [
    { key: 'callStatus', label: 'Call Status', sortable: true },
    { key: 'loggedCalls', label: 'Logged Calls', sortable: true },
    { key: 'totalcallTime', label: 'Total Call Time', sortable: true },
    { key: 'aicall', label: 'Agent Ai Calls' },
    { key: 'transcript', label: 'WITH Transcript' },
    { key: 'tracker', label: 'With Tracker' },
    { key: 'suggestions', label: 'With Suggestions' },
  ];

  readonly brandTableConfig: TableConfig = {
    showSearch: false,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: false,
    showExtraButtons: false,
    isCheckBox: false,
  };

  readonly ccaiTableConfig: TableConfig = {
    showSearch: false,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: false,
    showExtraButtons: false,
    isCheckBox: false,
  };

  readonly ccairecTableConfig: TableConfig = {
    showSearch: false,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: false,
    showExtraButtons: false,
    isCheckBox: false,
  };

  brandRows: UserData[] = [];
  ccaiRows: UserData[] = [];
  ccairecRows: UserData[] = [];


  readonly ivaForm = this.formBuilder.nonNullable.group({
    managedService: ['No'],
  });

  readonly managedServiceConfig: FieldConfig = {
    name: 'managedService',
    label: 'Managed Service?',
    placeholder: 'Select...',
    hasSearch: false,
    options: [
      { key: 'No', value: 'No' },
      { key: 'Yes', value: 'Yes' },
    ],
  };

  readonly agentAIForm = this.formBuilder.nonNullable.group({
    symblStreaming: ['No'],
    callCenterAIReport: ['No'],
    ccaiReport: ['No'],
  });

  readonly callSummaryForm = this.formBuilder.nonNullable.group({
    enableCallSummary: ['No'],
    callSummaryPrompt: [''],
  });

  readonly yesNoConfig: FieldConfig = {
    name: 'yesNo',
    label: '',
    placeholder: 'Select...',
    hasSearch: false,
    options: [
      { key: 'No', value: 'No' },
      { key: 'Yes', value: 'Yes' },
    ],
  };

  readonly symblStreamingConfig: FieldConfig = {
    name: 'symblStreaming',
    label: 'Enable Symbl Streaming Integration:',
    placeholder: 'Select...',
    hasSearch: false,
    options: [
      { key: 'No', value: 'No' },
      { key: 'Yes', value: 'Yes' },
    ],
  };

  readonly callCenterAIReportConfig: FieldConfig = {
    name: 'callCenterAIReport',
    label: 'Enable Call Center AI Report and Details for Admins:',
    placeholder: 'Select...',
    hasSearch: false,
    options: [
      { key: 'No', value: 'No' },
      { key: 'Yes', value: 'Yes' },
    ],
  };

  readonly ccaiReportConfig: FieldConfig = {
    name: 'ccaiReport',
    label: 'Enable CCAI Report & Prompt Config for Impersonated Users only:',
    placeholder: 'Select...',
    hasSearch: false,
    options: [
      { key: 'No', value: 'No' },
      { key: 'Yes', value: 'Yes' },
    ],
  };

  readonly enableCallSummaryConfig: FieldConfig = {
    name: 'enableCallSummary',
    label: 'Enable Call Summary:',
    placeholder: 'Select...',
    hasSearch: false,
    options: [
      { key: 'No', value: 'No' },
      { key: 'Yes', value: 'Yes' },
    ],
  };

  readonly complianceDrawerConfig: DrawerConfig = {
    title: 'Add Brand Details',
    hasClose: true,
    closeOnBackdropClick: true,
    autoOpen: false,
  };

  dateFieldConfig: FieldConfig = {
  name: 'sfdcdate',
  label: '',
  placeholder: 'Select your date',
  optional: false,
  utilityClasses: 'my-datepicker-class',
  width: '200px'
};



  private readonly routeData = toSignal(this.route.data, { initialValue: this.route.snapshot.data });

  readonly sectionTitle = computed(
    () => (this.routeData()['sectionTitle'] as string | undefined) ?? 'Service'
  );

  readonly aiStatsTabControl = this.formBuilder.nonNullable.control<'overview' | 'metrics' >('overview');

  readonly aiTabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'metrics', label: 'Metrics' }
] as const;

  readonly isCampaignRegistryPage = computed(
    () => this.sectionTitle() === 'Campaign Registry'
  );

  readonly isCompliancePage = computed(
    () => this.sectionTitle() === 'Compliance'
  );

  readonly isIVAPage = computed(
    () => this.sectionTitle() === 'Intelligent Virtual Agent'
  );

  readonly isSFDCPage = computed(
    () => this.sectionTitle() === 'SFDC Adaptor'
  );

  readonly isAiStats = computed(
    () => this.sectionTitle() === 'CC AI Stats'
  );

  get isAgentAIPage() {
    return this.sectionTitle() === 'Agent AI';
  }

  syncIntentsWithNLU(): void {
    // TODO: trigger NLU sync
  }

  openComplianceForm(): void {
    const drawerElement = document.querySelector('.service-brand-drawer');
    drawerElement?.classList.remove('closed');
    drawerElement?.classList.add('open');
    this.complianceDrawer.open();
  }

  closeComplianceForm(): void {
    this.complianceDrawer.close();
  }

  handleComplianceDrawerClose(): void {
    const drawerElement = document.querySelector('.service-brand-drawer');
    drawerElement?.classList.remove('open');
    drawerElement?.classList.add('closed');
  }

  submitComplianceForm(): void {
    this.complianceForm.markAllAsTouched();

    if (this.complianceForm.invalid) {
      return;
    }

    this.brandRows = [...this.brandRows, this.complianceForm.getRawValue() as unknown as UserData];
    this.closeComplianceForm();
  }

  // Dual listbox state for Agent AI
  availableItems: string[] = ['Client A', 'Client B', 'Client C', 'Client D', 'Client E'];
  selectedItems: string[] = [];

  selectedAvailable: string[] = [];
  selectedSelected: string[] = [];

  moveToSelected() {
    this.selectedItems = this.selectedItems.concat(this.selectedAvailable);
    this.availableItems = this.availableItems.filter(item => !this.selectedAvailable.includes(item));
    this.selectedAvailable = [];
  }

  moveToAvailable() {
    this.availableItems = this.availableItems.concat(this.selectedSelected);
    this.selectedItems = this.selectedItems.filter(item => !this.selectedSelected.includes(item));
    this.selectedSelected = [];
  }

  dropAvailable(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.availableItems, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  dropSelected(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.selectedItems, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  selectAllAvailable() {
    this.selectedAvailable = [...this.availableItems];
  }

  selectAllSelected() {
    this.selectedSelected = [...this.selectedItems];
  }

  toggleSelectAvailable(item: string) {
    const idx = this.selectedAvailable.indexOf(item);
    if (idx > -1) {
      this.selectedAvailable.splice(idx, 1);
    } else {
      this.selectedAvailable.push(item);
    }
    this.selectedAvailable = [...new Set(this.selectedAvailable)];
  }

  toggleSelectSelected(item: string) {
    const idx = this.selectedSelected.indexOf(item);
    if (idx > -1) {
      this.selectedSelected.splice(idx, 1);
    } else {
      this.selectedSelected.push(item);
    }
    this.selectedSelected = [...new Set(this.selectedSelected)];
  }
}