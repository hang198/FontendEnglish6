import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../../services/question.service';
import {PracticeService} from '../../services/practice.service';
import {IResponse} from "../../interfaces/iresponse";

@Component({
  selector: 'app-result-practice',
  templateUrl: './result-practice.component.html',
  styleUrls: ['./result-practice.component.css']
})
export class ResultPracticeComponent implements OnInit {


  private id: string;
  private point;
  private practice;
  private questions: any = [];
  private alphabet = 'ABCDEFGHI';

  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private practiceService: PracticeService) {
  }

  ngOnInit() {
    this.getId();
    this.getResult();
  }

  getId() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  getResult() {
    this.practiceService.getResult(this.id).subscribe((res: IResponse) => {
      this.questions = res.data;
      this.point = res.point;
      this.practice = res.practice;
    });
  }

  isCorrect(answer) {
    if (answer.selected) {
      return (answer.isAnswer) ? 'alert-success' : 'alert-danger';
    }
  }

  goBack() {
    window.history.go(-2);
  }
}
