import { Component, OnInit } from '@angular/core';
import {IPractice} from "../../interfaces/ipractice";
import {IUser} from "../../interfaces/iuser";
import {PracticeService} from "../../services/practice.service";
import {IResponse} from "../../interfaces/iresponse";

@Component({
  selector: 'app-practice-statistic',
  templateUrl: './practice-statistic.component.html',
  styleUrls: ['./practice-statistic.component.css']
})
export class PracticeStatisticComponent implements OnInit {

  practices: IPractice[];
  users: IUser[];
  p = 1;

  constructor(private practiceService: PracticeService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.practiceService.getAll().subscribe((response: IResponse) => {
      this.practices = response.data;
    });
  }
  totalUserDo() {
    return  this.users.length;
  }
}
