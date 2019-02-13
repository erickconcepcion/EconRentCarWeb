import { Component, OnInit } from '@angular/core';
import { TipoVehiculoFormService } from '../shared/form-services/tipo-vehiculo-form.service';
import { TipoVehiculoService } from '../shared/services/tipo-vehiculo.service';
import { DynamicTableModel, Definition } from '../shared/dynamic-crud/models';
import { TipoVehiculo } from '../shared/models/tipo-vehiculo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tipo-vehiculo',
  templateUrl: './tipo-vehiculo.component.html',
  styleUrls: ['./tipo-vehiculo.component.scss']
})
export class TipoVehiculoComponent implements OnInit {

  constructor(public formService: TipoVehiculoFormService, public service: TipoVehiculoService) { }
  private title = 'Tipos de Vehiculos';
  public model: DynamicTableModel<TipoVehiculo>;
  ngOnInit() {
    this.model = {
      InterfaceConfig: {
        EditTitle: 'Editar Tipo de Vehiculo',
        AddTitle: 'Agregar Tipo de Vehiculo',
        ActionText: 'Acciones',
        definition: { 'Id': 'Identificador', 'Nombre': 'Nombre', 'Descripcion': 'Descripcion', 'Activo': 'Activo' } as Definition,
        actionDefinitionKey: 'Actions',
      },
      FormService: this.formService,
      InitValue: new TipoVehiculo(),
      LoadAll: (): Observable<TipoVehiculo[]> => {
        return this.service.GetAll();
      },
      Load: (data: TipoVehiculo): Observable<TipoVehiculo> => {
        return this.service.Get(data.Id);
      },
      Add: (data: TipoVehiculo): Observable<TipoVehiculo> => {
        return this.service.Post(data);
      },
      Edit: (data: TipoVehiculo): Observable<TipoVehiculo> => {
        return this.service.Put(data.Id, data).pipe(map(r => data));
      },
      Delete: (data: TipoVehiculo): Observable<TipoVehiculo> => {
        return this.service.Delete(data.Id).pipe(map(r => data));
      }
    };
  }

}
