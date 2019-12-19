import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';
import {IResponse} from '../../interfaces/iresponse';
import {ILesson} from '../../interfaces/ilesson';
import {LessonService} from '../../services/lesson.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  lessons: ILesson[] = [];
  page = 1;

  constructor(private lessonService: LessonService,
              protected authorization: AuthorizationService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.lessonService.getAll().subscribe((response: IResponse) => {
      this.lessons = response.data;
    });
  }

  delete(id: string) {
    this.lessonService.delete(id).subscribe((response: IResponse) => {
      if (response.status === 'success') {
        this.getAll();
      }
    });
  }

}
