import { Component } from '@angular/core';
import { DropAreaComponent,DropAreaConfig} from '@eh-library/common';

@Component({
  selector: 'app-lerg-update',
  standalone:true,
  imports: [DropAreaComponent],
  templateUrl: './lerg-update.html',
  styleUrl: './lerg-update.scss',
})
export class LergUpdate {

  
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
