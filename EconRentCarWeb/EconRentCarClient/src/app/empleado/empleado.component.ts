import { Component, OnInit } from '@angular/core';
import { DynamicTableModel, Definition } from '../shared/dynamic-crud/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Empleado } from '../shared/models/empleado';
import { EmpleadoFormService } from '../shared/form-services/empleado-form.service';
import { EmpleadoService } from '../shared/services/empleado.service';

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
        definition: { 'Id': 'Identificador', 'TieneRayaduras': 'Tiene Rayaduras', 'GalonesCombustibles': 'Galones Combustibles',
        'TieneGomaRepuesta': 'Tiene Goma Repuesta', 'TieneGato': 'Tiene Gato' } as Definition,
        actionDefinitionKey: 'Actions',
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
        return this.service.Post(data);
      },
      Edit: (data: Empleado): Observable<Empleado> => {
        return this.service.Put(data.Id, data).pipe(map(r => data));
      },
      Delete: (data: Empleado): Observable<Empleado> => {
        return this.service.Delete(data.Id).pipe(map(r => data));
      }
    };
  }

}
