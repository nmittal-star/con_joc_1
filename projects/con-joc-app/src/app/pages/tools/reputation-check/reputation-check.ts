import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, FieldConfig, SelectComponent, TextareaComponent, TextboxComponent } from '@eh-library/common';

@Component({
  selector: 'app-reputation-check',
  imports: [SelectComponent,TextboxComponent,FormsModule,ReactiveFormsModule,CommonModule,TextareaComponent,ButtonComponent],
  templateUrl: './reputation-check.html',
  styleUrl: './reputation-check.scss',
})
export class ReputationCheck {

  reputationForm = new FormGroup({
    type: new FormControl('Call'),      
    provider: new FormControl('Twilio'), 
    subprovider:new FormControl(''),
    from_number:new FormControl(''),
    to_number:new FormControl(''),
    note:new FormControl('')
  })

  selectConfig: FieldConfig = {
    name: 'type',
    label: 'Check Type',
    placeholder: 'Select Type',
    hasSearch: false,
    options: [
      { key: 'SMS', value: 'SMS' },
      { key: 'Call', value: 'Call' },
      

    ]
  };

  selectProviderConfig: FieldConfig = {
    name: 'provider',
    label: 'Provider',
    placeholder: 'Select Provider',
    hasSearch: false,
    options: [
      { key: 'Twilio', value: 'Twilio' },
      { key: 'Nomorobo', value: 'Nomorobo' },
      { key: 'MagnifyTelecom', value: 'MagnifyTelecom' },
      { key: 'GoogleRepCheck', value: 'GoogleRepCheck' },
      
    ]
  };

  selectSubProviderConfig: FieldConfig = {
    name: 'subprovider',
    label: 'Sub-Providers',
    placeholder: 'Select SubProvider',
    hasSearch: false,
    options: [
      { key: 'Twilio', value: 'Twilio' },
      { key: 'Nomorobo', value: 'Nomorobo' },
      { key: 'MagnifyTelecom', value: 'MagnifyTelecom' },
      { key: 'GoogleRepCheck', value: 'GoogleRepCheck' },
      
    ]
  };

  onSubmit(){

  }
}
