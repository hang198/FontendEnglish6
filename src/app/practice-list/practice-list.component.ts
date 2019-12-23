import { Component, OnInit } from '@angular/core';
import {IPractice} from "../interfaces/ipractice";
import {IUnit} from "../interfaces/iunit";
import {PracticeService} from "../services/practice.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IResponse} from "../interfaces/iresponse";
import {ILesson} from "../interfaces/ilesson";

@Component({
  selector: 'app-practice-list',
  templateUrl: './practice-list.component.html',
  styleUrls: ['./practice-list.component.css']
})
export class PracticeListComponent implements OnInit {

  practices: IPractice[];
  lesson: ILesson;
  private id: string;
  constructor(private practiceService: PracticeService,
              private router: Router,
              private route: ActivatedRoute) { }
  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.practiceService.getAll().subscribe((response: IResponse) => {
      this.practices = response.data;
    });
  }
}
