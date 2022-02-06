import {ErrorHandler, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from "./shared/shared.module";

import { AuthModule } from "./auth/auth.module";
import { ArticleModule } from "./article/article.module";
import { CommentModule } from "./comment/comment.module";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserAccountComponent } from './user-account/user-account.component';

import { HeaderComponent } from './header/header.component';
import { PopularTagsListComponent } from './popular-tags-list/popular-tags-list.component';

import { CustomErrorHandler } from "../utils/error.handler";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PopularTagsListComponent,
    UserAccountComponent,
    HomeComponent,
    HomeComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    AuthModule,
    ArticleModule,
    CommentModule
  ],
  providers: [ { provide: ErrorHandler, useClass: CustomErrorHandler } ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
