import { Component, OnInit } from '@angular/core';
import {IQuestion} from '../../../interfaces/iquestion';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ILesson} from '../../../interfaces/ilesson';
import {Router} from '@angular/router';
import {QuestionService} from '../../../services/question.service';
import {LessonService} from '../../../services/lesson.service';
import {PracticeService} from '../../../services/practice.service';
import {IResponse} from '../../../interfaces/iresponse';

@Component({
  selector: 'app-create-practice',
  templateUrl: './create-practice.component.html',
  styleUrls: ['./create-practice.component.css']
})
export class CreatePracticeComponent implements OnInit {
  protected lessons: ILesson[] = [];
  protected form: FormGroup;
  protected questions: IQuestion[];
  protected searchedQuestion: IQuestion[];
  protected chooseQuestion: IQuestion[] = [];
  protected p = 1;
  protected keyWord: string;
  protected page = 1;

  constructor(private fb: FormBuilder,
              private questionService: QuestionService,
              private levelService: LessonService,
              private practiceService: PracticeService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      questions: [[]],
      lesson_id: [''],
    });
    this.getAllQuestion();
    this.getAllLessons();
  }

  public getAllQuestion() {
    this.questionService.getAll().subscribe((response: IResponse) => {
      this.questions = response.data;
      this.search();
    });
  }

  public getAllLessons() {
    this.levelService.getAll().subscribe((response: IResponse) => {
      const responseLessons = response.data;
      this.lessons = responseLessons;
    });
  }

  public addQuestionToPractice(questionId) {
    const index = this.findIndexById(questionId, this.questions);
    const splicedQuestions = this.questions.splice(index, 1);
    const questionValue = this.form.controls.questions.value;
    this.chooseQuestion.push(splicedQuestions[0]);
    questionValue.push(questionId);
    this.search();
  }

  removeQuestionFromPractice(questionId) {
    const index = this.findIndexById(questionId, this.chooseQuestion);
    const questions = this.chooseQuestion.splice(index, 1);
    const questionValue = this.form.controls.asks.value;
    questionValue.splice(index, 1);
    this.questions.push(questions[0]);
    this.search();
  }

  findIndexById(id, arr) {
    return arr.findIndex((item) => {
      return item.id === id;
    });
  }

  onSubmit() {
    this.practiceService.create(this.form.value).subscribe(
      (response: IResponse) => {
        console.log(response);
        this.router.navigate(['/admin/dashboard/practices']);
      }, error => {
        console.log(error.error);
        if (error.status === 403) {
          this.router.navigate(['/']);
        }
      });
  }

  search() {
    if (!this.keyWord) {
      this.searchedQuestion = this.questions;
    } else {
      this.searchedQuestion = this.questions.filter((ask) => {
        return ask.content.indexOf(this.keyWord) !== -1;
      });
    }
  }

}
