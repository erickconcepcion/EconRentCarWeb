import { Injectable } from '@angular/core';
import { DynamicSelectModel, DynamicInputModel, DynamicDatePickerModel, DynamicFormGroupModel } from '@ng-dynamic-forms/core';
import { of } from 'rxjs';
import { Vehiculo } from '../models/vehiculo';
import { FormService } from '../dynamic-crud/models';
import { EstadoVehiculo } from '../models/enums';
import { changeEnum } from '../dynamic-crud/utils';
import { ModeloService } from '../services/modelo.service';
import { TipoCombustibleService } from '../services/tipo-combustible.service';
import { TipoVehiculoService } from '../services/tipo-vehiculo.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiculoFormService implements FormService<Vehiculo> {

  constructor(private modeloS: ModeloService, private tcombS: TipoCombustibleService, private tvehiculoS: TipoVehiculoService) { }
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
                maxLength: 7,
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
                maxLength: 7,
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
                maxLength: 7,
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
                placeholder: 'Modelo',
                options: this.modeloS.GetAll().pipe(map(d => d.map( da => ({label: da.Nombre, value: da.Id}) ) )),
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
                id: 'TipoVehiculoId',
                placeholder: 'TipoVehiculo',
                options: this.tvehiculoS.GetAll().pipe(map(d => d.map( da => ({label: da.Nombre, value: da.Id}) ) )),
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
                id: 'TipoCombustibleId',
                placeholder: 'Tipo de Combustible',
                options: this.tcombS.GetAll().pipe(map(d => d.map( da => ({label: da.Nombre, value: da.Id}) ) )),
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
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
                maxLength: 7,
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
                maxLength: 7,
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
                maxLength: 7,
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
                placeholder: 'Modelo',
                options: this.modeloS.GetAll().pipe(map(d => d.map( da => ({label: da.Nombre, value: da.Id}) ) )),
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
                id: 'TipoVehiculoId',
                value: data.TipoVehiculoId,
                placeholder: 'TipoVehiculo',
                options: this.tvehiculoS.GetAll().pipe(map(d => d.map( da => ({label: da.Nombre, value: da.Id}) ) )),
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
                id: 'TipoCombustibleId',
                value: data.TipoCombustibleId,
                placeholder: 'Tipo de Combustible',
                options: this.tcombS.GetAll().pipe(map(d => d.map( da => ({label: da.Nombre, value: da.Id}) ) )),
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            ),
          ]
        }
      )
    ]);
  }
}
