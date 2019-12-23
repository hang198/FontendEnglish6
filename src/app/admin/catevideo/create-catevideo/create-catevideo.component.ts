import { Component, OnInit } from '@angular/core';
import { CateVideoService } from "../../../services/catevideo.service";
import { Router } from "@angular/router";
import { AuthorizationService } from "../../../services/authorization.service";
import { IResponse } from "../../../interfaces/iresponse";
import {FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-create-catevideo',
  templateUrl: './create-catevideo.component.html',
  styleUrls: ['./create-catevideo.component.css']
})
export class CreateCateVideoComponent implements OnInit {

  form: FormGroup;
  errors

  constructor(
    protected cateVideoService: CateVideoService,
    private route: Router,
    protected authorization: AuthorizationService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      desc: new FormControl("", Validators.compose([
      ])),
      order: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      type: new FormControl("", Validators.compose([
        Validators.required,
      ])),
    });
  }

  onSubmit() {
    this.cateVideoService.create(this.form.value).subscribe((response: IResponse) => {
      this.route.navigate(['/admin/dashboard/catevideo']);
    }, error => {
      const responseErrors = error.error.errors;
      this.errors = responseErrors;
      if (error.status === 403) {
        this.route.navigate(['/forbidden']);
      }
    });
  }
}
