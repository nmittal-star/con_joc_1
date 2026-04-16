import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, FieldConfig, TableColumn, TableConfig, TextareaComponent, TextboxComponent, UserData } from '@eh-library/common';
import { GenericTable } from '../../generic-table/generic-table';

interface AolField {
  name: string;
  label: string;
  max: number;
  multiplier: number;
  systemProvided: number;
  config: FieldConfig;
}

const AOL_FIELD_DEFS = [
  { name: 'additionalChannels', label: 'Additional Channels', max: 7,       multiplier: 0, systemProvided: 0 },
  { name: 'campaign',           label: 'Campaign',            max: 15,      multiplier: 0, systemProvided: 0 },
  { name: 'dncLeadCapacity',    label: 'DNC Lead Capacity',   max: 1200000, multiplier: 0, systemProvided: 0 },
  { name: 'list',               label: 'List',                max: 60,      multiplier: 0, systemProvided: 0 },
  { name: 'listMix',            label: 'List Mix',            max: 0,       multiplier: 0, systemProvided: 0 },
  { name: 'pbxConference',      label: 'PBX Conference',      max: 15,      multiplier: 0, systemProvided: 0 },
  { name: 'pbxIvr',             label: 'PBX IVR',             max: 15,      multiplier: 0, systemProvided: 0 },
  { name: 'pbxQueue',           label: 'PBX Queue',           max: 15,      multiplier: 0, systemProvided: 0 },
  { name: 'pbxRingGroup',       label: 'PBX Ring Group',      max: 15,      multiplier: 0, systemProvided: 0 },
  { name: 'queue',              label: 'Queue',               max: 20,      multiplier: 0, systemProvided: 0 },
  { name: 'userCapacity',       label: 'User Capacity',       max: 400,     multiplier: 0, systemProvided: 0 },
];

@Component({
  selector: 'app-aol-page',
  imports: [CommonModule, ReactiveFormsModule, TextboxComponent, TextareaComponent, ButtonComponent, GenericTable],
  templateUrl: './aol-page.html',
  styleUrl: './aol-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AolPage {
  private readonly fb = inject(FormBuilder);

  readonly fields: AolField[] = AOL_FIELD_DEFS.map(f => ({
    ...f,
    config: {
      name: f.name,
      placeholder: '0',
      type: 'number',
    } as FieldConfig,
  }));

  readonly accountNotesForm = this.fb.group({ accountNotes: [''] });

  readonly aolForm = this.fb.group(
    AOL_FIELD_DEFS.reduce((acc, f) => ({
      ...acc,
      [f.name]: [0, [Validators.min(0), Validators.max(f.max)]],
    }), {} as Record<string, any>)
  );

  readonly tableColumns: TableColumn[] = [
    { key: 'object',         label: 'Object',          sortable: false, searchable: false },
    { key: 'default',        label: 'Default',         sortable: false, searchable: false },
    { key: 'multiplier',     label: 'Multiplier',      sortable: false, searchable: false },
    { key: 'systemProvided', label: 'System Provided', sortable: false, searchable: false },
  ];

  readonly tableRows: UserData[] = AOL_FIELD_DEFS.map(f => ({
    object:         f.label,
    default:        0,
    multiplier:     f.multiplier,
    systemProvided: f.systemProvided,
  })) as unknown as UserData[];

  readonly tableConfig: TableConfig = {
    showSearch:       false,
    showExport:       false,
    showPagination:   false,
    serverSide:       false,
    loading:          false,
    usePagination:    false,
    showExtraButtons: false,
    isCheckBox:       false,
  };

  save(): void {
    this.aolForm.markAllAsTouched();
    if (this.aolForm.invalid) return;
    // TODO: submit form values
  }
}
