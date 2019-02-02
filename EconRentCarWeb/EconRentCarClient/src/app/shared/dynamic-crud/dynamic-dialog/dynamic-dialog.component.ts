import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DynamicFormService, DynamicFormModel, DynamicFormControlModel } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { DialogModel } from '../models';
import { Observable, Subscription, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss']
})
export class DynamicDialogComponent<T> implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DynamicDialogComponent<T>>,
    @Inject(MAT_DIALOG_DATA) public data: DialogModel<T>,
    private formService: DynamicFormService) {
  }

  formGroup: FormGroup;
  formModel: DynamicFormControlModel[];
  loaded = false;
  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.data.formModel);
    this.formModel = this.data.formModel;
    this.loaded = true;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  sendData() {
    if (this.formGroup.valid) {
      this.data.formGroup = this.formGroup;
      this.dialogRef.close(this.data);
    }
  }

  onMatEvent($event: any) {
    console.log(`Material ${$event.type} event on: ${$event.model.id}: `, $event);
    if (!isNullOrUndefined(this.data.ContextFormService.OnMatEvent)) {
      this.data.ContextFormService.OnMatEvent($event, of(this.data.formModel));
    }
  }

}
