import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {IResponse} from "../../interfaces/iresponse";
import {IValidators} from "../../interfaces/ivalidators";
import {IUser} from "../../interfaces/iuser";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  formUser: FormGroup;
  protected user: IUser;
  protected message: string;
  validators: IValidators = {};

  constructor(private auService: AuthService,
              private fb: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getInfoUser();
    this.formUser = this.fb.group({
      name: [''],
      age: [''],
      gender: [''],
      address: [''],
      phone: [''],
    });
  }

  getInfoUser() {
    this.auService.getUser().subscribe((response: IResponse) => {
      this.formUser.patchValue({
        name: response.data.name,
        age: response.data.age,
        gender: response.data.gender,
        address: response.data.address,
        phone: response.data.phone,
      });
      this.user = response.data;
    });

  }

  onSubmit() {
    this.userService.editInfo(this.formUser.value, this.user.id).subscribe((response: IResponse) => {
      if (response.status) {
        this.validators = {};
        this.message = response.message;
      }
    }, error => {
      this.validators = error.error.errors;
    });
  }

}
