import { Component, OnInit } from '@angular/core';
import {IUnit} from '../interfaces/iunit';
import {Router} from '@angular/router';
import {IResponse} from '../interfaces/iresponse';
import {UnitService} from '../services/unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {

  units: IUnit[];

  constructor(private unitService: UnitService, private router: Router) { }
  private id: string;

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.unitService.getAll().subscribe((response: IResponse) => {
      this.units = response.data;
    }, error => {
      console.log(error);
    });
  }

}
