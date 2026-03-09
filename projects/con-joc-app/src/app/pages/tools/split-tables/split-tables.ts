import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { ButtonComponent, FieldConfig, SelectComponent, TextboxComponent } from '@eh-library/common';

@Component({
  selector: 'app-split-tables',
  standalone:true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,SelectComponent,ButtonComponent,MatDividerModule,TextboxComponent],
  templateUrl: './split-tables.html',
  styleUrl: './split-tables.scss',
})
export class SplitTables {

  splitTableForm=new FormGroup({
    name:new FormControl(''),
    cluster:new FormControl(''),
    password:new FormControl('')
  })

  selectConfig: FieldConfig = {
    name: 'name',
    label: 'Name',
    placeholder: 'Select ',
    hasSearch: true,
    options: [
      { key: 'Manager', value: 'Manager' },
      { key: 'Lead', value: 'Lead' },
      { key: 'Log', value: 'Log' },
      { key: 'User Log', value: 'User Log' },
      { key: 'Live Agent', value: 'Live Agent' },
      

    ]
  };
  selectClusterConfig: FieldConfig = {
    name: 'cluster',
    label: 'Clusters',
    placeholder: 'Select Clusters',
    hasSearch: true,
    options: [
      { key: 'Cluster 01', value: 'Cluster 01' },
      { key: 'Cluster 02', value: 'Cluster 02' },
      { key: 'Cluster 03', value: 'Cluster 03' },
      { key: 'Cluster 04', value: 'Cluster 04' },
      { key: 'Cluster 05', value: 'Cluster 05' },
      

    ]
  };

  onSubmit(){

  }

}
