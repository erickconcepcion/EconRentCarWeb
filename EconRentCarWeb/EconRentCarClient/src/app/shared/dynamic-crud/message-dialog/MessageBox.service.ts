import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from './message-dialog.component';
import { DialogButton, DialogType, MessageDialogParams, MessageDialogResult } from '../models';
import { filter, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {

constructor( public dialog: MatDialog ) { }

  public Show(caption: string, title: string, buttons: DialogButton, type: DialogType,
    message: string = null, icon: string = null): Observable<any> {
    const params: MessageDialogParams = {
      Caption: caption,
      Title: title,
      DialogButton: buttons,
      DialogType: type,
      Message: message,
      Icon: icon
    };
    return this.dialog.open(MessageDialogComponent, {
      data: params
    }).afterClosed();
  }

  public Info(title: string, message: string = null, caption: string = 'Info'): Observable<MessageDialogResult> {
    return this.Show(caption, title, DialogButton.Ok, DialogType.Info, message)
    .pipe(filter(d => isNullOrUndefined(d), map(d => d as MessageDialogResult)));
  }

  public Question(title: string, buttons: DialogButton, message: string = null,
  caption: string = 'Question'): Observable<MessageDialogResult> {
    return this.Show(caption, title, buttons, DialogType.Warning, message)
    .pipe(filter(d => !isNullOrUndefined(d), map(d => d as MessageDialogResult)));
  }

  public Error(title: string, message: string = null, caption: string = 'Error'): Observable<MessageDialogResult> {
    return this.Show(caption, title, DialogButton.Ok, DialogType.Error, message)
    .pipe(filter(d => isNullOrUndefined(d), map(d => d as MessageDialogResult)));
  }
}
