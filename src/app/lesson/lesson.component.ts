import { Component, OnInit } from '@angular/core';
import {ILesson} from '../interfaces/ilesson';
import {LessonService} from '../services/lesson.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IResponse} from '../interfaces/iresponse';
import {ICategory} from '../interfaces/icategory';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  lessons: ILesson[];
  category: ICategory;
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
      this.category = response.category;
    }, error => {
      console.log(error);
    });
  }
}
