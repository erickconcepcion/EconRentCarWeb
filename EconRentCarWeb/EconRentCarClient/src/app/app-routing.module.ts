import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternalComponent } from './internal/internal.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { ExternalComponent } from './external/external.component';
import { TipoCombustibleComponent } from './tipo-combustible/tipo-combustible.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: InternalComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'tipocombustibles',
        component: TipoCombustibleComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: '',
    component: ExternalComponent,
    children: [
      {
        path: 'accounts',
        loadChildren: './accounts/accounts.module#AccountsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
