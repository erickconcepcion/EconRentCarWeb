/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DynamicTableComponent } from './dynamic-table.component';
import { BaseData } from '../models';

describe('DynamicTableComponent', () => {
  let component: DynamicTableComponent<BaseData>;
  let fixture: ComponentFixture<DynamicTableComponent<BaseData>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
