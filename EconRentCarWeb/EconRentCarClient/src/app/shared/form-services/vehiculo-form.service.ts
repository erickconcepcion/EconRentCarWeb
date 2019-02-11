import { Injectable } from '@angular/core';
import { DynamicSelectModel, DynamicInputModel, DynamicDatePickerModel, DynamicFormGroupModel } from '@ng-dynamic-forms/core';
import { of } from 'rxjs';
import { Vehiculo } from '../models/vehiculo';
import { FormService } from '../dynamic-crud/models';
import { EstadoVehiculo } from '../models/enums';
import { changeEnum } from '../dynamic-crud/utils';

@Injectable({
  providedIn: 'root'
})
export class VehiculoFormService implements FormService<Vehiculo> {

  constructor() { }
  public GetAddForm() {
    return of([
      new DynamicFormGroupModel(
        {
          id: 'data',
          group: [
            new DynamicInputModel(
              {
                id: 'Placa',
                placeholder: 'Placa',
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
                id: 'NoChasis',
                placeholder: 'No. Chasis',
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
                id: 'NoMotor',
                placeholder: 'NoMotor',
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
                id: 'EstadoVehiculo',
                options: changeEnum(EstadoVehiculo) as any,
                placeholder: 'Estado del Vehiculo'
              }
            ),
            new DynamicSelectModel<string>(
              {
                id: 'ModeloId',
                placeholder: 'Modelo'
              }
            ),
            new DynamicSelectModel<string>(
              {
                id: 'TipoVehiculoId',
                placeholder: 'TipoVehiculo'
              }
            ),
            new DynamicSelectModel<string>(
              {
                id: 'TipoCombustibleId',
                placeholder: 'Tipo de Combustible'
              }
            ),
          ]
        }
      )
    ]);
  }
  public GetModifyForm(data: Vehiculo) {
    return of([
      new DynamicFormGroupModel(
        {
          id: 'data',
          group: [
            new DynamicInputModel(
              {
                id: 'Placa',
                value: data.Placa,
                placeholder: 'Placa',
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
                id: 'NoChasis',
                value: data.NoChasis,
                placeholder: 'No. Chasis',
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
                id: 'NoMotor',
                value: data.NoMotor,
                placeholder: 'NoMotor',
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
                id: 'EstadoVehiculo',
                value: data.EstadoVehiculo,
                options: changeEnum(EstadoVehiculo) as any,
                placeholder: 'Estado del Vehiculo'
              }
            ),
            new DynamicSelectModel<string>(
              {
                id: 'ModeloId',
                value: data.ModeloId,
                placeholder: 'Modelo'
              }
            ),
            new DynamicSelectModel<string>(
              {
                id: 'TipoVehiculoId',
                value: data.TipoVehiculoId,
                placeholder: 'TipoVehiculo'
              }
            ),
            new DynamicSelectModel<string>(
              {
                id: 'TipoCombustibleId',
                value: data.TipoCombustibleId,
                placeholder: 'Tipo de Combustible'
              }
            ),
          ]
        }
      )
    ]);
  }
}
