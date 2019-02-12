import { Component, OnInit } from '@angular/core';
import { TipoCombustibleFormService } from '../shared/form-services/tipo-combustible-form.service';
import { DynamicTableModel, Definition } from '../shared/dynamic-crud/models';
import { TipoCombustible } from '../shared/models/tipo-combustible';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoCombustibleService } from '../shared/services/tipo-combustible.service';

@Component({
  selector: 'app-tipo-combustible',
  templateUrl: './tipo-combustible.component.html',
  styleUrls: ['./tipo-combustible.component.scss']
})
export class TipoCombustibleComponent implements OnInit {

  constructor(public formService: TipoCombustibleFormService, public service: TipoCombustibleService) { }
  private title = 'Tipos de Combustibles';
  public model: DynamicTableModel<TipoCombustible>;
  ngOnInit() {
    this.model = {
      InterfaceConfig: {
        EditTitle: 'Editar Tipo de Combustible',
        AddTitle: 'Agregar Tipo de Combustible',
        DialogWidth: '400px',
        ActionText: 'Acciones',
        definition: { 'Id': 'Identificador', 'Nombre': 'Nombre', 'Activo': 'Activo' } as Definition,
        actionDefinitionKey: 'Actions',
      },
      FormService: this.formService,
      InitValue: new TipoCombustible(),
      LoadAll: (): Observable<TipoCombustible[]> => {
        return this.service.GetAll();
      },
      Load: (data: TipoCombustible): Observable<TipoCombustible> => {
        return this.service.Get(data.Id);
      },
      Add: (data: TipoCombustible): Observable<TipoCombustible> => {
        return this.service.Post(data);
      },
      Edit: (data: TipoCombustible): Observable<TipoCombustible> => {
        return this.service.Put(data.Id, data).pipe(map(r => data));
      },
      Delete: (data: TipoCombustible): Observable<TipoCombustible> => {
        return this.service.Delete(data.Id).pipe(map(r => data));
      }
    };
  }

}
