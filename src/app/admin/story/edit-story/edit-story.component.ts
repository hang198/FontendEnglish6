import { Component, OnInit } from '@angular/core';
import { CateStoryService } from "../../../services/catestory.service";
import { StoryService } from "../../../services/story.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthorizationService } from "../../../services/authorization.service";
import { IResponse } from "../../../interfaces/iresponse";
import {FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.css']
})
export class EditStoryComponent implements OnInit {

  form: FormGroup;
  catestories = [];
  errors;
  story_id;

  constructor(
    private cateStoryService: CateStoryService,
    private storyService: StoryService,
    private router: ActivatedRoute,
    private route: Router,
    protected authorization: AuthorizationService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.story_id = params.id;
      this.initForm();
      this.cateStoryService.index().subscribe((response: IResponse) => {
        this.catestories = response.data;
      });
      this.storyService.show(this.story_id).subscribe((response: IResponse) => {
        this.form.patchValue(response.data);
      });
    })
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
      ])),
      image: new FormControl("", Validators.compose([
        Validators.required,
      ])),
    });
  }

  onSubmit() {
    this.storyService.update(this.form.value, this.story_id).subscribe((response: IResponse) => {
      this.route.navigate(['/admin/dashboard/story']);
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
      this.storyService.uploadImage(formData).subscribe((response: IResponse) => {
        this.form.get("image").setValue(response.data);
      });
    }
  }
}
