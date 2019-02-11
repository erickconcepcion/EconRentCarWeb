import { Component, OnInit } from '@angular/core';
import { TandaLaboral } from '../shared/models/enums';
import { EnumOptions } from '../shared/dynamic-crud/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  public title = 'EconRentCar';
  ngOnInit() {

  }
}
