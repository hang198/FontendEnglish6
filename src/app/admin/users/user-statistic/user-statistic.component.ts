import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../interfaces/iuser";
import {IPractice} from "../../../interfaces/ipractice";
import {IPoint} from "../../../interfaces/ipoint";
import {AuthService} from "../../../services/auth.service";
import {Practice} from "../../../practice-detail-user/models";
import {PracticeService} from "../../../services/practice.service";
import {IResponse} from "../../../interfaces/iresponse";

@Component({
  selector: 'app-user-statistic',
  templateUrl: './user-statistic.component.html',
  styleUrls: ['./user-statistic.component.css']
})
export class UserStatisticComponent implements OnInit {

  user: IUser;
  practices: IPractice[];
  points: IPoint[];
  id;
  p = 1;

  constructor(private authService: AuthService, private practiceService: PracticeService) {
  }

  ngOnInit() {
    this.getID();
    this.getPracticeByUserID();

  }

  getID() {
    this.id = this.practiceService.getID();
  }

  getPracticeByUserID() {
    this.practiceService.getByUserID(this.id).subscribe((response: IResponse) => {
      console.log(response);
      this.practices = response.data.practices;
      this.points = response.data.points;
      this.user = response.data;
    });
  }

}
