import {Component, OnInit} from '@angular/core';
import {IQuestion} from "../../interfaces/iquestion";
import {QuestionService} from "../../services/question.service";
import {Router} from "@angular/router";
import {AuthorizationService} from "../../services/authorization.service";
import {IResponse} from "../../interfaces/iresponse";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


  questions: IQuestion[] = [];
  page = 1;


  protected keyWord: string;
  protected searchedQuestions: IQuestion[] = [];

  constructor(protected questionService: QuestionService,
              private router: Router,
              protected authorization: AuthorizationService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.questionService.getAll().subscribe((response: IResponse) => {
      if (response.data) {
        this.questions = response.data;
        this.search();
      }
    }, error => {
      console.log(error);
    });
  }

  delete(questionId: number) {
    this.questionService.delete(questionId).subscribe((response: IResponse) => {
      this.getAll();
      console.log(response);
    }, error => {
      if (error.status === 403) {
        this.router.navigate(['/forbidden']);
      }
    });
  }

  search() {
    if (!this.keyWord) {
      this.searchedQuestions = this.questions;
    } else {
      this.searchedQuestions = this.questions.filter((question) => {
        return question.content.indexOf(this.keyWord) !== -1;
      });
    }
  }

}
