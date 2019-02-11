import { Injectable } from '@angular/core';
import { Marca } from '../models/marca';
import { FormService } from '../dynamic-crud/models';
import { DynamicFormGroupModel, DynamicInputModel, DynamicCheckboxModel } from '@ng-dynamic-forms/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaFormService implements FormService<Marca> {

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
  public GetModifyForm(data: Marca) {
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
