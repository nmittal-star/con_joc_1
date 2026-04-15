import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { CheckboxComponent, TextboxComponent, SelectComponent, RadioButtonComponent, TextareaComponent, DrawerComponent, ButtonComponent, TableColumn, UserData, TableConfig, FieldConfig, ButtonType } from '@eh-library/common';
import { GenericTable } from '../../../generic-table/generic-table';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
const YES_NO_OPTIONS = [
  { key: 'No', value: 'No' },
  { key: 'Yes', value: 'Yes' },
];
@Component({
  selector: 'app-dialer-settings',
  imports: [ReactiveFormsModule,
    RouterOutlet,
    MatTabGroup,
    MatTab,
    CheckboxComponent,
    TextboxComponent,
    SelectComponent,
    RadioButtonComponent,
    TextareaComponent,
    DrawerComponent,
    ButtonComponent,
    GenericTable,
    MatIconModule],
  templateUrl: './dialer-settings.html',
  styleUrl: './dialer-settings.scss',
})

export class DialerSettings {
  licenseAddonForm = new FormGroup({
    addonName: new FormControl('', Validators.required),
    quantity: new FormControl(1)
  });
  private readonly route = inject(ActivatedRoute);


  private readonly fieldLabels: Record<string, string> = {
    partyAudioStream: 'Party Audio Stream:',
    additionalDialLevels: 'Additional Dial Levels:',
    voicemailDrops: 'Voicemail Drops:',
    waEmail: 'WA Email:',
    waRVM: 'WA RVM:',
    waSMS: 'WA SMS:',
    workflowAutomation: 'Workflow Automation:',
    advancedService: 'Advanced Service:',
    areaCodeBasedCalling: 'Area Code Based Calling:',
    conversationalAIIVA: 'Conversational AI IVA:',
    ignitesDialingOptimization: 'Ignites Dialing Optimization:',
    ignitesDIDHealthScore: 'Ignites DID Health Score:',
    ignitesDIDProcurementAutomation: 'Ignites DID Procurement Automation:',
    ivaIntentDetection: 'IVA Intent Detection:',
    licensePrice: 'License Price:',
    minutesBundle: 'Minutes Bundle:',
    multipleCampaignLogins: 'Multiple Campaign Logins:'
  };
  private readonly textboxLabels: Record<string, string> = {
    additionalLeadCapacity: 'Additional Lead Capacity',
    extendedRecordingStorage: 'Extended Recording Storage',
    gamification: 'Gamification',
    increasedApiLimits: 'Increased API Limits',
    leadBay: 'LeadBay',
    pbxExtension: 'PBX Extension',
    smsShortcodeAllocations: 'SMS Shortcode Allocations',
    unlimitedInboundDialing: 'Unlimited Inbound Dialing',
    unlimitedOutboundDialing: 'Unlimited Outbound Dialing'
  };

  private readonly accountAddonLabels: Record<string, string> = {
    acmAdvanced: 'ACM Advanced',
    acmBasic: 'ACM Basic',
    acmManaged: 'ACM Managed',
    advancedLeadFilteringQty: 'Advanced Lead Filtering - Quantity',
    calendarSync: 'Calendar Sync',
    callerIdReputationQty: 'CallerID Reputation - Account Addons - Quantity',
    dataArchivesQty: 'Data Archives - Quantity',
    emailServiceQty: 'Email Service - Quantity',
    ftpPullQty: 'FTP Pull - Quantity',
    ftpPushQty: 'FTP Push - Quantity',
    inboundUnlimitedQty: 'Inbound Unlimited - Quantity',
    longTermCallRecordingStorage: 'Long Term Call Recording Storage',
    longTermCallRecordingStorageFeature: 'Long Term Call Recording Storage Feature Flag',
    outboundUnlimitedQty: 'Outbound Unlimited - Quantity',
    pbxEnterpriseQty: 'PBX Enterprise - Quantity',
    primaryComplianceCountry: 'Primary Compliance Country',
    reassignedNumbersLookup: 'Reassigned Numbers Database Lookup',
    ringlessVoicemailService: 'Ringless Voicemail Service',
    sharedLicensesQty: 'Shared Licenses - Quantity',
    smsService: 'SMS Service',
    stateTracker: 'StateTracker',
    voiceBroadcastService: 'Voice Broadcast Service',
    vosoAi: 'Voso AI',
    vosoAiLeads: 'Voso AI Leads'
  };
  private readonly quantityLabels: Record<string, string> = {
    vbCaiChannelsQty: 'VB/CAI Channels - Quantity',
    rvmChannels: 'Ringless Voicemail Channels',
    remoteUser: 'Remote User',
    pbxLicenseQty: 'PBX License - Account Addons - Quantity',
    pbxQty: 'Pbx - Quantity',
    inboundPreviewQty: 'Inbound Preview License - Account Addons - Quantity',
    inboundChannelQty: 'Inbound Channel - Quantity',
    campaignRegistryQty: 'Campaign Registry - Account Addons - Quantity',
    adminLicenseQty: 'Admin License - Account Addons - Quantity',
    additionalLeadOverrideQty: 'Additional Lead Override - Quantity',
    acmMaxRulesQty: 'ACM Max Rules - Quantity',
    acmHistoryDurationQty: 'ACM History Duration - Quantity'
  };
  private readonly formBuilder = inject(FormBuilder);

  readonly licenseColumns: TableColumn[] = [
    { key: 'userName', label: 'User Name', sortable: true },
    { key: 'cancellationNotice', label: 'Cancellation Notice On', sortable: true },
    { key: 'cancelOn', label: 'Cancel On' },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'Action' },
  ]
  readonly inboundColumns: TableColumn[] = [
    { key: 'number', label: 'Number', sortable: true },
    { key: 'tier', label: 'Tier', sortable: true },
    { key: 'dateAdded', label: 'Date Added', sortable: true },
  ]
  readonly minutesColumns: TableColumn[] = [
    { key: 'type', label: 'Type', sortable: true },
    { key: 'balance', label: 'Balance', sortable: true },
    { key: 'refillAmount', label: 'Refill Amount', sortable: true },
    { key: 'minimumBeforeRefill', label: 'Minimum Before Refill' },
    { key: 'pricePerUnit', label: 'Price Per Unit' },
    { key: 'unit', label: 'Unit' },
    { key: 'totalCost', label: 'Total Cost' },
  ]
   readonly chargeForm = this.formBuilder.nonNullable.group({
    amount: ['', [Validators.required]],
    memo: ['', [Validators.required]],
  });

  private readonly routeData = toSignal(this.route.data, { initialValue: this.route.snapshot.data });

  readonly licenseAddForm = this.formBuilder.nonNullable.group(
    Object.keys(this.fieldLabels).reduce((acc, key) => ({ ...acc, [key]: ['No'] }), {})
  );

  readonly licenseAddonsForm = this.formBuilder.group(
    Object.keys(this.textboxLabels).reduce((acc, key) => ({ ...acc, [key]: [''] }), {})
  );

  readonly accountAddonsForm = this.formBuilder.nonNullable.group(
    Object.keys(this.accountAddonLabels).reduce((acc, key) => ({ ...acc, [key]: ['No'] }), {})
  );
  readonly quantityForm = this.formBuilder.nonNullable.group(
    Object.keys(this.quantityLabels).reduce((acc, key) => ({ ...acc, [key]: [''] }), {})
  );

  readonly textboxFields = Object.entries(this.textboxLabels).map(([key, label]) => ({
    name: key,
    label: label,
    config: {
      name: key,
      label: label,
      placeholder: `Enter ${label}...`,
    } as FieldConfig
  }));

  readonly formFields = Object.entries(this.fieldLabels).map(([key, label]) => ({
    controlName: key,
    config: {
      name: key,
      label: label,
      placeholder: 'Select...',
      hasSearch: false,
      options: YES_NO_OPTIONS,
    } as FieldConfig
  }));

  readonly accountAddonFields = Object.entries(this.accountAddonLabels).map(([key, label]) => ({
    controlName: key,
    label: label,
    config: {
      name: key,
      label: label,
      placeholder: 'Select...',
      hasSearch: false,
      options: YES_NO_OPTIONS,
    } as FieldConfig
  }));

  readonly quantityFields = Object.entries(this.quantityLabels).map(([key, label]) => ({
    name: key,
    label: label,
    config: {
      name: key,
      label: label,
      placeholder: 'Enter quantity...',
    } as FieldConfig
  }));

  readonly amountConfig: FieldConfig = {
    name: 'amount',
    label: 'Amount:',
    placeholder: '0.00',
    type: 'number'
  };

  readonly memoConfig: FieldConfig = {
    name: 'memo',
    label: 'Memo:',
    placeholder: 'Enter memo details...'
  };

  licenseRows: UserData[] = [];
  inboundRows: UserData[] = [];
  minutesRows: UserData[] = [];

  readonly licenseForm = this.formBuilder.nonNullable.group({
    userName: ['', [Validators.required]],
    cancellationNotice: ['', [Validators.required]],
    cancelOn: [''],
    status: [''],
  });

  readonly licenseTableConfig: TableConfig = {
    showSearch: false,
    showExport: false,
    showPagination: true,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: false,
    isCheckBox: true,
  };

  readonly inboundTableConfig: TableConfig = {
    showSearch: false,
    showExport: false,
    showPagination: true,
    serverSide: false,
    loading: false,
    usePagination:true,
    showExtraButtons: true,
    isCheckBox: false,
  };
  readonly minutesTableConfig: TableConfig = {
    showSearch: false,
    showExport: false,
    showPagination: true,
    serverSide: false,
    loading: false,
    usePagination:true,
    showExtraButtons: true,
    isCheckBox: false,
  };
  readonly inboundExtraButtons = [
    {
      label: 'Create Buy Order',
      type: 'primary' as ButtonType,
      icon: 'add',
      click: () => this.openBuyOrders(),
    }
  ];
  readonly minutesExtraButtons = [
    {
      label: 'Edit',
      type: 'primary' as ButtonType,
      icon: 'add',
      click: () => this.editminutes(),
    }
  ];

  zuoraSettingsForm = new FormGroup({
    apiKey: new FormControl(''),
    endpoint: new FormControl('')
  });

  readonly sectionTitle = computed(
    () => (this.routeData()['sectionTitle'] as string | undefined) ?? 'Dialer Settings'
  );
  openBuyOrders() {

  }
  readonly isLicensesPage = computed(
    () => this.sectionTitle() === 'Licenses'
  );
  readonly isLicensesAddonsPage = computed(
    () => this.sectionTitle() === 'License Add-ons'
  );
  readonly isAccountAddonsPage = computed(
    () => this.sectionTitle() === 'Account Add-ons'
  );
  readonly isInboundNumberPage = computed(
    () => this.sectionTitle() === 'Inbound Numbers'
  );
  readonly isOneTimeChargePage = computed(
    () => this.sectionTitle() === 'One-time Charge'
  );
  readonly isMinutesPage = computed(
    () => this.sectionTitle() === 'Minutes Credit'
  );

  asFieldConfig(field: any): FieldConfig {
    return field.config;
  }
  editminutes() {}

}
