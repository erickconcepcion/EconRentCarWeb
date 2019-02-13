import { Component, ViewChild, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { Definition, FormService, DynamicTableModel, BaseData, DialogModel, DialogModelData,
  DialogButton, MessageDialogResult, ErrorMessage } from '../models';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from '@ng-dynamic-forms/core';
import { isNullOrUndefined } from 'util';
import { Observable, of } from 'rxjs';
import { map, filter, concatMap, isEmpty } from 'rxjs/operators';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MessageBoxService } from '../message-dialog/MessageBox.service';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent<T extends BaseData> implements OnInit {

  @Input()
  TableModel: DynamicTableModel<T>;

  @Output()
  ViewEvent: EventEmitter<T> = new EventEmitter<T>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[];
  public keys: string[];
  public ds: T[];
  public actionDefinition: Definition;
  public dataSource: MatTableDataSource<T>;
  public formService: FormService<T>;
  public inTrafic = false;
  public filter: string;
  public canEdit = true;
  public canAdd = true;
  public canRemove = true;
  public canView = true;
  public canFilter = true;

  constructor(public dialog: MatDialog,
    public snackBar: MatSnackBar, public messageBox: MessageBoxService) { }

  ngOnInit() {
    this.configControls();
    this.inTrafic = true;
    this.TableModel.LoadAll().subscribe((data) => {
      this.ds = data;
      this.configureColumn();
      this.dataSource = new MatTableDataSource(this.ds);
      this.formService = this.TableModel.FormService;
      this.configurePaginator();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.inTrafic = false;
    }, (error) => {
      const errors = error as ErrorMessage;
      this.inTrafic = false;
      this.messageBox.Error(errors.Title, errors.ValidationErrors);
    });
  }

  private configurePaginator(): void {
    this.paginator._intl.itemsPerPageLabel = 'Filas por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `Del ${startIndex + 1} al ${endIndex} de ${length}`;
    };
  }

  private configureColumn() {
    this.actionDefinition = JSON.parse(
      `{"${this.TableModel.InterfaceConfig.actionDefinitionKey}": "${this.TableModel.InterfaceConfig.ActionText}"}`
    );
    this.keys = Object.keys(this.TableModel.InterfaceConfig.definition);
    this.displayedColumns = Object.keys(this.TableModel.InterfaceConfig.definition);
    this.displayedColumns.push(Object.keys(this.actionDefinition)[0]);
  }

  private configControls() {
    this.canAdd = this.TableModel.InterfaceConfig.CanAdd !== undefined ? this.TableModel.InterfaceConfig.CanAdd : this.canAdd;
    this.canEdit = this.TableModel.InterfaceConfig.CanEdit !== undefined ? this.TableModel.InterfaceConfig.CanEdit : this.canEdit;
    this.canRemove = this.TableModel.InterfaceConfig.CanRemove !== undefined ? this.TableModel.InterfaceConfig.CanRemove : this.canRemove;
    this.canView = this.TableModel.InterfaceConfig.CanView !== undefined ? this.TableModel.InterfaceConfig.CanView : this.canView;
    this.canFilter = this.TableModel.InterfaceConfig.CanFilter !== undefined ? this.TableModel.InterfaceConfig.CanFilter : this.canFilter;
  }
  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editData(editData: T, editIndex: number) {
    // Must refactor in keys selections
    const elementKeys = Object.keys(editData);
    for (let myKey = 0; myKey < elementKeys.length; myKey++) {
      this.ds[editIndex][elementKeys[myKey]] = editData[elementKeys[myKey]];
    }
  }

  isEmpty(obj: Object) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
    }
    return true;
  }
  addData(dataAdd: T) {
    if (!this.isEmpty(dataAdd)) {
      this.ds.push(dataAdd);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  compareAndAsign(before: T, after: any): T {
    const data = Object.assign({}, before);
    const elementKeys = Object.keys(data);
    for (let myKey = 0; myKey < elementKeys.length; myKey++) {
      if (elementKeys[myKey] in after) {
        data[elementKeys[myKey]] = after[elementKeys[myKey]];
      }
    }
    return data;
  }

  viewData(data: T) {
    this.ViewEvent.emit(data);
  }

  openDialog(dialogModel: DialogModel<T>): Observable<DialogModel<T>> {
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      width: this.TableModel.InterfaceConfig.DialogWidth || '250px',
      data: dialogModel
    });
    return dialogRef.afterClosed()
    .pipe(
      filter(dialogData => ! isNullOrUndefined(dialogData)),
      map(dm => {
        const res = dm as DialogModel<T>;
        if (! res.formGroup.valid) {
          throw res.formGroup.errors;
        }
        return res;
      }),
    );
  }

  openAddDialog(title: string): void {
    const model = this.formService.GetAddForm().pipe(
      map(fm => {
        return {
          title: title,
          formModel: fm,
          ContextFormService: this.formService
        } as DialogModel<T>;
      }),
      concatMap(dm => this.openDialog(dm)),
      concatMap(dm => {
        this.inTrafic = true;
        const init = this.TableModel.InitValue;
        return this.TableModel.Add(this.compareAndAsign(init, dm.formGroup.value.data));
      })
    )
    .subscribe((data) => {
      this.addData(data);
      this.dataSource.filter = '';
      this.inTrafic = false;
      this.openSnackBar('Nuevo registro Agregado', 'Ok');
    }, error => {
      console.log('error displayed');
      const errors = error as ErrorMessage;
      this.inTrafic = false;
      const dialogRef = this.messageBox.Error(errors.Title, errors.ValidationErrors);
    });
  }
  openEditDialog(name: string, formData: T): void {
    const model = this.formService.GetModifyForm(formData).pipe(
      map(fm => {
        return {
          title: name,
          formModel: fm,
          index: this.ds.indexOf(formData),
          ContextFormService: this.formService
        } as DialogModel<T>;
      }),
      concatMap(dm => this.openDialog(dm)),
      concatMap(dm => {
        this.inTrafic = true;
        return this.TableModel.Edit(this.compareAndAsign(formData, dm.formGroup.value.data))
        .pipe(map( d => {
          return {
            dialogModel: dm,
            data: d
          } as DialogModelData<T>;
        }) );
      }),
      concatMap( dmd => this.TableModel.Load(dmd.data).pipe(
        map(d => {
          dmd.data = d;
          return dmd;
        })
      ))
    )
    .subscribe((dmd) => {
      this.editData(dmd.data, dmd.dialogModel.index);
      this.dataSource.filter = '';
      this.inTrafic = false;
      this.openSnackBar('Registro modificado', 'Ok');
    }, error => {
      const errors = error as ErrorMessage;
      this.inTrafic = false;
      // this.messageBox.Error(errors.Title, errors.ValidationErrors);
      console.log(error);
    });
  }

  deleteData(dataDel: T) {
    let index = -1;
    this.messageBox.Question('Record delete', DialogButton.YesNo,
      'This record will be deleted, are you sure?')
      .pipe(
        filter(dr => dr === MessageDialogResult.Yes),
        map(dr => this.ds.indexOf(dataDel)),
        filter(ind => ind > -1),
        concatMap(ind => {
          this.ds.indexOf(dataDel);
          index = ind;
          this.inTrafic = true;
          return this.TableModel.Delete(dataDel);
        })
      ).subscribe(data => {
        this.ds.splice(index, 1);
        this.dataSource.filter = '';
        this.inTrafic = false;
        this.messageBox.Info('Record has been deleted').subscribe();
      }, error => {
        const errors = error as ErrorMessage;
        this.inTrafic = false;
        this.messageBox.Error(errors.Title);
      });
  }

  byLiteral(o: object, s: string) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    const a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
      const k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    if (this.isEnum(o)) {
      o = this.getMetaLabel(o, s);
    }
    return o;
  }

  isEnum(instance: Object): boolean {
    const keys = Object.keys(instance);
    const values = [];
    for (const key of keys) {
      let value = instance[key];

      if (typeof value === 'number') {
        value = value.toString();
      }
      values.push(value);
    }
    for (const key of keys) {
      if (values.indexOf(key) < 0) {
        return false;
      }
    }
    return true;
  }

  getMetaLabel(prop: Object, metaKey: string): Object {
    if (this.TableModel.InterfaceConfig.MetaLabels) {
      prop = isNullOrUndefined(this.TableModel.InterfaceConfig.MetaLabels[metaKey]) ?
        prop : this.TableModel.InterfaceConfig.MetaLabels[metaKey][prop as number];
    }
    return prop;
  }
}
