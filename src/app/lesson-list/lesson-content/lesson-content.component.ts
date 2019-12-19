import { Component, OnInit } from '@angular/core';
import {IResponse} from '../../interfaces/iresponse';
import {ILesson} from '../../interfaces/ilesson';
import {IUnit} from '../../interfaces/iunit';
import {LessonService} from '../../services/lesson.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IPractice} from '../../interfaces/ipractice';
import {PracticeService} from '../../services/practice.service';

@Component({
  selector: 'app-lesson-content',
  templateUrl: './lesson-content.component.html',
  styleUrls: ['./lesson-content.component.css']
})
export class LessonContentComponent implements OnInit {

  lesson: ILesson;
  practice: IPractice;
  private id: string;
  constructor(private lessonService: LessonService,
              private practiceService: PracticeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getId();
    this.getLessonByUnitId();
    this.getPracticeByLessonId();
  }
  getId() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  getLessonByUnitId() {
    this.lessonService.getByUnitID(this.id).subscribe((
      response: IResponse) => {
      this.lesson = response.data;
    }, error => {
      console.log(error);
    });
  }
  getPracticeByLessonId() {
    this.practiceService.getByLessonID(this.id).subscribe((res: IResponse) => {
      this.practice = res.data;
    });
  }
}
