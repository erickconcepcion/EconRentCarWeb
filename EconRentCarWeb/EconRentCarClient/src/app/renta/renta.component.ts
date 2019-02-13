import { Component, OnInit } from '@angular/core';
import { DynamicTableModel, Definition } from '../shared/dynamic-crud/models';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
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
  private title = 'Rentas';
  public model: DynamicTableModel<Renta>;
  ngOnInit() {
    this.model = {
      InterfaceConfig: {
        EditTitle: 'Editar Renta',
        AddTitle: 'Agregar Renta',
        ActionText: 'Acciones',
        CanView: false,
        definition: { 'Id': 'Identificador', 'FechaRenta': 'Fecha Renta', 'FechaDevolucion': 'Fecha Devolucion',
        'Comentario': 'Comentario', 'EstadoRenta': 'Estado Renta' } as Definition,
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
        return this.service.Post(data).pipe(concatMap(r => this.service.Get(data.Id)));
      },
      Edit: (data: Renta): Observable<Renta> => {
        return this.service.Put(data.Id, data).pipe(concatMap(r => this.service.Get(data.Id)));
      },
      Delete: (data: Renta): Observable<Renta> => {
        return this.service.Delete(data.Id).pipe(map(r => data));
      }
    };
  }

}
