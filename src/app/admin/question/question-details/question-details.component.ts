import { Component, OnInit } from '@angular/core';
import {IQuestion} from '../../../interfaces/iquestion';
import {IAnswer} from '../../../interfaces/ianswer';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../../../services/question.service';
import {IResponse} from '../../../interfaces/iresponse';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  id;
  question: IQuestion = {};
  answers: IAnswer[];

  constructor(private questionService: QuestionService, private routeMap: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.routeMap.snapshot.paramMap.get('id');
    this.getQuestion();
  }

  getQuestion() {
    this.questionService.getByID(this.id).subscribe((response: IResponse) => {
      this.question = response.question;
      this.answers = response.question.answers;
    });
  }

}
