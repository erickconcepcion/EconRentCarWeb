import { Injectable } from '@angular/core';
import { Renta } from '../models/renta';
import { FormService } from '../dynamic-crud/models';
import { DynamicFormGroupModel, DynamicSelectModel, DynamicInputModel,
  DynamicCheckboxModel, DynamicDatePickerModel } from '@ng-dynamic-forms/core';
import { of } from 'rxjs';
import { changeEnum } from '../dynamic-crud/utils';
import { EstadoRenta } from '../models/enums';
import { ClienteService } from '../services/cliente.service';
import { VehiculoService } from '../services/vehiculo.service';
import { EmpleadoService } from '../services/empleado.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RentaFormService implements FormService<Renta> {

  constructor(private clienteS: ClienteService, private vehiculoS: VehiculoService, private empleadoS: EmpleadoService) { }
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
                placeholder: 'Vehiculo',
                options: this.vehiculoS.GetAll().pipe(map(d => d.map( da => ({label: da.Placa, value: da.Id}) ) )),
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
                id: 'EmpleadoId',
                placeholder: 'Empleado',
                options: this.empleadoS.GetAll().pipe(map(d => d.map( da => ({label: da.CedulaEmpleado, value: da.Id}) ) )),
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
                id: 'ClienteId',
                placeholder: 'Cliente',
                options: this.clienteS.GetAll().pipe(map(d => d.map( da => ({label: da.CedulaCliente, value: da.Id}) ) )),
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
                placeholder: 'Vehiculo',
                options: this.vehiculoS.GetAll().pipe(map(d => d.map( da => ({label: da.Placa, value: da.Id}) ) )),
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
                id: 'EmpleadoId',
                value: data.EmpleadoId,
                placeholder: 'Empleado',
                options: this.empleadoS.GetAll().pipe(map(d => d.map( da => ({label: da.CedulaEmpleado, value: da.Id}) ) )),
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
                id: 'ClienteId',
                value: data.ClienteId,
                placeholder: 'Cliente',
                options: this.clienteS.GetAll().pipe(map(d => d.map( da => ({label: da.CedulaCliente, value: da.Id}) ) )),
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
