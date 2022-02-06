import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";

import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatChipInputEvent } from "@angular/material/chips";

import { ArticleModel, CreateOrUpdateArticleModel } from "../article.model";

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {
  @Input() submitButton;
  @Input() hasCancelButton = true;
  cancelButton = 'Cancel';

  @Output() formSubmitted = new EventEmitter<CreateOrUpdateArticleModel>();

  removable = true;
  tagCtrl = new FormControl();

  addArticleForm = this.fb.group({
    title: [
      this.data.title, [ Validators.required, Validators.minLength(5), Validators.maxLength(25) ]
    ],
    content: [
      this.data.content, [ Validators.required, Validators.minLength(10), Validators.maxLength(1500) ]
    ],
    picture: [ this.data.pictureId || null ],
    tags: [ this.data.tags || [] ]
  });

  tagListControl = this.addArticleForm.get('tags');

  errorMap = {
    title: {
      required: 'Article title is required',
      minlength: 'Article title can not be less than 5 characters long',
      maxlength: 'Article title can not be more than 25 characters long'
    },
    content: {
      required: 'Article content is required',
      minlength: 'Article content can not be less than 10 characters long',
      maxlength: 'Article\'s content can not be more than 1500 characters long'
    }
  }

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ArticleModel
  ) {}

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tagListControl.setValue([ ...this.tagListControl.value, value ]);
    }

    this.tagCtrl.setValue(null);
  }

  removeTag(tag: string): void {
    this.tagListControl.setValue(this.tagListControl.value.filter(existingTag => existingTag !== tag));
  }

  hasErrors(controlName: string): boolean {
    return !!this.addArticleForm.get(controlName).errors;
  }

  getErrorMessage(controlName: string): string {
    const errorKeys = this.getErrorKeys(controlName);

    if (!errorKeys.length) {
      return;
    }

    return this.errorMap[controlName][errorKeys[0]];
  }

  getErrorKeys(controlName: string): string[] {
    const control = this.addArticleForm.get(controlName);
    const errorKeys = Object.keys(control.errors);

    return errorKeys;
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (!fileInput.files.length) {
      return;
    }

    this.addArticleForm.get('picture').setValue(fileInput.files[0]);
  }

  onFileRemoved(inputEl: HTMLInputElement): void {
    inputEl.value = null;

    this.addArticleForm.get('picture').setValue(null);
  }

  onFormSubmit() {
    this.formSubmitted.emit(this.addArticleForm.value);
  }
}
