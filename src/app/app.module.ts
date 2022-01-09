import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';

import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/header/header.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticleComponent } from './components/article/article.component';
import { PopularTagsListComponent } from './components/popular-tags-list/popular-tags-list.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { ArticlesService } from "./services/articles.service";
import { UserAccountComponent } from './components/user-account/user-account.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticlesListComponent,
    ArticleComponent,
    PopularTagsListComponent,
    UserAccountComponent,
    CreateArticleComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    DragDropModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    LoadingBarModule,
    LoadingBarHttpClientModule
  ],
  providers: [ArticlesService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
