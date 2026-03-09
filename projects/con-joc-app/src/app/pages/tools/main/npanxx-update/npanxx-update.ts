import { Component } from '@angular/core';
import { DropAreaComponent,DropAreaConfig } from '@eh-library/common';

@Component({
  selector: 'app-npanxx-update',
  imports: [DropAreaComponent],
  templateUrl: './npanxx-update.html',
  styleUrl: './npanxx-update.scss',
})
export class NpanxxUpdate {

  
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
