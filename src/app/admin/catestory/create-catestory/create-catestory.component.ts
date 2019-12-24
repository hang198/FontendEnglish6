import { Component, OnInit } from '@angular/core';
import { CateStoryService } from "../../../services/catestory.service";
import { Router } from "@angular/router";
import { AuthorizationService } from "../../../services/authorization.service";
import { IResponse } from "../../../interfaces/iresponse";
import {FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-create-catestory',
  templateUrl: './create-catestory.component.html',
  styleUrls: ['./create-catestory.component.css']
})
export class CreateCateStoryComponent implements OnInit {

  form: FormGroup;
  errors

  constructor(
    protected cateStoryService: CateStoryService,
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
      image: new FormControl("", Validators.compose([
        Validators.required,
      ])),
    });
  }

  onSubmit() {
    this.cateStoryService.create(this.form.value).subscribe((response: IResponse) => {
      this.route.navigate(['/admin/dashboard/catestory']);
    }, error => {
      const responseErrors = error.error.errors;
      this.errors = responseErrors;
      if (error.status === 403) {
        this.route.navigate(['/forbidden']);
      }
    });
  }

  handleInputChange(e) {
    let file = e.target.files[0];
    if (file) {
      let formData: FormData = new FormData();
      formData.append('image', file, file.name);
      this.cateStoryService.uploadImage(formData).subscribe((response: IResponse) => {
        this.form.get("image").setValue(response.data);
      });
    }
  }
}
