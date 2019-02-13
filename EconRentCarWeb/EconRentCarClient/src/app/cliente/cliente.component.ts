import { Component, OnInit } from '@angular/core';
import { DynamicTableModel, Definition } from '../shared/dynamic-crud/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from '../shared/models/cliente';
import { ClienteService } from '../shared/services/cliente.service';
import { ClienteFormService } from '../shared/form-services/cliente-form.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  constructor(public formService: ClienteFormService, public service: ClienteService) { }
  private title = 'Clientes';
  public model: DynamicTableModel<Cliente>;
  ngOnInit() {
    this.model = {
      InterfaceConfig: {
        EditTitle: 'Editar Cliente',
        AddTitle: 'Agregar Cliente',
        ActionText: 'Acciones',
        definition: { 'Id': 'Identificador', 'Nombres': 'Nombres', 'Apellidos': 'Apellidos', 'CedulaCliente': 'Cedula Cliente',
      'NoTArjetaCredito': 'No. Tarjeta Credito' } as Definition,
        actionDefinitionKey: 'Actions',
      },
      FormService: this.formService,
      InitValue: new Cliente(),
      LoadAll: (): Observable<Cliente[]> => {
        return this.service.GetAll();
      },
      Load: (data: Cliente): Observable<Cliente> => {
        return this.service.Get(data.Id);
      },
      Add: (data: Cliente): Observable<Cliente> => {
        return this.service.Post(data);
      },
      Edit: (data: Cliente): Observable<Cliente> => {
        return this.service.Put(data.Id, data).pipe(map(r => data));
      },
      Delete: (data: Cliente): Observable<Cliente> => {
        return this.service.Delete(data.Id).pipe(map(r => data));
      }
    };
  }

}
