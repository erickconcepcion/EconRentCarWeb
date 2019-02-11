import { Injectable } from '@angular/core';
import { Renta } from '../models/renta';
import { FormService } from '../dynamic-crud/models';
import { DynamicFormGroupModel, DynamicSelectModel, DynamicInputModel,
  DynamicCheckboxModel, DynamicDatePickerModel } from '@ng-dynamic-forms/core';
import { of } from 'rxjs';
import { changeEnum } from '../dynamic-crud/utils';
import { EstadoRenta } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class RentaFormService implements FormService<Renta> {

  constructor() { }
  public GetAddForm() {
    return of([
      new DynamicFormGroupModel(
        {
          id: 'data',
          group: [
            new DynamicDatePickerModel(
              {
                id: 'FechaRenta',
                placeholder: 'Fecha de la Renta',
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
                id: 'FechaDevolucion',
                placeholder: 'Fecha de Devolucion',
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
                id: 'Comentario',
                placeholder: 'Comentario',
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
                id: 'EstadoRenta',
                options: changeEnum(EstadoRenta) as any,
                placeholder: 'Estado de la Renta'
              }
            ),
            new DynamicSelectModel<string>(
              {
                id: 'VehiculoId',
                placeholder: 'Vehiculo'
              }
            ),
            new DynamicSelectModel<string>(
              {
                id: 'EmpleadoId',
                placeholder: 'Empleado'
              }
            ),
            new DynamicSelectModel<string>(
              {
                id: 'ClienteId',
                placeholder: 'Cliente'
              }
            ),
          ]
        }
      )
    ]);
  }
  public GetModifyForm(data: Renta) {
    return of([
      new DynamicFormGroupModel(
        {
          id: 'data',
          group: [
            new DynamicDatePickerModel(
              {
                id: 'FechaRenta',
                value: data.FechaRenta,
                placeholder: 'Fecha de la Renta',
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
                id: 'FechaDevolucion',
                value: data.FechaDevolucion,
                placeholder: 'Fecha de Devolucion',
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
                id: 'Comentario',
                value: data.Comentario,
                placeholder: 'Comentario',
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
                id: 'EstadoRenta',
                value: data.EstadoRenta,
                options: changeEnum(EstadoRenta) as any,
                placeholder: 'Estado de la Renta'
              }
            ),
            new DynamicSelectModel<string>(
              {
                id: 'VehiculoId',
                value: data.VehiculoId,
                placeholder: 'Vehiculo'
              }
            ),
            new DynamicSelectModel<string>(
              {
                id: 'EmpleadoId',
                value: data.EmpleadoId,
                placeholder: 'Empleado'
              }
            ),
            new DynamicSelectModel<string>(
              {
                id: 'ClienteId',
                value: data.ClienteId,
                placeholder: 'Cliente'
              }
            ),
          ]
        }
      )
    ]);
  }
}
