import { Component, OnInit } from '@angular/core';
import { IQuestion } from "../../interfaces/iquestion";
import { QuestionService } from "../../services/question.service";
import { Router } from "@angular/router";
import { AuthorizationService } from "../../services/authorization.service";
import { IResponse } from "../../interfaces/iresponse";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {


  questions: IQuestion[] = [];
  page = 1;


  protected keyWord: string;
  protected searchedQuestions: IQuestion[] = [];

  constructor(
    protected questionService: QuestionService,
    private router: Router,
    protected authorization: AuthorizationService
  ) { }

  ngOnInit() { }
}
