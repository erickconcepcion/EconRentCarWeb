import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { FormService } from '../dynamic-crud/models';
import { DynamicFormGroupModel, DynamicInputModel, DynamicSelectModel, DynamicCheckboxModel } from '@ng-dynamic-forms/core';
import { of } from 'rxjs';
import { changeEnum } from '../dynamic-crud/utils';
import { TipoPersona } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class ClienteFormService implements FormService<Cliente> {

  constructor() { }
  public GetAddForm() {
    return of([
      new DynamicFormGroupModel(
        {
          id: 'data',
          group: [
            new DynamicInputModel(
              {
                id: 'Nombres',
                placeholder: 'Nombres',
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            ),
            new DynamicInputModel(
              {
                id: 'Apellidos',
                placeholder: 'Apellidos',
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            ),
            new DynamicInputModel(
              {
                id: 'CedulaCliente',
                placeholder: 'Cedula del Cliente',
                maxLength: 13,
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            ),
            new DynamicInputModel(
              {
                id: 'NoTArjetaCredito',
                placeholder: 'No. Tarjeta de Credito',
                maxLength: 19,
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            ),
            new DynamicInputModel(
              {
                id: 'LimiteCredito',
                inputType: 'number',
                placeholder: 'Limite de Credito',
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            ),
            new DynamicSelectModel<number>(
              {
                id: 'TipoPersona',
                placeholder: 'Tipo de Persona',
                options: changeEnum(TipoPersona) as any
              }
            ),
            new DynamicCheckboxModel(
              {
                id: 'Activo',
                label: 'Activo'
              }
            )
          ]
        }
      )
    ]);
  }
  public GetModifyForm(data: Cliente) {
    return of([
      new DynamicFormGroupModel(
        {
          id: 'data',
          group: [
            new DynamicInputModel(
              {
                id: 'Nombres',
                value: data.Nombres,
                placeholder: 'Nombres',
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            ),
            new DynamicInputModel(
              {
                id: 'Apellidos',
                value: data.Apellidos,
                placeholder: 'Apellidos',
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            ),
            new DynamicInputModel(
              {
                id: 'CedulaCliente',
                value: data.CedulaCliente,
                maxLength: 13,
                placeholder: 'Cedula del Cliente',
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            ),
            new DynamicInputModel(
              {
                id: 'NoTArjetaCredito',
                value: data.NoTArjetaCredito,
                maxLength: 19,
                placeholder: 'No. Tarjeta de Credito',
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            ),
            new DynamicInputModel(
              {
                id: 'LimiteCredito',
                value: data.LimiteCredito,
                inputType: 'number',
                placeholder: 'Limite de Credito',
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            ),
            new DynamicSelectModel<number>(
              {
                id: 'TipoPersona',
                value: data.TipoPersona,
                placeholder: 'Tipo de Persona',
                options: changeEnum(TipoPersona) as any
              }
            ),
            new DynamicCheckboxModel(
              {
                id: 'Activo',
                value: data.Activo,
                label: 'Activo'
              }
            )
          ]
        }
      )
    ]);
  }
}
