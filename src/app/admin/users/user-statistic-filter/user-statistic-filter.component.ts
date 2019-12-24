import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Practice} from "../../../practice-detail-user/models";
import {PracticeService} from "../../../services/practice.service";
import {IResponse} from "../../../interfaces/iresponse";

@Component({
  selector: 'app-user-statistic-filter',
  templateUrl: './user-statistic-filter.component.html',
  styleUrls: ['./user-statistic-filter.component.css']
})
export class UserStatisticFilterComponent implements OnInit {

  id;
  p = 1;
  points;

  constructor(private routerMap: ActivatedRoute, private practiceService: PracticeService) {
  }

  ngOnInit() {
    this.id = this.practiceService.getID();
    this.getPointsMax();
  }

  getPointsMax() {
    this.practiceService.getPointsMax(this.id).subscribe((response: IResponse) => {
      this.points = response.data;
    });
  }
}
