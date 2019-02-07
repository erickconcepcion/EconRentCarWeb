import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AccountsRoutes } from './accounts.routing';
import { ConfigService } from '../shared/utils/config.service';
import { UserService } from '../shared/services/user.service';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicCrudModule } from '../shared/dynamic-crud/dynamic-crud.module';

@NgModule({
  imports: [
    CommonModule,
    AccountsRoutes,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicCrudModule
  ],
  declarations: [LoginComponent],
  providers: [
    ConfigService,
    UserService,
  ]
})
export class AccountsModule { }
