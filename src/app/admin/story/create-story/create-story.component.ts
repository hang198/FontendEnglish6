import { Component, OnInit } from '@angular/core';
import { CateStoryService } from "../../../services/catestory.service";
import { StoryService } from "../../../services/story.service";
import { Router } from "@angular/router";
import { AuthorizationService } from "../../../services/authorization.service";
import { IResponse } from "../../../interfaces/iresponse";
import {FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent implements OnInit {

  catestories = [];
  form: FormGroup;
  errors

  constructor(
    protected cateStoryService: CateStoryService,
    private route: Router,
    protected authorization: AuthorizationService,
    protected storyService: StoryService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.cateStoryService.index().subscribe((response: IResponse) => {
      this.catestories = response.data;
    });
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      content: new FormControl("", Validators.compose([
      ])),
      catestory_id: new FormControl("", Validators.compose([
        Validators.required,
      ]))
    });
  }

  onSubmit() {
    this.storyService.create(this.form.value).subscribe((response: IResponse) => {
      this.route.navigate(['/admin/dashboard/story']);
    }, error => {
      const responseErrors = error.error.errors;
      this.errors = responseErrors;
      if (error.status === 403) {
        this.route.navigate(['/forbidden']);
      }
    });
  }
}
