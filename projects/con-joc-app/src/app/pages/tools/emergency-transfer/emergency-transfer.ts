import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldConfig, SelectComponent } from '@eh-library/common';


@Component({
  selector: 'app-emergency-transfer',
  imports: [SelectComponent,CommonModule],
  templateUrl: './emergency-transfer.html',
  styleUrl: './emergency-transfer.scss',
})
export class EmergencyTransfer {

emergencyForm = new FormGroup({
  cluster: new FormControl(''),
  registration_server: new FormControl(''),
  from_server: new FormControl(''),
  to_servers: new FormControl([])
});


    selectConfig: FieldConfig = {
    name: 'cluster',
    label: 'Cluster',
    placeholder: 'Select Cluster',
    hasSearch: true,
    options: [
      { key: 'Cluster 1', value: 'Cluster 1' },
      { key: 'Cluster 2', value: 'Cluster 2' },
      { key: 'Cluster 3', value: 'Cluster 3' },
      { key: 'Cluster 4', value: 'Cluster 4' },
      { key: 'Cluster 5', value: 'Cluster 5' },
      { key: 'Cluster 6', value: 'Cluster 6' },
      { key: 'Cluster 7', value: 'Cluster 7' },

    ]
  };

    registrationConfig: FieldConfig = {
    name: 'cluster',
    label: 'Registration Server Down?',
    placeholder: 'Select Registration Server',
    hasSearch: true,
    options: [
      { key: 'Yes', value: 'Yes' },
      { key: 'No', value: 'No' },


    ]
  };

  fromServerConfig: FieldConfig = {
    name: 'from_server',
    label: 'From Server',
    placeholder: 'Select Server',
    hasSearch: true,
    options: [
      { key: '66.85.244.23', value: '66.85.244.23' },
      { key: '66.85.244.24', value: '66.85.244.24' }
    ]
  };


  toServerConfig: FieldConfig = {
  name: 'to_servers',
  label: 'To Server(s)',
  placeholder: 'Select Servers',
  hasSearch: true,
  // multiple: true,   
  options: [
    { key: '66.85.244.37', value: '66.85.244.37' },
    { key: '66.85.245.134', value: '66.85.245.134' },
    { key: '66.85.245.135', value: '66.85.245.135' }
  ]
};
}
