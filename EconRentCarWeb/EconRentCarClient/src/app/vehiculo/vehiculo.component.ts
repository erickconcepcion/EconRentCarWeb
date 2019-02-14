import { Component, OnInit } from '@angular/core';
import { DynamicTableModel, Definition } from '../shared/dynamic-crud/models';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { VehiculoFormService } from '../shared/form-services/vehiculo-form.service';
import { VehiculoService } from '../shared/services/vehiculo.service';
import { Vehiculo } from '../shared/models/vehiculo';
import { changeEnum, GetLabels } from '../shared/dynamic-crud/utils';
import { EstadoVehiculo } from '../shared/models/enums';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.scss']
})
export class VehiculoComponent implements OnInit {

  constructor(public formService: VehiculoFormService, public service: VehiculoService) { }
  private title = 'Vehiculos';
  public model: DynamicTableModel<Vehiculo>;
  ngOnInit() {
    this.model = {
      InterfaceConfig: {
        EditTitle: 'Editar Vehiculo',
        AddTitle: 'Agregar Vehiculo',
        ActionText: 'Acciones',
        CanView: false,
        definition: { 'Id': 'Identificador', 'Placa': 'Placa', 'Descripcion': 'Descripcion', 'NoMotor': 'No. Motor',
        'EstadoVehiculo': 'Estado Vehiculo' } as Definition,
        actionDefinitionKey: 'Actions',
        MetaLabels: {'EstadoVehiculo': GetLabels(changeEnum(EstadoVehiculo))}
      },
      FormService: this.formService,
      InitValue: new Vehiculo(),
      LoadAll: (): Observable<Vehiculo[]> => {
        return this.service.GetAll();
      },
      Load: (data: Vehiculo): Observable<Vehiculo> => {
        return this.service.Get(data.Id);
      },
      Add: (data: Vehiculo): Observable<Vehiculo> => {
        return this.service.Post(data).pipe(concatMap(r => this.service.Get(r.Id)));
      },
      Edit: (data: Vehiculo): Observable<Vehiculo> => {
        return this.service.Put(data.Id, data).pipe(concatMap(r => this.service.Get(data.Id)));
      },
      Delete: (data: Vehiculo): Observable<Vehiculo> => {
        return this.service.Delete(data.Id).pipe(map(r => data));
      }
    };
  }

}
