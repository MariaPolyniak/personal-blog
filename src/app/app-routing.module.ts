import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccountComponent } from "./components/user-account/user-account.component";
import { CreateArticleComponent } from "./components/create-article/create-article.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'new-article', component: CreateArticleComponent },
  { path: 'user-account', component: UserAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
