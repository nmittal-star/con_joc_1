import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { TextboxComponent, ButtonComponent, SelectComponent, TextareaComponent } from '@eh-library/common';
import { highlightData } from '../../../shared/logs-config';
import { Editor } from '@tiptap/core';
import {StarterKit} from '@tiptap/starter-kit';
import {Underline} from '@tiptap/extension-underline';
import {Highlight} from '@tiptap/extension-highlight';
import {TextAlign} from '@tiptap/extension-text-align';
import {Link} from '@tiptap/extension-link';
import {TextStyle} from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';

@Component({
  selector: 'app-view-highlighted',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TextboxComponent,
    SelectComponent,
    TextareaComponent,
    DragDropModule,],
  templateUrl: './view-highlighted.html',
  styleUrl: './view-highlighted.scss',
})
export class ViewHighlighted implements AfterViewInit, OnDestroy {

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      active: [''],
      text: [''],
      link: ['']
    });
  }

  @Input() heading: string = 'Highlighted Feature';
  form: FormGroup;
  fields = highlightData;

  @ViewChild('editorContainer') editorContainer!: ElementRef;
  editor!: Editor;

  ngAfterViewInit(): void {
    this.editor = new Editor({
      element: this.editorContainer.nativeElement,
      extensions: [
        StarterKit,
        Underline,
        Highlight.configure({ multicolor: true }),
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Link.configure({ openOnClick: false }),
        TextStyle,
        Color,
        Image.configure({ inline: false, allowBase64: true }),
        Youtube.configure({ width: 640, height: 360 }),
      ],
      content: '',
      editorProps: {
        attributes: {
          class: 'tiptap-editor',
        },
      },
    });

    this.editor.on('update', () => {
      this.form.get('text')?.setValue(this.editor.getHTML(), { emitEvent: false });
    });
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  isActive(format: string | Record<string, any>, options?: Record<string, any>): boolean {
    return this.editor?.isActive(format as any, options) ?? false;
  }

  setLink(): void {
    const url = prompt('Enter URL');
    if (!url) return;
    this.editor.chain().focus().setLink({ href: url }).run();
  }

  insertImageByUrl(): void {
    const url = prompt('Image URL');
    if (!url) return;
    this.editor.chain().focus().setImage({ src: url }).run();
  }

  onImageFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.editor.chain().focus().setImage({ src: reader.result as string }).run();
    };
    reader.readAsDataURL(file);
    input.value = ''; // reset so same file can be re-selected
  }

  insertYoutube(): void {
    const url = prompt('YouTube URL');
    if (!url) return;
    this.editor.chain().focus().setYoutubeVideo({ src: url }).run();
  }
}
