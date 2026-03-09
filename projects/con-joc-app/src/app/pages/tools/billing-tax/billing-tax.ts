import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { ButtonComponent, DatePickerComponent, FieldConfig, SelectComponent } from '@eh-library/common';
@Component({
  selector: 'app-billing-tax',
  standalone:true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,SelectComponent,DatePickerComponent,ButtonComponent,MatDividerModule],
  templateUrl: './billing-tax.html',
  styleUrl: './billing-tax.scss',
})
export class BillingTax {

    billingTaxForm=new FormGroup({
    account:new FormControl(''),
    date:new FormControl('')
  })

  selectConfig: FieldConfig = {
    name: 'account',
    label: 'Account',
    placeholder: 'Select Account',
    hasSearch: false,
    options: [
      { key: 'SkySun', value: 'SkySun' },
      { key: 'Acculevel', value: 'Acculevel' },
      { key: 'Peaden', value: 'Peaden' },
      { key: 'Onpoint', value: 'Onpoint' },
      { key: 'Insuraway', value: 'Insuraway' },
      

    ]
  };

   dateFieldConfig: FieldConfig = {
    name: 'date',
    label: 'Select Month & Year :',
    placeholder: 'Select your birth date',
    optional: false,
    utilityClasses: 'my-datepicker-class',
    width: '200px'
  };

  onSubmit(){

  }
  


}
