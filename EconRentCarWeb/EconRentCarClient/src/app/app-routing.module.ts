import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternalComponent } from './internal/internal.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { ExternalComponent } from './external/external.component';
import { TipoCombustibleComponent } from './tipo-combustible/tipo-combustible.component';
import { ClienteComponent } from './cliente/cliente.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { InspeccionComponent } from './inspeccion/inspeccion.component';
import { MarcaComponent } from './marca/marca.component';
import { ModeloComponent } from './modelo/modelo.component';
import { RentaComponent } from './renta/renta.component';
import { TipoVehiculoComponent } from './tipo-vehiculo/tipo-vehiculo.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';

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
      },
      {
        path: 'clientes',
        component: ClienteComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'empleados',
        component: EmpleadoComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'inspecciones',
        component: InspeccionComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'marcas',
        component: MarcaComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'modelos',
        component: ModeloComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'rentas',
        component: RentaComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'tipovehiculos',
        component: TipoVehiculoComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'vehiculos',
        component: VehiculoComponent,
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
