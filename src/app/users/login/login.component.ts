import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {IResponse} from '../../interfaces/iresponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    this.router.navigate(['/']);
  }
  onSubmit() {
    const data = this.form.value;
    this.authService.login(data).subscribe((response: IResponse) => {
      this.authService.setToken(response.token);
      this.authService.setRole(response.role);
      console.log(response.token);
      this.router.navigate(['/']);
    }, error => {
      this.message = error.error;
      console.log(this.message);
    });
  }

}
