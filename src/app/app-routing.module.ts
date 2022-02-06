import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdentityGuard } from "./auth/identity.guard";
import { AuthGuard } from "./auth/auth.guard";
import { UserAccountComponent } from "./user-account/user-account.component";
import { CreateArticleComponent } from "./article/create-article/create-article.component";
import { HomeComponent } from "./home/home.component";
import { UpdateArticleComponent } from "./article/update-article/update-article.component";
import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [IdentityGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'new-article', component: CreateArticleComponent, canActivate: [AuthGuard]},
      { path: 'update-article', component: UpdateArticleComponent, canActivate: [AuthGuard] },
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
