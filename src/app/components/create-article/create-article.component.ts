import { Component } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatChipInputEvent } from '@angular/material/chips';

import { ArticlesService } from "../../services/articles.service";

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
    author: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
    content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1500)]],
    tagList: [['angular']]
  });
  tagListControl = this.newArticleForm.get('tagList');

  constructor(private fb: FormBuilder, private articlesService: ArticlesService, private router: Router) {}

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

  hasError = (controlName: string, errorName: string) =>{
    return this.newArticleForm.controls[controlName].hasError(errorName);
  }

  onFormSubmit() {
    this.articlesService.addArticle(this.newArticleForm.value);
    this.router.navigate(['home']);
  }
}
