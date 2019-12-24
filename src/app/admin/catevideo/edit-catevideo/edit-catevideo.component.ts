import { Component, OnInit } from '@angular/core';
import { CateVideoService } from "../../../services/catevideo.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthorizationService } from "../../../services/authorization.service";
import { IResponse } from "../../../interfaces/iresponse";
import {FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-edit-catevideo',
  templateUrl: './edit-catevideo.component.html',
  styleUrls: ['./edit-catevideo.component.css']
})
export class EditCateVideoComponent implements OnInit {

  form: FormGroup;
  errors;
  catevideo_id;

  constructor(
    protected cateVideoService: CateVideoService,
    private router: ActivatedRoute,
    private route: Router,
    protected authorization: AuthorizationService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.catevideo_id = params.id;
      this.initForm();
      this.cateVideoService.show(this.catevideo_id).subscribe((response: IResponse) => {
        this.form.patchValue(response.data);
      });
    })
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
    this.cateVideoService.update(this.form.value, this.catevideo_id).subscribe((response: IResponse) => {
      this.route.navigate(['/admin/dashboard/catevideo']);
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
      this.cateVideoService.uploadImage(formData).subscribe((response: IResponse) => {
        this.form.get("image").setValue(response.data);
      });
    }
  }
}
