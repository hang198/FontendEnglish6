import { Component, OnInit } from '@angular/core';
import {IUnit} from '../../interfaces/iunit';
import {UnitService} from '../../services/unit.service';
import {AuthorizationService} from '../../services/authorization.service';
import {IResponse} from "../../interfaces/iresponse";

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {

  units: IUnit[] = [];
  page = 1;

  constructor(private unitService: UnitService,
              protected authorization: AuthorizationService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.unitService.getAll().subscribe((response: IResponse) => {
      this.units = response.data;
    });
  }

  delete(id: string) {
    this.unitService.delete(id).subscribe((response: IResponse) => {
      if (response.status === 'success') {
        this.getAll();
      }
    });
  }
}
