import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, CardComponent, FieldConfig, SelectComponent } from '@eh-library/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

interface ComplianceField extends FieldConfig {
  value: string;
}

interface ComplianceRow {
  key: string;
  label: string;
  dnc: ComplianceField[];
  sms: ComplianceField[];
}

@Component({
  selector: 'app-service-compliance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, MatIconModule, MatSelectModule, MatFormFieldModule, MatOptionModule, MatCardModule, SelectComponent],
  templateUrl: './service-compliance.html',
  styleUrls: ['./service-compliance.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCompliance {
  private readonly fb = inject(FormBuilder);

  readonly yesNoOptions = [
    { key: 'No', value: 'No' },
    { key: 'Yes', value: 'Yes' },
  ];

  readonly enableRNDConfig: FieldConfig = {
    name: 'enableRND',
    label: '',
    placeholder: 'Select...',
    hasSearch: false,
    options: this.yesNoOptions,
  };

  readonly complianceForm = this.fb.group({
    enableRND: ['No', [Validators.required]],
    rows: this.fb.array([]),
  });

  readonly complianceRows: ComplianceRow[] = [
    {
      key: 'DNC',
      label: 'Do NOT Call',
      dnc: [
        { name: 'dncStatus', label: 'Status', placeholder: 'Select...', hasSearch: false, options: this.yesNoOptions, value: 'Yes' },
        { name: 'dncReason', label: 'Reason', placeholder: 'Select...', hasSearch: false, options: [{ key: 'DNC', value: 'DNC' }, { key: 'ConsentRevoked', value: 'ConsentRevoked' }], value: 'DNC' },
        { name: 'dncCampaignScopeVoice', label: 'Campaign Scope (Voice)', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Use Campaign Settings', value: 'Use Campaign Settings' }, { key: 'Purpose', value: 'Purpose' }], value: 'Use Campaign Settings' },
        { name: 'dncCampaignScopeSMS', label: 'Campaign Scope (SMS)', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Purpose', value: 'Purpose' }], value: 'Purpose' },
        { name: 'dncAddNumbersVoice', label: 'Add Numbers to DNC (Voice)', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Use Campaign Settings', value: 'Use Campaign Settings' }, { key: 'Add Current Number', value: 'Add Current Number' }], value: 'Use Campaign Settings' },
        { name: 'dncAddNumbersSMS', label: 'Add Numbers to DNC (SMS)', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Add Numbers to DNC (SMS)', value: 'Add Numbers to DNC (SMS)' }], value: 'Add Numbers to DNC (SMS)' },
      ],
      sms: [
        { name: 'smsStatus', label: 'Status', placeholder: 'Select...', hasSearch: false, options: this.yesNoOptions, value: 'No' },
      ],
    },
    {
      key: 'PHNREV',
      label: 'Phone Revoke Consent',
      dnc: [
        { name: 'dncStatus', label: 'Status', placeholder: 'Select...', hasSearch: false, options: this.yesNoOptions, value: 'Yes' },
        { name: 'dncReason', label: 'Reason', placeholder: 'Select...', hasSearch: false, options: [{ key: 'ConsentRevoked', value: 'ConsentRevoked' }], value: 'ConsentRevoked' },
        { name: 'dncCampaignScopeVoice', label: 'Campaign Scope (Voice)', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Purpose', value: 'Purpose' }], value: 'Purpose' },
        { name: 'dncCampaignScopeSMS', label: 'Campaign Scope (SMS)', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Purpose', value: 'Purpose' }], value: 'Purpose' },
        { name: 'dncAddNumbersVoice', label: 'Add Numbers to DNC (Voice)', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Add Current Number', value: 'Add Current Number' }], value: 'Add Current Number' },
        { name: 'dncAddNumbersSMS', label: 'Add Numbers to DNC (SMS)', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Add Numbers to DNC (SMS)', value: 'Add Numbers to DNC (SMS)' }], value: 'Add Numbers to DNC (SMS)' },
      ],
      sms: [
        { name: 'smsStatus', label: 'Status', placeholder: 'Select...', hasSearch: false, options: this.yesNoOptions, value: 'No' },
      ],
    },
    {
      key: 'PNSREV',
      label: 'PhoneSMS Revoke Consent',
      dnc: [
        { name: 'dncStatus', label: 'Status', placeholder: 'Select...', hasSearch: false, options: this.yesNoOptions, value: 'Yes' },
        { name: 'dncReason', label: 'Reason', placeholder: 'Select...', hasSearch: false, options: [{ key: 'ConsentRevoked', value: 'ConsentRevoked' }], value: 'ConsentRevoked' },
        { name: 'dncCampaignScopeVoice', label: 'Campaign Scope (Voice)', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Purpose', value: 'Purpose' }], value: 'Purpose' },
        { name: 'dncCampaignScopeSMS', label: 'Campaign Scope (SMS)', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Purpose', value: 'Purpose' }], value: 'Purpose' },
        { name: 'dncAddNumbersVoice', label: 'Add Numbers to DNC (Voice)', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Add Current Number', value: 'Add Current Number' }], value: 'Add Current Number' },
        { name: 'dncAddNumbersSMS', label: 'Add Numbers to DNC (SMS)', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Add Numbers to DNC (SMS)', value: 'Add Numbers to DNC (SMS)' }], value: 'Add Numbers to DNC (SMS)' },
      ],
      sms: [
        { name: 'smsStatus', label: 'Status', placeholder: 'Select...', hasSearch: false, options: this.yesNoOptions, value: 'Yes' },
        { name: 'smsReason', label: 'Reason', placeholder: 'Select...', hasSearch: false, options: [{ key: 'ConsentRevoked', value: 'ConsentRevoked' }], value: 'ConsentRevoked' },
        { name: 'smsCampaignScope', label: 'Campaign Scope', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Purpose', value: 'Purpose' }], value: 'Purpose' },
        { name: 'smsAddNumbers', label: 'Add Numbers to SMS Opt-Out', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Add Numbers to SMS Opt-Out', value: 'Add Numbers to SMS Opt-Out' }], value: 'Add Numbers to SMS Opt-Out' },
      ],
    },
    {
      key: 'SMSOPT',
      label: 'SMS Opt-Out',
      dnc: [
        { name: 'dncStatus', label: 'Status', placeholder: 'Select...', hasSearch: false, options: this.yesNoOptions, value: 'No' },
      ],
      sms: [
        { name: 'smsStatus', label: 'Status', placeholder: 'Select...', hasSearch: false, options: this.yesNoOptions, value: 'Yes' },
        { name: 'smsReason', label: 'Reason', placeholder: 'Select...', hasSearch: false, options: [{ key: 'SMSOPT', value: 'SMSOPT' }], value: 'SMSOPT' },
        { name: 'smsCampaignScope', label: 'Campaign Scope', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Current Campaign', value: 'Current Campaign' }], value: 'Current Campaign' },
        { name: 'smsAddNumbers', label: 'Add Numbers to SMS Opt-Out', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Add Numbers to SMS Opt-Out', value: 'Add Numbers to SMS Opt-Out' }], value: 'Add Numbers to SMS Opt-Out' },
      ],
    },
    {
      key: 'SMSREV',
      label: 'SMS Revoke Consent',
      dnc: [
        { name: 'dncStatus', label: 'Status', placeholder: 'Select...', hasSearch: false, options: this.yesNoOptions, value: 'No' },
      ],
      sms: [
        { name: 'smsStatus', label: 'Status', placeholder: 'Select...', hasSearch: false, options: this.yesNoOptions, value: 'Yes' },
        { name: 'smsReason', label: 'Reason', placeholder: 'Select...', hasSearch: false, options: [{ key: 'ConsentRevoked', value: 'ConsentRevoked' }], value: 'ConsentRevoked' },
        { name: 'smsCampaignScope', label: 'Campaign Scope', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Purpose', value: 'Purpose' }], value: 'Purpose' },
        { name: 'smsAddNumbers', label: 'Add Numbers to SMS Opt-Out', placeholder: 'Select...', hasSearch: false, options: [{ key: 'Add Numbers to SMS Opt-Out', value: 'Add Numbers to SMS Opt-Out' }], value: 'Add Numbers to SMS Opt-Out' },
      ],
    },
  ];

  get rows() {
    return this.complianceForm.get('rows') as FormArray;
  }

  get rowGroups(): FormGroup[] {
    return this.rows.controls as FormGroup[];
  }

  get enableRNDControl() {
    return this.complianceForm.get('enableRND') as any;
  }

  constructor() {
    this.complianceRows.forEach(row => this.rows.push(this.createRow(row)));
  }

  createRow(row: ComplianceRow) {
  const group: { [key: string]: any } = {};
  
  // Use forEach with a safety check for name
  row.dnc.forEach(field => {
    if (field.name) {
      group[field.name] = [field.value || ''];
    }
  });

  row.sms.forEach(field => {
    if (field.name) {
      group[field.name] = [field.value || ''];
    }
  });

  return this.fb.group(group);
}
// Get max DNC config (used for headers + alignment)
get maxDncConfig(): ComplianceField[] {
  return this.complianceRows.reduce((max, row) => {
    return row.dnc.length > max.length ? row.dnc : max;
  }, [] as ComplianceField[]);
}

// Get max SMS config
get maxSmsConfig(): ComplianceField[] {
  return this.complianceRows.reduce((max, row) => {
    return row.sms.length > max.length ? row.sms : max;
  }, [] as ComplianceField[]);
}

// Column counts
get maxDncFields(): number {
  return this.maxDncConfig.length;
}

get maxSmsFields(): number {
  return this.maxSmsConfig.length;
}

}
