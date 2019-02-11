import { Injectable } from '@angular/core';
import { DynamicCheckboxModel, DynamicInputModel, DynamicFormGroupModel, DynamicSelectModel } from '@ng-dynamic-forms/core';
import { Modelo } from '../models/modelo';
import { FormService } from '../dynamic-crud/models';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeloFormService implements FormService<Modelo> {

  constructor() { }
  public GetAddForm() {
    return of([
      new DynamicFormGroupModel(
        {
          id: 'data',
          group: [
            new DynamicInputModel(
              {
                id: 'Nombre',
                placeholder: 'Nombre',
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
                id: 'Descripcion',
                placeholder: 'Descripcion',
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
                id: 'MontoPorDia',
                inputType: 'number',
                placeholder: 'Monto Por Dia',
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            ),
            new DynamicCheckboxModel(
              {
                id: 'Activo',
                label: 'Activo'
              }
            ),
            new DynamicSelectModel<string>(
              {
                id: 'MarcaId',
                placeholder: 'Marca'
              }
            ),
          ]
        }
      )
    ]);
  }
  public GetModifyForm(data: Modelo) {
    return of([
      new DynamicFormGroupModel(
        {
          id: 'data',
          group: [
            new DynamicInputModel(
              {
                id: 'Nombre',
                value: data.Nombre,
                placeholder: 'Nombre',
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
                id: 'Descripcion',
                value: data.Descripcion,
                placeholder: 'Descripcion',
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
                id: 'MontoPorDia',
                value: data.MontoPorDia,
                inputType: 'number',
                placeholder: 'Monto Por Dia',
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            ),
            new DynamicSelectModel<string>(
              {
                id: 'MarcaId',
                value: data.MarcaId,
                placeholder: 'Marca'
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
