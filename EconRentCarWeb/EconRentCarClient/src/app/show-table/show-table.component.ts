import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss']
})
export class ShowTableComponent implements OnInit {

  constructor() { }
  @Input()
  public Title: string;
  ngOnInit() {
  }

}
