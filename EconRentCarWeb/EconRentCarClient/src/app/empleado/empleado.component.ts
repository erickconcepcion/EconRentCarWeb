import { Component, OnInit } from '@angular/core';
import { DynamicTableModel, Definition } from '../shared/dynamic-crud/models';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Empleado } from '../shared/models/empleado';
import { EmpleadoFormService } from '../shared/form-services/empleado-form.service';
import { EmpleadoService } from '../shared/services/empleado.service';
import { GetLabels, changeEnum } from '../shared/dynamic-crud/utils';
import { TandaLaboral } from '../shared/models/enums';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {

  constructor(public formService: EmpleadoFormService, public service: EmpleadoService) { }
  private title = 'Empleados';
  public model: DynamicTableModel<Empleado>;
  ngOnInit() {
    this.model = {
      InterfaceConfig: {
        EditTitle: 'Editar Empleado',
        AddTitle: 'Agregar Empleado',
        ActionText: 'Acciones',
        CanView: false,
        definition: { 'Id': 'Identificador', 'Nombres': 'Nombres', 'Apellidos': 'Apellidos', 'CedulaEmpleado': 'Cedula Empleado',
        'TandaLaboral': 'Tanda Laboral' } as Definition,
        actionDefinitionKey: 'Actions',
        MetaLabels: { 'TandaLaboral': GetLabels(changeEnum(TandaLaboral))}
      },
      FormService: this.formService,
      InitValue: new Empleado(),
      LoadAll: (): Observable<Empleado[]> => {
        return this.service.GetAll();
      },
      Load: (data: Empleado): Observable<Empleado> => {
        return this.service.Get(data.Id);
      },
      Add: (data: Empleado): Observable<Empleado> => {
        return this.service.Post(data).pipe(concatMap(r => this.service.Get(data.Id)));
      },
      Edit: (data: Empleado): Observable<Empleado> => {
        return this.service.Put(data.Id, data).pipe(concatMap(r => this.service.Get(data.Id)));
      },
      Delete: (data: Empleado): Observable<Empleado> => {
        return this.service.Delete(data.Id).pipe(map(r => data));
      }
    };
  }

}
