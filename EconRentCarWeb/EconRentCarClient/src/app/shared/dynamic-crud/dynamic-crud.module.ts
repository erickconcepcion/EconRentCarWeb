import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogComponent } from './dynamic-dialog/dynamic-dialog.component';
import { DynamicTableComponent} from './dynamic-table/dynamic-table.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { MessageBoxService } from './message-dialog/MessageBox.service';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    DynamicFormsMaterialUIModule
  ],
  entryComponents: [DynamicDialogComponent,
    MessageDialogComponent],
  exports: [DynamicTableComponent],
  declarations: [
    DynamicDialogComponent,
    DynamicTableComponent,
    MessageDialogComponent ],
  providers: [MessageBoxService]
})
export class DynamicCrudModule { }
