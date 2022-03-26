import { Component } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatChipInputEvent } from '@angular/material/chips';

import { ArticlesService } from "../../services/articles.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent {
  selectable = true;
  removable = true;
  tagCtrl = new FormControl();

  newArticleForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
    content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1500)]],
    tags: [[]]
  });
  tagListControl = this.newArticleForm.get('tags');

  errorMap = {
    title: {
      required: 'Article title is required',
      minlength: 'Article title can not be less than 5 characters long',
      maxlength: 'Article title can not be more than 25 characters long'
    },
    content: {
      required: 'Article content is required',
      minlength: 'Article content can not be less than 10 characters long',
      maxlength: 'Author\'s name can not be more than 15 characters long'
    }
  }

  constructor(
    private fb: FormBuilder,
    private articlesService: ArticlesService,
    private authService: AuthService,
    private router: Router
  ) {}

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tagListControl.setValue([...this.tagListControl.value, value]);
    }

    this.tagCtrl.setValue(null);
  }

  removeTag(tag: string): void {
    this.tagListControl.setValue(this.tagListControl.value.filter(existingTag => existingTag !== tag));
  }

  hasErrors(controlName: string): boolean {
    return !!this.newArticleForm.get(controlName).errors;
  }

  getErrorMessage(controlName: string): string {
    const errorKeys = this.getErrorKeys(controlName);

    if (!errorKeys.length) {
      return;
    }

    return this.errorMap[controlName][errorKeys[0]];
  }

  getErrorKeys(controlName: string): string[] {
    const control = this.newArticleForm.get(controlName);
    const errorKeys = Object.keys(control.errors);

    return errorKeys;
  }

  onFormSubmit() {
    this.articlesService.addArticle(this.newArticleForm.value).subscribe(() => {
      this.router.navigate(['home']);
    });
  }
}
