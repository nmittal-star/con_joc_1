import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input } from '@angular/core';
import { logFieldsArray, logAvailableItems } from '../../../shared/logs-config';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextboxComponent, SelectComponent, TextareaComponent, ButtonComponent } from '@eh-library/common';

@Component({
  selector: 'app-view-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TextboxComponent,
    ButtonComponent,
    SelectComponent,
    TextareaComponent,
    DragDropModule,
  ],
  templateUrl: './view-page.html',
  styleUrl: './view-page.scss',
})
export class ViewPage implements OnInit {
  @Input() heading: string = 'View Page';
  form: FormGroup;
  fields = logFieldsArray;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      type: [''],
      internal: [''],
      note: [''],
      tickets: ['']
    });
  }

  // Dual listbox state
  availableItems: string[] = [...logAvailableItems];
  selectedItems: string[] = [];

  selectedAvailable: string[] = [];
  selectedSelected: string[] = [];

  ngOnInit(): void {}

  moveToSelected() {
    this.selectedItems = this.selectedItems.concat(this.selectedAvailable);
    this.availableItems = this.availableItems.filter(item => !this.selectedAvailable.includes(item));
    this.selectedAvailable = [];
  }

  moveToAvailable() {
    this.availableItems = this.availableItems.concat(this.selectedSelected);
    this.selectedItems = this.selectedItems.filter(item => !this.selectedSelected.includes(item));
    this.selectedSelected = [];
  }

  moveAllToSelected() {
    this.selectedItems = this.selectedItems.concat(this.availableItems);
    this.availableItems = [];
    this.selectedAvailable = [];
  }

  moveAllToAvailable() {
    this.availableItems = this.availableItems.concat(this.selectedItems);
    this.selectedItems = [];
    this.selectedSelected = [];
  }
  dropAvailable(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.availableItems, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
   // Select all available items
  selectAllAvailable() {
    this.selectedAvailable = [...this.availableItems];
  }

  // Select all selected items
  selectAllSelected() {
    this.selectedSelected = [...this.selectedItems];
  }

  dropSelected(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.selectedItems, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
   // Toggle selection for available/selected items
  toggleSelectAvailable(item: string) {
    const idx = this.selectedAvailable.indexOf(item);
    if (idx > -1) {
      this.selectedAvailable.splice(idx, 1);
    } else {
      this.selectedAvailable.push(item);
    }
    // Ensure only unique values
    this.selectedAvailable = [...new Set(this.selectedAvailable)];
  }

  toggleSelectSelected(item: string) {
    const idx = this.selectedSelected.indexOf(item);
    if (idx > -1) {
      this.selectedSelected.splice(idx, 1);
    } else {
      this.selectedSelected.push(item);
    }
    this.selectedSelected = [...new Set(this.selectedSelected)];
  }
}
