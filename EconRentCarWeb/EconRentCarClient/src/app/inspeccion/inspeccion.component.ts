import { Component, OnInit } from '@angular/core';
import { DynamicTableModel, Definition } from '../shared/dynamic-crud/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inspeccion } from '../shared/models/inspeccion';
import { InspeccionFormService } from '../shared/form-services/inspeccion-form.service';
import { InspeccionService } from '../shared/services/inspeccion.service';

@Component({
  selector: 'app-inspeccion',
  templateUrl: './inspeccion.component.html',
  styleUrls: ['./inspeccion.component.scss']
})
export class InspeccionComponent implements OnInit {

  constructor(public formService: InspeccionFormService, public service: InspeccionService) { }
  private title = 'Tipos de Vehiculos';
  public model: DynamicTableModel<Inspeccion>;
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
      InitValue: new Inspeccion(),
      LoadAll: (): Observable<Inspeccion[]> => {
        return this.service.GetAll();
      },
      Load: (data: Inspeccion): Observable<Inspeccion> => {
        return this.service.Get(data.Id);
      },
      Add: (data: Inspeccion): Observable<Inspeccion> => {
        return this.service.Post(data);
      },
      Edit: (data: Inspeccion): Observable<Inspeccion> => {
        return this.service.Put(data.Id, data).pipe(map(r => data));
      },
      Delete: (data: Inspeccion): Observable<Inspeccion> => {
        return this.service.Delete(data.Id).pipe(map(r => data));
      }
    };
  }

}
