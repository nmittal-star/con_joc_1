import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountsDataService } from '../../../data-access/omni/accounts/accounts.api';
import { TrunksDataService } from '../../../data-access/omni/trunks/trunks.api';
import { ContactsDataService } from '../../../data-access/omni/contacts/contacts.api';
import { UsersDataService } from '../../../data-access/omni/users/users.api';
import { accountFieldsArray } from '../../../shared/field-config';
import { ButtonType, CheckboxComponent, DialogService, DrawerComponent, FieldConfig, PaginationConfig, RadioButtonComponent, SelectComponent, SnackbarConfig, TableColumn, TableComponent, TableConfig, TableFilterConfig, TextareaComponent, TextboxComponent, UserData } from '@eh-library/common';
import { GenericTable } from '../generic-table/generic-table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-general-setting',
  imports: [
    ReactiveFormsModule,
    CheckboxComponent,
    TextboxComponent,
    SelectComponent,
    RadioButtonComponent,
    TextareaComponent,
    GenericTable,
    MatIconModule,
  ],
  templateUrl: './general-setting.html',
  styleUrl: './general-setting.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSetting implements OnInit, OnChanges {
  @ViewChild('mrmFundsTemplate', { static: true }) mrmFundsTemplate!: TemplateRef<unknown>;
  @ViewChild('sipTrunkTemplate', { static: true }) sipTrunkTemplate!: TemplateRef<unknown>;
  @ViewChild('editTrunkSettingsTemplate', { static: true }) editTrunkSettingsTemplate!: TemplateRef<unknown>;

  private readonly tableVariantByRoute: Record<string, 'user' | 'trunks' | 'contacts'> = {
    user: 'user',
    trunks: 'trunks',
    contacts: 'contacts',
  };

    get chunkedFields() {
      if (!this.fields) return [];
      const chunked = [];
      for (let i = 0; i < this.fields.length; i += 2) {
        chunked.push(this.fields.slice(i, i + 2));
      }
      return chunked;
    }

  /** Maps a field (which uses `labels`) to a proper FieldConfig (which uses `label`). */
  asFieldConfig(field: any): any {
    return { ...field, label: field.labels ?? field.label };
  }
  @Input() fields: Array<{ labels: string; type: any; name: string }> | null = null;
  form: FormGroup | null = null;
  dialogRef: { close: () => void } | null = null;

  heading = 'General Setting';
  mode: 'form' | 'table' = 'form';
  tableVariant: 'user' | 'trunks' | 'contacts' = 'user';
  tableRows: UserData[] = [];

  readonly recordRemoteSessionConfig: FieldConfig = {
    name: 'recordRemoteSession',
    label: 'Record Remote Session',
    placeholder: 'Select...',
    hasSearch: false,
    options: [
      { key: 'Yes', value: 'Yes' },
      { key: 'No', value: 'No' },
    ],
  };

  readonly loginUrlConfig: FieldConfig = {
    name: 'loginUrl',
    label: 'Login URL Type',
    placeholder: 'Select...',
    hasSearch: false,
    options: [
      { key: 'Standard', value: 'Standard' },
      { key: 'Custom', value: 'Custom' },
    ],
  };

  readonly userColumns: TableColumn[] = [
    { key: 'sl', label: 'Sl.No', sortable: false },
    { key: 'first_name', label: 'First Name', sortable: true, searchable: true },
    { key: 'last_name', label: 'Last Name', sortable: true, searchable: true },
    { key: 'email', label: 'Email', sortable: true, searchable: true },
    { key: 'id', label: 'ID', searchable: true },
    { key: 'registration', label: 'Registration', searchable: true },
    { key: 'creationDate', label: 'Creation Date', sortable: true, searchable: true },
    { key: 'acl', label: 'ACL', sortable: true, searchable: true },
    { key: 'session', label: 'Session', searchable: true },
  ];

  readonly trunkColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, searchable: true },
    { key: 'trunkType', label: 'Trunk Type', sortable: true, searchable: true },
    { key: 'status', label: 'Status', sortable: true, searchable: true },
    { key: 'payType', label: 'Pay Type', sortable: true, searchable: true },
    { key: 'unlimited', label: 'Unlimited', sortable: true, searchable: true },
    { key: 'balance', label: 'Balance ($)', sortable: true, searchable: true },
    { key: 'allowedNegativeBalance', label: 'Allowed Negative Balance ($)', sortable: true, searchable: true },
    { key: 'refillAmount', label: 'Refill Amount ($)', sortable: true, searchable: true },
    { key: 'balanceBeforeRefill', label: 'Balance before Refill ($)', sortable: true, searchable: true },
    { key: 'rateCents', label: 'Rate (cents)', sortable: true, searchable: true },
    { key: 'transactionRetry', label: 'Transaction Retry', sortable: true, searchable: true },
    { key: 'minStartSeconds', label: 'Min. Start Seconds', sortable: true, searchable: true },
    { key: 'incrementSeconds', label: 'Increment Seconds', sortable: true, searchable: true },
    { key: 'dialPlan', label: 'Dial Plan', sortable: true, searchable: true },
    { key: 'mrmFundPercent', label: 'MRM Fund %', sortable: true, searchable: true },
    {
      key: 'actions',
      label: 'Action',
      type: 'action',
      sortable: false,
      actions: [
        { icon: 'edit', tooltip: 'Edit Trunk', callback: () => undefined },
      ],
    },
  ];

  readonly contactColumns: TableColumn[] = [
    { key: 'firstName', label: 'First Name', sortable: true, searchable: true },
    { key: 'lastName', label: 'Last Name', sortable: true, searchable: true },
    { key: 'title', label: 'Title', sortable: true, searchable: true },
    { key: 'email', label: 'Email', sortable: true, searchable: true },
    { key: 'officePhone', label: 'Office Phone Number', sortable: true, searchable: true },
    { key: 'mobilePhone', label: 'Mobile Phone Number', sortable: true, searchable: true },
    { key: 'comment', label: 'Comment', sortable: false, searchable: true },
    { key: 'notify', label: 'Notify*', sortable: true, searchable: false },
    {
      key: 'actions',
      label: 'Edit',
      type: 'action',
      sortable: false,
      actions: [
        { icon: 'edit', tooltip: 'Edit Contact', callback: () => undefined },
      ],
    },
  ];

  readonly contactExtraButtons = [
    {
      label: 'Show All',
      type: 'secondary' as ButtonType,
      icon: 'list',
      click: () => undefined,
    },
    {
      label: 'Add Contact',
      type: 'primary' as ButtonType,
      icon: 'person_add',
      click: () => undefined,
    },
    {
      label: 'Search',
      type: 'secondary' as ButtonType,
      icon: 'search',
      click: () => undefined,
    },
  ];

  readonly trunkExtraButtons = [
    {
      label: 'MRM Funds Percents',
      type: 'primary' as ButtonType,
      icon: 'add',
      click: () => this.openMrmFundsDialog(),
    },
    {
      label: 'SIP Trunk',
      type: 'primary' as ButtonType,
      icon: 'call_made',
      click: () => this.openSipTrunkDialog(),
    },
    {
      label: 'Edit Settings',
      type: 'secondary' as ButtonType,
      icon: 'edit',
      click: () => this.openEditTrunkSettingsDialog(),
    }
  ];

  readonly tableConfig: TableConfig = {
    showSearch: false,
    showExport: false,
    showPagination: false,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: false,
    isCheckBox: false,
  };

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private accountsDataService = inject(AccountsDataService);
  private dialogService = inject(DialogService);
  private contactsDataService = inject(ContactsDataService);
  private trunksDataService = inject(TrunksDataService);
  private usersDataService = inject(UsersDataService);
  private cdr = inject(ChangeDetectorRef);

  readonly mrmFundsForm = this.fb.group({
    percentage: [''],
    notes: [''],
  });

  readonly sipTrunkForm = this.fb.group({
    trunkName: [''],
    gateway: [''],
    port: ['5060'],
  });

  readonly editTrunkSettingsForm = this.fb.group({
    status: ['Active'],
    dialPlan: ['US Standard'],
    payType: ['Prepaid'],
  });

  get activeColumns(): TableColumn[] {
    if (this.tableVariant === 'trunks') return this.trunkColumns;
    if (this.tableVariant === 'contacts') return this.contactColumns;
    return this.userColumns;
  }

  get activeExtraButtons(): { label: string; type?: ButtonType; icon?: string; disabled?: boolean; click?: () => void }[] {
    if (this.tableVariant === 'trunks') return this.trunkExtraButtons;
    if (this.tableVariant === 'contacts') return this.contactExtraButtons;
    return [];
  }

  get activeTableConfig(): TableConfig {
    return {
      ...this.tableConfig,
      showExtraButtons: this.tableVariant === 'trunks' || this.tableVariant === 'contacts',
    };
  }

  get showUserTableControls(): boolean {
    return this.tableVariant === 'user';
  }

  ngOnInit(): void {
    this.heading = (this.route.snapshot.data['breadcrumb'] as string)
      ?? (this.route.parent?.snapshot.data['breadcrumb'] as string)
      ?? 'General Setting';
    this.mode = (this.route.snapshot.data['mode'] as 'form' | 'table') ?? 'form';

    if (this.mode === 'table') {
      const routePath = this.route.routeConfig?.path ?? '';
      this.tableVariant = this.tableVariantByRoute[routePath] ?? 'user';

      // init a minimal form so the Account Notes card and dropdowns always have a binding
      this.form = this.fb.group({
        accountNotes: [''],
        recordRemoteSession: [''],
        loginUrl: [''],
      });

      const load$ =
        this.tableVariant === 'trunks'   ? this.trunksDataService.getTrunks() :
        this.tableVariant === 'contacts' ? this.contactsDataService.getContacts() :
                                           this.usersDataService.getUsers();

      load$.subscribe({
        next: (res: unknown) => {
          this.tableRows = Array.isArray(res) ? res as UserData[] : [];
          this.cdr.markForCheck();
        },
        error: () => {
          this.tableRows = [];
          this.cdr.markForCheck();
        }
      });
      return;
    }

    if (!this.fields || this.fields.length === 0) {
      this.fields = accountFieldsArray;
    }
    const id = this.route.snapshot.paramMap.get('id') ?? this.route.parent?.snapshot.paramMap.get('id');
    if (id) {
      this.accountsDataService.getAccounts().subscribe((accounts: any[]) => {
        const account = accounts.find(acc => String(acc.id) === String(id));
        if (account) {
          this.initForm(account);
        } else {
          const saved = localStorage.getItem('selectedReleaseLogId');
          if (saved) {
            this.initForm(JSON.parse(saved));
          } else {
            this.initForm();
          }
        }
      });
    } else {
      this.initForm();
    }
  }
  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fields'] && this.fields && this.fields.length) {
      this.initForm();
    }
  }

  openMrmFundsDialog(): void {
    this.mrmFundsForm.reset({ percentage: '', notes: '' });
    this.dialogRef = this.dialogService.open({
      title: 'MRM Funds Percents',
      dialogContent: this.mrmFundsTemplate,
      actionButtons: [
        { label: 'Cancel', type: 'secondary', onClick: () => this.closeDialog() },
        { label: 'Save', type: 'primary', onClick: () => this.saveMrmFunds() },
      ],
      width: '520px',
      panelClass: 'custom-dialog-panel',
    });
  }

  openSipTrunkDialog(): void {
    this.sipTrunkForm.reset({ trunkName: '', gateway: '', port: '5060' });
    this.dialogRef = this.dialogService.open({
      title: 'SIP Trunk',
      dialogContent: this.sipTrunkTemplate,
      actionButtons: [
        { label: 'Cancel', type: 'secondary', onClick: () => this.closeDialog() },
        { label: 'Create', type: 'primary', onClick: () => this.saveSipTrunk() },
      ],
      width: '520px',
      panelClass: 'custom-dialog-panel',
    });
  }

  openEditTrunkSettingsDialog(): void {
    this.editTrunkSettingsForm.reset({
      status: 'Active',
      dialPlan: 'US Standard',
      payType: 'Prepaid',
    });
    this.dialogRef = this.dialogService.open({
      title: 'Edit Trunk Settings',
      dialogContent: this.editTrunkSettingsTemplate,
      actionButtons: [
        { label: 'Cancel', type: 'secondary', onClick: () => this.closeDialog() },
        { label: 'Update', type: 'primary', onClick: () => this.saveTrunkSettings() },
      ],
      width: '520px',
      panelClass: 'custom-dialog-panel',
    });
  }

  closeDialog(): void {
    this.dialogRef?.close();
    this.dialogRef = null;
  }

  saveMrmFunds(): void {
    console.log('MRM funds form value:', this.mrmFundsForm.value);
    this.closeDialog();
  }

  saveSipTrunk(): void {
    console.log('SIP trunk form value:', this.sipTrunkForm.value);
    this.closeDialog();
  }

  saveTrunkSettings(): void {
    console.log('Edit trunk settings form value:', this.editTrunkSettingsForm.value);
    this.closeDialog();
  }

  private initForm(data?: any) {
    if (!this.fields) return;
    const group: Record<string, FormControl> = {};
    for (const field of this.fields) {
      if (!field.name) {
        console.warn('Field is missing a name property:', field);
        continue;
      }
      group[field.name] = new FormControl(data ? data[field.name] : '');
    }
    // Add accountNotes field for the notes card
    group['accountNotes'] = new FormControl(data ? data['accountNotes'] : '');
    this.form = this.fb.group(group);
    this.cdr.markForCheck();
    // Defensive: log if any field is missing from the form group
    for (const field of this.fields) {
      if (!this.form.contains(field.name)) {
        console.error('Form group is missing control for field:', field.name);
      }
    }
  }
}
