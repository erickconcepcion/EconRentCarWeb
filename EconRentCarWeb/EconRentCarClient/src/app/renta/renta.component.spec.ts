/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RentaComponent } from './renta.component';

describe('RentaComponent', () => {
  let component: RentaComponent;
  let fixture: ComponentFixture<RentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
