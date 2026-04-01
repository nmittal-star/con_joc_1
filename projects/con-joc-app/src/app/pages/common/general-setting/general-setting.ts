import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountsDataService } from '../../../data-access/omni/accounts/accounts.api';
import { UsersDataService } from '../../../data-access/omni/users/users.api';
import { accountFieldsArray } from '../../../shared/field-config';
import { CheckboxComponent, DialogService, DrawerComponent, FieldConfig, PaginationConfig, RadioButtonComponent, SelectComponent, SnackbarConfig, TableColumn, TableComponent, TableConfig, TableFilterConfig, TextareaComponent, TextboxComponent, UserData } from '@eh-library/common';
import { GenericTable } from '../generic-table/generic-table';

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
  ],
  templateUrl: './general-setting.html',
  styleUrl: './general-setting.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSetting implements OnInit, OnChanges {
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

  heading = 'General Setting';
  mode: 'form' | 'table' = 'form';
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

  readonly tableConfig: TableConfig = {
    showSearch: true,
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
  private usersDataService = inject(UsersDataService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.heading = (this.route.snapshot.data['breadcrumb'] as string)
      ?? (this.route.parent?.snapshot.data['breadcrumb'] as string)
      ?? 'General Setting';
    this.mode = (this.route.snapshot.data['mode'] as 'form' | 'table') ?? 'form';

    if (this.mode === 'table') {
      // init a minimal form so the Account Notes card and dropdowns always have a binding
      this.form = this.fb.group({
        accountNotes: [''],
        recordRemoteSession: [''],
        loginUrl: [''],
      });
      this.usersDataService.getUsers().subscribe({
        next: (res: any) => {
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
