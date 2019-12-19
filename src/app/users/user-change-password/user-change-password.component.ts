import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IValidators} from '../../interfaces/ivalidators';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {IResponse} from '../../interfaces/iresponse';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  password: FormGroup;
  validators: IValidators = {};
  protected message: string;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.password = this.fb.group({
      oldPassword: [''],
      newPassword: [''],
      passwordConfirm: ['']
    });
  }

  changePassword() {
    this.authService.changePassWord(this.password.value).subscribe((response: IResponse) => {
      this.message = response.message;
      console.log(response);
      if (response.status) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }, error => {
      this.validators = error.error.errors;
      console.log(error);
    });
  }

}
