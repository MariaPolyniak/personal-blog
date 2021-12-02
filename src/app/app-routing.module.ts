import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from "./components/articles-list/articles-list.component";
import { UserAccountComponent } from "./components/user-account/user-account.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ArticlesListComponent },
  { path: 'new-article', component: ArticlesListComponent },
  { path: 'user-account', component: UserAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
