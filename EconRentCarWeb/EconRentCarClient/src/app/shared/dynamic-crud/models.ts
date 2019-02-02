import { DynamicFormService, DynamicFormControlModel } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

export interface FormService<T> {
    OnMatEvent?: (event: any, models: Observable<DynamicFormControlModel[]>) => void;
    GetAddForm(): Observable<DynamicFormControlModel[]>;
    GetModifyForm(data: T): Observable<DynamicFormControlModel[]>;
}

export interface BaseSecureHttpService<T> {
    GetAll(): Observable<T[]>;
    Get(data: T): Observable<T>;
    Post(data: T): Observable<T>;
    Put(data: T): Observable<number>;
    Delete(data: T): Observable<number>;
}

export interface BaseData {
    Id: string;
}
export interface Definition {
    [key: string]: string;
}
export interface MetaLabels {
    [key: string]: string[];
}
export interface InterfaceConfig {
    EditTitle: string;
    AddTitle: string;
    ActionText: string;
    definition: Definition;
    actionDefinitionKey: string;
    DialogWidth?: string;
    CanEdit?: boolean;
    CanAdd?: boolean;
    CanRemove?: boolean;
    CanView?: boolean;
    CanFilter?: boolean;
    MetaLabels?: MetaLabels;
}
export interface DynamicTableModel<T> {
    InterfaceConfig: InterfaceConfig;
    FormService: FormService<T>;
    LoadAll: () => Observable<T[]>;
    Load: (data: T) => Observable<T>;
    Add: (data: T) => Observable<T>;
    Edit: (data: T) => Observable<T>;
    Delete: (data: T) => Observable<T>;
    InitValue: T;
    DetailLink?: string;
    DetailSearch?: Observable<string>;
}

export interface DialogModel<T> {
    title: string;
    formModel: DynamicFormControlModel[];
    formGroup: FormGroup;
    index: number;
    ContextFormService: FormService<T>;
}

export interface DialogModelData<T> {
    dialogModel: DialogModel<T>;
    data: T;
}

export interface MessageDialogParams {
    Caption: string;
    Title: string;
    DialogType: DialogType;
    DialogButton: DialogButton;
    Message?: string;
    Icon?: string;
}

export enum MessageDialogResult {
    Ok = 1,
    Cancel,
    Yes,
    No,
}

export enum DialogButton {
    Ok = 1,
    OkCancel,
    YesNo
}
export enum DialogType {
    Info,
    Warning,
    Error
}

export interface ErrorMessage {
    Title: string;
    ValidationErrors: string;
}
