import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IValidators} from '../../interfaces/ivalidators';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {IResponse} from '../../interfaces/iresponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  validators: IValidators = {};
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      password: [''],
      passwordConfirm: [''],
    });
  }

  onSubmit() {
    const data = this.form.value;
    this.authService.register(data).subscribe((response: IResponse) => {
      localStorage.setItem('currentToken', response.token);
      console.log(response);
    }, error => {
      this.validators = error.error.errors;
      console.log(error);
    });
  }

}
