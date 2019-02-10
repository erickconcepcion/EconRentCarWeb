import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DynamicCrudModule } from './shared/dynamic-crud/dynamic-crud.module';
import { MaterialModule } from './shared/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthBackendService } from './shared/services/auth-backend.service';
import { ErrorInterceptorService } from './shared/services/error-interceptor.service';
import { InternalComponent } from './internal/internal.component';
import { ExternalComponent } from './external/external.component';
import { HomeComponent } from './home/home.component';
import { ShowTableComponent } from './show-table/show-table.component';
import { ClienteComponent } from './cliente/cliente.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { InspeccionComponent } from './inspeccion/inspeccion.component';
import { MarcaComponent } from './marca/marca.component';
import { ModeloComponent } from './modelo/modelo.component';
import { RentaComponent } from './renta/renta.component';
import { TipoCombustibleComponent } from './tipo-combustible/tipo-combustible.component';
import { TipoVehiculoComponent } from './tipo-vehiculo/tipo-vehiculo.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';

@NgModule({
   declarations: [
      AppComponent,
      NavBarComponent,
      InternalComponent,
      ExternalComponent,
      HomeComponent,
      ShowTableComponent,
      ClienteComponent,
      EmpleadoComponent,
      InspeccionComponent,
      MarcaComponent,
      ModeloComponent,
      RentaComponent,
      TipoCombustibleComponent,
      TipoVehiculoComponent,
      VehiculoComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      LayoutModule,
      MaterialModule,
      DynamicCrudModule,
      HttpClientModule
   ],
   bootstrap: [
      AppComponent
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthBackendService, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
   ]
})
export class AppModule { }
