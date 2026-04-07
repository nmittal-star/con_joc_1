import { ChangeDetectionStrategy, Component, ViewChild, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent, DrawerComponent, DrawerConfig, FieldConfig, SelectComponent, TableColumn, TableConfig, TextareaComponent, TextboxComponent, UserData } from '@eh-library/common';
import { GenericTable } from '../generic-table/generic-table';

@Component({
  selector: 'app-service-page',
  imports: [ReactiveFormsModule, ButtonComponent, TextboxComponent, SelectComponent, TextareaComponent, DrawerComponent, GenericTable],
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

  brandRows: UserData[] = [];

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

  readonly complianceDrawerConfig: DrawerConfig = {
    title: 'Add Brand Details',
    hasClose: true,
    closeOnBackdropClick: true,
    autoOpen: false,
  };

  private readonly routeData = toSignal(this.route.data, { initialValue: this.route.snapshot.data });

  readonly sectionTitle = computed(
    () => (this.routeData()['sectionTitle'] as string | undefined) ?? 'Service'
  );

  readonly isCompliancePage = computed(
    () => this.sectionTitle() === 'Compliance'
  );

  readonly isIVAPage = computed(
    () => this.sectionTitle() === 'Intelligent Virtual Agent'
  );

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
}