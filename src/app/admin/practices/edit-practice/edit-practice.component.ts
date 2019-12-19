import { Component, OnInit } from '@angular/core';
import {ILesson} from '../../../interfaces/ilesson';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IQuestion} from '../../../interfaces/iquestion';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonService} from '../../../services/lesson.service';
import {QuestionService} from '../../../services/question.service';
import {PracticeService} from '../../../services/practice.service';
import {IResponse} from '../../../interfaces/iresponse';
import * as $ from 'jquery';

@Component({
  selector: 'app-edit-practice',
  templateUrl: './edit-practice.component.html',
  styleUrls: ['./edit-practice.component.css']
})
export class EditPracticeComponent implements OnInit {

  protected lessons: ILesson[] = [];
  protected id;
  protected form: FormGroup;
  protected questions: IQuestion[] = [];
  protected chooseQuestion: IQuestion[] = [];
  protected searchedQuestion: IQuestion[];
  protected p = 1;
  protected keyWord: any;

  constructor(private fb: FormBuilder,
              private routeMap: ActivatedRoute,
              private lessonService: LessonService,
              private questionService: QuestionService,
              private practiceService: PracticeService,
              private router: Router) {
  }

  ngOnInit() {
    this.getId();
    this.form = this.fb.group({
      name: [''],
      questions: [[]],
      lesson_id: ['']
    });
    this.getAllQuestion();
    this.getPracticeById();
    this.getAllLessons();
  }

  getId() {
    this.id = this.routeMap.snapshot.paramMap.get('id');
  }

  getPracticeById() {
    this.practiceService.getById(this.id).subscribe((response: IResponse) => {
      const PracticeName = response.data.name;
      const responseLesson = response.data.lesson_id;
      this.form.patchValue({
        name: PracticeName,
        lesson_id: responseLesson
      });
      const chosenQuestion = response.data.questions;
      chosenQuestion.map((item) => {
        this.addQuestionToPractice(this.findIndexById(item, this.questions));
      });
    });
  }

  getAllQuestion() {
    this.questionService.getAll().subscribe((response: IResponse) => {
      this.questions = response.data;
      this.search();
    });
  }

  getAllLessons() {
    this.lessonService.getAll().subscribe((response: IResponse) => {
      const responseLessons = response.data;
      this.lessons = responseLessons;
    });
  }

  addQuestionToPractice(questionId) {
    const index = this.findIndexById(questionId, this.questions);
    const questions = this.questions.splice(index, 1);
    this.chooseQuestion.push(questions[0]);
    const questionValue = this.form.controls.questions.value;
    questionValue.push(questions[0].id);
    this.search();
  }

  removeQuestionFromPractice(questionId) {
    const index = this.findIndexById(questionId, this.chooseQuestion);
    const questions = this.chooseQuestion.splice(index, 1);
    const questionValue = this.form.controls.questions.value;
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
    this.practiceService.update(this.form.value, this.id).subscribe(
      (response: IResponse) => {
        this.router.navigate(['/admin/dashboard/practices']);
      }, error => {
        if (error.status === 403) {
          this.router.navigate(['/']);
        }
      });
  }

  search() {
    if (!this.keyWord) {
      this.searchedQuestion = this.questions;
    } else {
      this.searchedQuestion = this.questions.filter((question) => {
        return question.content.indexOf(this.keyWord) !== -1;
      });
    }
  }

}
