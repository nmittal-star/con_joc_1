import { Component } from '@angular/core';
import {  DropAreaConfig, DropAreaComponent } from '@eh-library/common';

@Component({
  selector: 'app-cdr-compare',
  standalone:true,
  imports: [DropAreaComponent],
  templateUrl: './cdr-compare.html',
  styleUrl: './cdr-compare.scss',
})
export class CdrCompare {

  
   uploadedFile: File | null = null;




   dropSingleConfig: DropAreaConfig = {
    instructions: 'Drag and drop a single file here or use the button',
    buttonLabel: 'Browse to upload file',
    state: 'idle',
    accept: '.jpg,.jpeg,.png,.pdf',
    multiple: false,
    progress: 0,
    fileName: ''
  };

    handleDrop(files: FileList): void {
    if (!files || files.length === 0) return;

    const file = files.item(0);
    if (!file) return;

      this.uploadedFile = file;

    console.log('Uploaded file:', file);

    this.dropSingleConfig = {
      ...this.dropSingleConfig,
      state: 'success',
      fileName: file.name
    };
  }

 

}
