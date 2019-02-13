import { Injectable } from '@angular/core';
import { FormService } from '../dynamic-crud/models';
import { Inspeccion } from '../models/inspeccion';
import { DynamicFormGroupModel, DynamicInputModel, DynamicCheckboxModel, DynamicSelectModel } from '@ng-dynamic-forms/core';
import { of } from 'rxjs';
import { RentaService } from '../services/renta.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InspeccionFormService implements FormService<Inspeccion> {

  constructor(private rentaS: RentaService) { }
  public GetAddForm() {
    return of([
      new DynamicFormGroupModel(
        {
          id: 'data',
          group: [
            new DynamicSelectModel<string>(
              {
                id: 'RentaId',
                placeholder: 'Renta',
                options: this.rentaS.GetAll().pipe(map(d => d.map( da =>
                  ({label: `${da.Cliente.Nombres} - ${da.Vehiculo.Placa}`, value: da.Id}) ) )),
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
                id: 'TieneRayaduras',
                label: 'Tiene Rayaduras?',
              }
            ),
            new DynamicInputModel(
              {
                id: 'GalonesCombustibles',
                inputType: 'number',
                placeholder: 'Galones de Combustibles',
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
                id: 'TieneGomaRepuesta',
                label: 'Tiene Goma Repuesta?',
              }
            ),
            new DynamicCheckboxModel(
              {
                id: 'TieneGato',
                label: 'Tiene Gato?',
              }
            ),
            new DynamicCheckboxModel(
              {
                id: 'CristalRoto',
                label: 'Cristal Roto?',
              }
            ),
            new DynamicCheckboxModel(
              {
                id: 'GomasDaniadas',
                label: 'Gomas Dañadas?',
              }
            ),
            new DynamicInputModel(
              {
                id: 'CargosExtra',
                inputType: 'number',
                placeholder: 'Cargos Extra',
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            )
          ]
        }
      )
    ]);
  }
  public GetModifyForm(data: Inspeccion) {
    return of([
      new DynamicFormGroupModel(
        {
          id: 'data',
          group: [
            new DynamicSelectModel<string>(
              {
                id: 'RentaId',
                value: data.RentaId,
                placeholder: 'Renta',
                options: this.rentaS.GetAll().pipe(map(d => d.map( da =>
                  ({label: `${da.Cliente.Nombres} - ${da.Vehiculo.Placa}`, value: da.Id}) ) )),
              }
            ),
            new DynamicCheckboxModel(
              {
                id: 'TieneRayaduras',
                value: data.TieneRayaduras,
                label: 'Tiene Rayaduras?',
              }
            ),
            new DynamicInputModel(
              {
                id: 'GalonesCombustibles',
                value: data.GalonesCombustibles,
                inputType: 'number',
                placeholder: 'Galones de Combustibles',
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
                id: 'TieneGomaRepuesta',
                value: data.TieneGomaRepuesta,
                label: 'Tiene Goma Repuesta?',
              }
            ),
            new DynamicCheckboxModel(
              {
                id: 'TieneGato',
                value: data.TieneGato,
                label: 'Tiene Gato?',
              }
            ),
            new DynamicCheckboxModel(
              {
                id: 'CristalRoto',
                value: data.CristalRoto,
                label: 'Cristal Roto?',
              }
            ),
            new DynamicCheckboxModel(
              {
                id: 'GomasDaniadas',
                value: data.GomasDaniadas,
                label: 'Gomas Dañadas?',
              }
            ),
            new DynamicInputModel(
              {
                id: 'CargosExtra',
                value: data.CargosExtra,
                inputType: 'number',
                placeholder: 'Cargos Extra',
                validators: {
                  required: null
                },
                errorMessages: {
                  required: 'Este campo es requerido'
                }
              }
            )
          ]
        }
      )
    ]);
  }
}
