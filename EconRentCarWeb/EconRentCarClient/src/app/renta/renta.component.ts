import { Component, OnInit } from '@angular/core';
import { DynamicTableModel, Definition } from '../shared/dynamic-crud/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RentaFormService } from '../shared/form-services/renta-form.service';
import { Renta } from '../shared/models/renta';
import { RentaService } from '../shared/services/renta.service';

@Component({
  selector: 'app-renta',
  templateUrl: './renta.component.html',
  styleUrls: ['./renta.component.scss']
})
export class RentaComponent implements OnInit {

  constructor(public formService: RentaFormService, public service: RentaService) { }
  private title = 'Tipos de Vehiculos';
  public model: DynamicTableModel<Renta>;
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
      InitValue: new Renta(),
      LoadAll: (): Observable<Renta[]> => {
        return this.service.GetAll();
      },
      Load: (data: Renta): Observable<Renta> => {
        return this.service.Get(data.Id);
      },
      Add: (data: Renta): Observable<Renta> => {
        return this.service.Post(data);
      },
      Edit: (data: Renta): Observable<Renta> => {
        return this.service.Put(data.Id, data).pipe(map(r => data));
      },
      Delete: (data: Renta): Observable<Renta> => {
        return this.service.Delete(data.Id).pipe(map(r => data));
      }
    };
  }

}
