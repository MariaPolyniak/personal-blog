import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from "./components/articles-list/articles-list.component";
import { UserAccountComponent } from "./components/user-account/user-account.component";
import { CreateArticleComponent } from "./components/create-article/create-article.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ArticlesListComponent },
  { path: 'new-article', component: CreateArticleComponent },
  { path: 'user-account', component: UserAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
