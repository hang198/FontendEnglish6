import { Component, OnInit } from '@angular/core';
import {IPractice} from "../../../interfaces/ipractice";
import {IUser} from "../../../interfaces/iuser";
import {AuthService} from "../../../services/auth.service";
import {IPoint} from "../../../interfaces/ipoint";
import {PracticeService} from "../../../services/practice.service";
import {ActivatedRoute} from "@angular/router";
import {IResponse} from "../../../interfaces/iresponse";

@Component({
  selector: 'app-practice-detail-st',
  templateUrl: './practice-detail-st.component.html',
  styleUrls: ['./practice-detail-st.component.css']
})
export class PracticeDetailStComponent implements OnInit {

  practice: IPractice;
  users: IUser[];
  points: IPoint[] = [];
  protected id: string;
  p = 1;

  constructor(private practiceService: PracticeService, private userService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUserByPracticeIdTime();
  }

  getUserByPracticeIdTime() {
    this.practiceService.getPointsByPracticeTime(this.id).subscribe((response: IResponse) => {
      console.log(response);
      this.points = response.data;
    });
  }

  getUserAndByPracticeIdSort() {
    this.practiceService.getPointsByPracticeSort(this.id).subscribe((response: IResponse) => {
      console.log(response);
      this.points = response.data;
    });
  }
}
