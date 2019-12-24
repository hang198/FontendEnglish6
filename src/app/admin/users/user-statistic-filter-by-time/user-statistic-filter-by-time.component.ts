import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PracticeService} from "../../../services/practice.service";
import {IResponse} from "../../../interfaces/iresponse";

@Component({
  selector: 'app-user-statistic-filter-by-time',
  templateUrl: './user-statistic-filter-by-time.component.html',
  styleUrls: ['./user-statistic-filter-by-time.component.css']
})
export class UserStatisticFilterByTimeComponent implements OnInit {

  id;
  points;
  p = 1;

  constructor(private quizService: PracticeService) {
  }

  ngOnInit() {
    this.getID();
    this.getPointsByTime();
  }

  getID() {
    this.id = this.quizService.getID();
  }

  getPointsByTime() {
    this.quizService.getPointsByTime(this.id).subscribe((response: IResponse) => {
      this.points = response.data;
    });
  }

}
