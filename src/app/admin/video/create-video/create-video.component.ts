import { Component, OnInit } from '@angular/core';
import { CateVideoService } from "../../../services/catevideo.service";
import { VideoService } from "../../../services/video.service";
import { Router } from "@angular/router";
import { AuthorizationService } from "../../../services/authorization.service";
import { IResponse } from "../../../interfaces/iresponse";
import {FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.css']
})
export class CreateVideoComponent implements OnInit {

  catevideos = [];
  form: FormGroup;
  errors

  constructor(
    protected cateVideoService: CateVideoService,
    private route: Router,
    protected authorization: AuthorizationService,
    protected videoService: VideoService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.cateVideoService.index().subscribe((response: IResponse) => {
      this.catevideos = response.data;
    });
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      link: new FormControl("", Validators.compose([
      ])),
      catevideo_id: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      image: new FormControl("", Validators.compose([
        Validators.required,
      ])),
    });
  }

  onSubmit() {
    this.videoService.create(this.form.value).subscribe((response: IResponse) => {
      this.route.navigate(['/admin/dashboard/video']);
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
      this.videoService.uploadImage(formData).subscribe((response: IResponse) => {
        this.form.get("image").setValue(response.data);
      });
    }
  }
}
