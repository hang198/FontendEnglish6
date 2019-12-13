import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IError} from '../../../interfaces/ierror';
import {QuestionService} from '../../../services/question.service';
import {Router} from '@angular/router';
import {IResponse} from '../../../interfaces/iresponse';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  form: FormGroup;
  message: string;
  answers = [];
  errors: IError = {};

  constructor(private fb: FormBuilder,
              private questionService: QuestionService,
              private route: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      content: [''],
      answer: this.fb.array([this.initAnswer()])
    });
  }

  onSubmit() {
    const formData = this.initFormData();
    this.questionService.create(formData).subscribe((response: IResponse) => {
      console.log(response);
      this.route.navigate(['/admin/dashboard/question']);
    }, error => {
      console.log(error);
      const responseErrors = error.error.errors;
      this.errors = responseErrors;
      if (error.status === 403) {
        this.route.navigate(['/forbidden']);
      }
    });
  }

  initFormData() {
    const formAnswer = (this.form.get('answer') as FormArray).controls;
    formAnswer.forEach((answer, index) => {
      this.answers[index] = answer.value;
    });
    const formData = new FormData();
    formData.append('content', this.form.get('content').value);
    formData.append('answer', JSON.stringify(this.answers));
    return formData;
  }

  initAnswer() {
    return this.fb.group({
      content: ['', Validators.required],
      correct: [0]
    });
  }

  addAnswer() {
    (this.form.get('answer') as FormArray).controls.push(this.initAnswer());
  }

  removeAnswer() {
    (this.form.get('answer') as FormArray).controls.pop();
  }
}
