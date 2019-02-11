import { Injectable } from '@angular/core';
import { FormService } from '../dynamic-crud/models';
import { TipoCombustible } from '../models/tipo-combustible';
import { of } from 'rxjs';
import { DynamicFormGroupModel, DynamicInputModel, DynamicCheckboxModel } from '@ng-dynamic-forms/core';

@Injectable({
  providedIn: 'root'
})
export class TipoCombustibleFormService implements FormService<TipoCombustible> {

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
  public GetModifyForm(data: TipoCombustible) {
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
