import { Component, OnInit } from '@angular/core';
import {IError} from '../../../interfaces/ierror';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../../../services/question.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IResponse} from '../../../interfaces/iresponse';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {

  form: FormGroup;
  id: string;
  answers = [];
  errors: IError = {};
  count = 1;
  constructor(private fb: FormBuilder, private questionService: QuestionService,
              private routerMap: ActivatedRoute,
              private route: Router) {
  }


  ngOnInit() {
    this.getId();
    this.getQuestion();
    this.form = this.fb.group({
      content: [''],
      answer: this.fb.array([])
    });
  }

  getId() {
    this.id = this.routerMap.snapshot.paramMap.get('id');
  }

  getQuestion() {
    this.questionService.getByID(this.id).subscribe((response: IResponse) => {
      this.setValueQuestionForm(response);
    });
  }

  setValueQuestionForm(response) {
    this.form.patchValue({
      content: response.question.content
    });
    const answers = response.question.answers;
    answers.forEach((answer) => {
      this.addAnswer(answer.content, answer.correct);
    });
    console.log(response);
  }

  onSubmit() {
    const formData = this.initFormData();
    this.questionService.update(formData, this.id).subscribe((response: IResponse) => {
      this.route.navigate(['/admin/dashboard/question']);
    }, error => {
      const responseErrors = error.error.errors;
      this.errors = responseErrors;
      if (error.status === 403) {
        this.route.navigate(['/forbidden']);
      }
    });
  }

  initFormData() {
    const formAnswer = (this.form.get('answer') as FormArray).controls;
    formAnswer.forEach(((answer, index) => {
      this.answers[index] = answer.value;
    }));
    const formData = new FormData();
    formData.append('content', this.form.get('content').value);
    formData.append('answer', JSON.stringify(this.answers));
    return formData;
  }

  initAnswer(content, correct) {
    return this.fb.group({
      content: [content, Validators.required],
      correct: [correct]
    });
  }

  addAnswer(content, correct) {
    this.count++;
    (this.form.get('answer') as FormArray).controls.push(this.initAnswer(content, correct));
  }

  removeAnswer(index) {
    (this.form.get('answer') as FormArray).controls.splice(index, 1);
    this.count--;
  }
}
