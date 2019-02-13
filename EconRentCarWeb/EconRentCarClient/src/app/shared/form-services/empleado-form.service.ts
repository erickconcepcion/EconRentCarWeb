import { Injectable } from '@angular/core';
import { FormService } from '../dynamic-crud/models';
import { of } from 'rxjs';
import { DynamicFormGroupModel, DynamicInputModel,
  DynamicSelectModel, DynamicCheckboxModel, DynamicDatePickerModel } from '@ng-dynamic-forms/core';
import { Empleado } from '../models/empleado';
import { changeEnum } from '../dynamic-crud/utils';
import { TandaLaboral } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoFormService  implements FormService<Empleado> {

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
                id: 'CedulaEmpleado',
                placeholder: 'Cedula del Empleado',
                mask: [ /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/ ],
                maxLength: 13,
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
                id: 'TandaLaboral',
                placeholder: 'Tanda Laboral',
                options: changeEnum(TandaLaboral) as any
              }
            ),
            new DynamicInputModel(
              {
                id: 'PorcentajeComision',
                inputType: 'number',
                placeholder: 'Porcentaje de Comision',
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            ),
            new DynamicDatePickerModel(
              {
                id: 'FechaIngreso',
                placeholder: 'Fecha Ingreso',
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
  public GetModifyForm(data: Empleado) {
    return of([
      new DynamicFormGroupModel(
        {
          id: 'data',
          group: [
            new DynamicInputModel(
              {
                id: 'Nombres',
                placeholder: 'Nombres',
                value: data.Nombres,
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
                id: 'CedulaEmpleado',
                value: data.CedulaEmpleado,
                placeholder: 'Cedula del Empleado',
                mask: [ /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/ ],
                maxLength: 13,
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
                id: 'TandaLaboral',
                value: data.TandaLaboral,
                placeholder: 'Tanda Laboral',
                options: changeEnum(TandaLaboral) as any
              }
            ),
            new DynamicInputModel(
              {
                id: 'PorcentajeComision',
                value: data.PorcentajeComision,
                inputType: 'number',
                placeholder: 'Porcentaje de Comision',
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            ),
            new DynamicDatePickerModel(
              {
                id: 'FechaIngreso',
                value: data.FechaIngreso,
                placeholder: 'Fecha Ingreso',
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
}
