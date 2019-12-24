import { Component, OnInit } from '@angular/core';
import { CateVideoService } from "../../../services/catevideo.service";
import { VideoService } from "../../../services/video.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthorizationService } from "../../../services/authorization.service";
import { IResponse } from "../../../interfaces/iresponse";
import {FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements OnInit {

  form: FormGroup;
  catevideos = [];
  errors;
  video_id;

  constructor(
    private cateVideoService: CateVideoService,
    private videoService: VideoService,
    private router: ActivatedRoute,
    private route: Router,
    protected authorization: AuthorizationService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.video_id = params.id;
      this.initForm();
      this.cateVideoService.index().subscribe((response: IResponse) => {
        this.catevideos = response.data;
      });
      this.videoService.show(this.video_id).subscribe((response: IResponse) => {
        this.form.patchValue(response.data);
      });
    })
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
    this.videoService.update(this.form.value, this.video_id).subscribe((response: IResponse) => {
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
