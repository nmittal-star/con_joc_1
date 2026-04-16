import { Component, computed, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CheckboxComponent, TextboxComponent, SelectComponent, RadioButtonComponent, TextareaComponent, DrawerComponent, ButtonComponent, TableColumn, UserData, TableConfig } from '@eh-library/common';
import { GenericTable } from '../../generic-table/generic-table';
import { group } from 'console';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { DialerSettings } from "./dialer-settings/dialer-settings";
import { CommonModule, CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-zuora-billing',
  imports: [ReactiveFormsModule,
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
    MatIconModule, DialerSettings,
    CommonModule,
    CurrencyPipe],
  templateUrl: './zuora-billing.html',
  styleUrl: './zuora-billing.scss',
})
export class ZuoraBilling {
  subscriptionRows: UserData[] = [];
  private fb = inject(FormBuilder);
  sectionTitle = computed(() => 'Zuora Billing');

  readonly accountNotesForm = this.fb.group({ accountNotes: [''] });

  // 1. Define the Calculator Form
  calcForm = this.fb.group({
    rows: this.fb.array([])
  });

  setupFeesForm = this.fb.group({
    setupRows: this.fb.array([
      this.fb.group({ price: [0] }),
      this.fb.group({ price: [0] }),
    ])
  });
  readonly subscriptionColumns: TableColumn[] = [
    { key: 'subscription', label: 'Subscription Number', sortable: true },
    { key: 'cancelOn', label: 'Cancel On' },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'Action' },
  ]
  readonly invoicesColumns: TableColumn[] = [
    { key: 'invoiceNumber', label: 'Invoice Number', sortable: true },
    { key: 'amount', label: 'Amount' },
    { key: 'balance', label: 'Balance' },
    { key: 'status', label: 'Status' },
    { key: 'invoiceDate', label: 'Invoice Date' },
    { key: 'action', label: 'Action' },
  ]
  readonly subscriptionTableConfig: TableConfig = {
    showSearch: false,
    showExport: false,
    showPagination: true,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: false,
    isCheckBox: false,
  };
  readonly invoicesTableConfig: TableConfig = {
    showSearch: false,
    showExport: false,
    showPagination: true,
    serverSide: false,
    loading: false,
    usePagination: true,
    showExtraButtons: false,
    isCheckBox: false,
  };
  private readonly route = inject(ActivatedRoute);
  private readonly routeData = toSignal(this.route.data, { initialValue: this.route.snapshot.data });

  get rows(): FormArray {
    return this.calcForm.get('rows') as FormArray;
  }
  
  ngOnInit() {
    const componentNames = [
      'Monthly Additional Dial Level Fee',
      'Monthly Phone Number Usage Fee',
      'Monthly Clear Caller ID Fee',
      'Monthly Per User License Fee - Standard',
      'Campaign Registry - Recurring'
    ];
    this.sectionTitle = computed(
    () => (this.routeData()['sectionTitle'] as string | undefined) ?? 'Zuora Billing'
  );
    // 2. Initialize each row
    componentNames.forEach(name => {
      this.rows.push(this.createRow(name));
    });
    // 3. Watch for changes to update totals
    this.rows.valueChanges.subscribe(() => {
      this.calculateTotals();
    });
  }
  readonly iszuoraSettingsPage = computed(
    () => this.sectionTitle() === 'Zuora Components Settings'
  );
  readonly iszuoraSubscriptionsPage = computed(
    () => this.sectionTitle() === 'Zuora Subscriptions'
  );
  readonly iszuoraInvoicesPage = computed(
    () => this.sectionTitle() === 'Invoices'
  );
  readonly isdialerSettingsPage = computed(
    () => this.sectionTitle() === 'Dialer Settings'
  );

  private createRow(name: string): FormGroup {
    return this.fb.group({
      componentName: [name],
      quantity: [0],
      price: [0],
      total: [{ value: 0, disabled: true }] // Total is read-only
    });
  }

  get setupFeesTotal(): number {
    const rows = this.setupFeesForm.get('setupRows')?.value ?? [];
    return rows.reduce((sum: number, r: any) => sum + (+r.price || 0), 0);
  }

  private calculateTotals() {
    this.rows.controls.forEach((control, index) => {
      const qty = control.get('quantity')?.value || 0;
      const price = control.get('price')?.value || 0;
      const total = qty * price;
      control.get('total')?.setValue(total, { emitEvent: false });
    });
  }
  get grandTotal(): number {
    return this.rows.controls.reduce((acc, control) => {
      const rowTotal = control.get('total')?.value || 0;
      return acc + rowTotal;
    }, 0);
  }
}
