import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdentityGuard } from "./guards/identity.guard";
import { AuthGuard } from "./guards/auth.guard";
import { UserAccountComponent } from "./components/user-account/user-account.component";
import { CreateArticleComponent } from "./components/create-article/create-article.component";
import { HomeComponent } from "./components/home/home.component";
import { SigninComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [IdentityGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'sign-in', component: SigninComponent },
      { path: 'sign-up', component: SignupComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'new-article', component: CreateArticleComponent, canActivate: [AuthGuard] },
      { path: 'user-account', component: UserAccountComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
