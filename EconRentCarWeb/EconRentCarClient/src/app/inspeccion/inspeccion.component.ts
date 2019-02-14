import { Component, OnInit } from '@angular/core';
import { DynamicTableModel, Definition } from '../shared/dynamic-crud/models';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
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
  private title = 'Inspecciones';
  public model: DynamicTableModel<Inspeccion>;
  ngOnInit() {
    this.model = {
      InterfaceConfig: {
        EditTitle: 'Editar Inspeccion',
        AddTitle: 'Agregar Inspeccion',
        ActionText: 'Acciones',
        CanView: false,
        definition: { 'Id': 'Identificador', 'TieneRayaduras': 'Tiene Rayaduras', 'GalonesCombustibles': 'Galones Combustibles',
        'TieneGomaRepuesta': 'Tiene Goma Repuesta', 'TieneGato': 'Tiene Gato' } as Definition,
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
        return this.service.Post(data).pipe(concatMap(r => this.service.Get(r.Id)));
      },
      Edit: (data: Inspeccion): Observable<Inspeccion> => {
        return this.service.Put(data.Id, data).pipe(concatMap(r => this.service.Get(data.Id)));
      },
      Delete: (data: Inspeccion): Observable<Inspeccion> => {
        return this.service.Delete(data.Id).pipe(map(r => data));
      }
    };
  }

}
