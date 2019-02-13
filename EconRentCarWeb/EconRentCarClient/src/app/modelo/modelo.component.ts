import { Component, OnInit } from '@angular/core';
import { DynamicTableModel, Definition } from '../shared/dynamic-crud/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModeloFormService } from '../shared/form-services/modelo-form.service';
import { Modelo } from '../shared/models/modelo';
import { ModeloService } from '../shared/services/modelo.service';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.scss']
})
export class ModeloComponent implements OnInit {

  constructor(public formService: ModeloFormService, public service: ModeloService) { }
  private title = 'Tipos de Vehiculos';
  public model: DynamicTableModel<Modelo>;
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
      InitValue: new Modelo(),
      LoadAll: (): Observable<Modelo[]> => {
        return this.service.GetAll();
      },
      Load: (data: Modelo): Observable<Modelo> => {
        return this.service.Get(data.Id);
      },
      Add: (data: Modelo): Observable<Modelo> => {
        return this.service.Post(data);
      },
      Edit: (data: Modelo): Observable<Modelo> => {
        return this.service.Put(data.Id, data).pipe(map(r => data));
      },
      Delete: (data: Modelo): Observable<Modelo> => {
        return this.service.Delete(data.Id).pipe(map(r => data));
      }
    };
  }

}
