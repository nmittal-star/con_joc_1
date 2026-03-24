import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountsDataService } from '../../../data-access/omni/accounts/accounts.api';
import { accountFieldsArray } from '../../../shared/field-config';
import { ButtonType, CheckboxComponent, DialogService, DrawerComponent, FieldConfig, PaginationConfig, RadioButtonComponent, SelectComponent, SnackbarConfig, TableColumn, TableComponent, TableConfig, TableFilterConfig, TextareaComponent, TextboxComponent, UserData } from '@eh-library/common';
@Component({
  selector: 'app-general-setting',
  imports: [
    ReactiveFormsModule,
    CheckboxComponent,
    TextboxComponent,
    SelectComponent,
    RadioButtonComponent,
    TextareaComponent
  ],
  templateUrl: './general-setting.html',
  styleUrl: './general-setting.scss',
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
  @Input() fields: Array<{ labels: string; type: any; name: string }> | null = null;
  form: FormGroup = new FormGroup({});

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private accountsDataService = inject(AccountsDataService);

  ngOnInit(): void {
    if (!this.fields || this.fields.length === 0) {
      this.fields = accountFieldsArray;
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.accountsDataService.getAccounts().subscribe((accounts: any[]) => {
        const account = accounts.find(acc => String(acc.id) === String(id));
        if (account) {
          this.initForm(account);
        } else {
          this.initForm();
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
    // Defensive: log if any field is missing from the form group
    for (const field of this.fields) {
      if (!this.form.contains(field.name)) {
        console.error('Form group is missing control for field:', field.name);
      }
    }
  }
}
