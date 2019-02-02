import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MessageDialogResult, MessageDialogParams, DialogButton, DialogType } from '../models';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {
  hasMessage: boolean;
  hasIcon: boolean;
  showOk: boolean;
  showCancel: boolean;
  showYes: boolean;
  showNo: boolean;
  toolbarColor: string;
  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public params: MessageDialogParams
    ) { }

  ngOnInit() {
    this.hasMessage = ! isNullOrUndefined(this.params.Message);
    this.hasIcon = ! isNullOrUndefined(this.params.Icon);
    this.showCancel = this.params.DialogButton === DialogButton.OkCancel;
    this.showOk = this.params.DialogButton === DialogButton.Ok || this.showCancel;
    this.showYes = this.params.DialogButton === DialogButton.YesNo;
    this.showNo = this.showYes;
    this.setToolbarColor();
  }

  setToolbarColor() {
    switch (this.params.DialogType) {
      case DialogType.Info:
        this.toolbarColor = 'primary';
        break;
        case DialogType.Warning:
        this.toolbarColor = 'accent';
        break;
        case DialogType.Error:
        this.toolbarColor = 'warn';
        break;
    }
  }
  onOk() {
    this.dialogRef.close(MessageDialogResult.Ok);
  }
  onCancel() {
    this.dialogRef.close(MessageDialogResult.Cancel);
  }
  onYes() {
    this.dialogRef.close(MessageDialogResult.Yes);
  }
  onNo() {
    this.dialogRef.close(MessageDialogResult.No);
  }

}
