import { Component, OnInit } from '@angular/core';
import {ILesson} from '../interfaces/ilesson';
import {LessonService} from '../services/lesson.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IResponse} from '../interfaces/iresponse';
import {IUnit} from '../interfaces/iunit';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {

  lessons: ILesson[];
  unit: IUnit;
  private id: string;
  constructor(private lessonService: LessonService,
              private router: Router,
              private route: ActivatedRoute) { }
  ngOnInit() {
    this.getId();
    this.getLessonByUnitId();
  }
  getId() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  getLessonByUnitId() {
    this.lessonService.getByUnitID(this.id).subscribe((
      response: IResponse) => {
      this.lessons = response.data;
      this.unit = response.unit;
    }, error => {
      console.log(error);
    });
  }
}
