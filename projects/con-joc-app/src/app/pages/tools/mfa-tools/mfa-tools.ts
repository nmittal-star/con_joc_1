import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { ButtonComponent, TextboxComponent } from '@eh-library/common';

@Component({
  selector: 'app-mfa-tools',
  imports: [TextboxComponent,ReactiveFormsModule,FormsModule,ButtonComponent,MatDividerModule],
  templateUrl: './mfa-tools.html',
  styleUrl: './mfa-tools.scss',
})
export class MfaTools {
  mfaForm = new FormGroup({
    form_email: new FormControl(''),
    to_email:new FormControl('')
  })

  onSubmit(){

  }

  onClear(){

  }
}
