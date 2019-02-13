import { Component, OnInit } from '@angular/core';
import { DynamicTableModel, Definition } from '../shared/dynamic-crud/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Marca } from '../shared/models/marca';
import { MarcaFormService } from '../shared/form-services/marca-form.service';
import { MarcaService } from '../shared/services/marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent implements OnInit {

  constructor(public formService: MarcaFormService, public service: MarcaService) { }
  private title = 'Marcas';
  public model: DynamicTableModel<Marca>;
  ngOnInit() {
    this.model = {
      InterfaceConfig: {
        EditTitle: 'Editar Marca',
        AddTitle: 'Agregar Marca',
        ActionText: 'Acciones',
        CanView: false,
        definition: { 'Id': 'Identificador', 'Nombre': 'Nombre', 'Descripcion': 'Descripcion', 'Activo': 'Activo' } as Definition,
        actionDefinitionKey: 'Actions',
      },
      FormService: this.formService,
      InitValue: new Marca(),
      LoadAll: (): Observable<Marca[]> => {
        return this.service.GetAll();
      },
      Load: (data: Marca): Observable<Marca> => {
        return this.service.Get(data.Id);
      },
      Add: (data: Marca): Observable<Marca> => {
        return this.service.Post(data);
      },
      Edit: (data: Marca): Observable<Marca> => {
        return this.service.Put(data.Id, data).pipe(map(r => data));
      },
      Delete: (data: Marca): Observable<Marca> => {
        return this.service.Delete(data.Id).pipe(map(r => data));
      }
    };
  }

}
