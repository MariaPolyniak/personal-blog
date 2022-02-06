import { NgModule } from '@angular/core';

import { CommonModule } from "@angular/common";

import { AppRoutingModule } from '../app-routing.module';

import { SharedModule } from "../shared/shared.module";

import { AuthGuard } from "./auth.guard";
import { IdentityGuard } from "./identity.guard";

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    SignInComponent,
    SignUpComponent
  ],
  providers: [ AuthGuard, IdentityGuard ]
})
export class AuthModule {}
