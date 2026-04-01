import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectorRef, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TableComponent, TableColumn, TableConfig, TextboxComponent, ButtonComponent, DialogService, SnackbarService, SnackbarConfig, ButtonType, TextareaComponent } from '@eh-library/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { EmailListsDataService } from '../../../../data-access/tools/email-lists/email-lists.api';

@Component({
  selector: 'app-email-settings',
   standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatDialogModule,MatInputModule, MatFormFieldModule, TextboxComponent, TableComponent, ButtonComponent, MatDividerModule,TranslateModule,TextareaComponent,MatIconModule],
  templateUrl: './email-settings.html',
  styleUrl: './email-settings.scss',
})
export class EmailSettings {

    @ViewChild('namesTemplate', { static: true }) namesTemplate!: TemplateRef<any>;


   extraButtons = [
    {
      label: 'Subscribe Email Address ',
      type: 'primary' as ButtonType,
      icon: 'add',
      click: () => this.open(),
    },
  ];
  

   private emailSubject = new BehaviorSubject<any[]>([]);
  emailDataSource$ = this.emailSubject.asObservable();
  

  emailConfig: TableConfig = {
    showSearch: false,
    showExport: false,
    showPagination: true,
    serverSide: false,
    loading: false,
    usePagination: false,
    showExtraButtons: true,
  };

  
  isEditmode = false;
  emailListID = '';
  stored: string | null = null;
  // dialogRef: any;

   settingsForm = new FormGroup({
    id: new FormControl(''),
    handle: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
  });

   emailColumns: TableColumn[] = [
    { key: 'id', label: 'ID', searchable: true },
    { key: 'name', label: 'Name', sortable: true, searchable: true },
    { key: 'email', label: 'Email Address', searchable: true },

    {
      key: 'actions',
      label: 'Actions',
      type: 'action',
      sortable: false,
      actions: [
        { icon: 'delete', tooltip: 'Delete', callback: (row) => this.deleteEmail(row) },
      ],
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute, private dialogService: DialogService, private snackbar: SnackbarService, private cdr: ChangeDetectorRef,private emaillistsDataService: EmailListsDataService,) {this.addRow();}

    ngOnInit(): void {
  
    this.stored = localStorage.getItem('selectedEmailList');
    if (this.stored) {
      let prefixData = JSON.parse(this.stored).prefixData;
      this.emailListID = JSON.parse(this.stored).id;
      this.settingsForm.patchValue(JSON.parse(this.stored));
      this.emailSubject.next(prefixData);
    }
  }
 

  saveChanges(){

  }

    toggleEditMode() {
    this.isEditmode = !this.isEditmode;
    Object.keys(this.settingsForm.controls).forEach(control => {
      if (this.isEditmode) this.settingsForm.get(control)?.enable();
      else this.settingsForm.get(control)?.disable();
    });
  }

 

    open(): void {
    this.dialogRef = this.dialogService.open({
      title: 'Subscribe Email Addresses',
      dialogContent: this.namesTemplate,
      actionButtons: [
        { label: 'Save', type: 'primary', disabled: true, onClick: () => this.submit() },
      ],
      width: '550px',
      panelClass: 'custom-dialog-panel'
    });
  }

  onConfirmClick(): void {
  //  console.log(this.accountGroupsForm.value,'value');
  //  this.accountGroupsForm.reset()
  //  this.dialogRef.close()
   
  }

   private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<EmailSettings>, { optional: true });

  form = this.fb.group({
    emails: this.fb.array([]),
  });

  get emails(): FormArray {
    return this.form.get('emails') as FormArray;
  }

  

  addRow() {
    this.emails.push(
      this.fb.group({
        name: [''],
        email: ['', [Validators.required, Validators.email]],
      })
    );
  }

  removeRow(index: number) {
    if (this.emails.length > 1) {
      this.emails.removeAt(index);
    }
  }

 submit() {
  if (this.form.valid) {
    console.log(this.form.value);
    this.dialogRef?.close(this.form.value); 
  }
}



  get emailGroups(): FormGroup[] {
    return this.emails.controls as FormGroup[];
  }

close() {
  this.dialogRef?.close(); 
}


deleteEmail(row: any){
  this.emaillistsDataService.deleteEmailSettings(row.id).subscribe(() => {
    this.emailSubject.next(this.emailSubject.getValue().filter(email => email.id !== row.id));
  });
}
}
