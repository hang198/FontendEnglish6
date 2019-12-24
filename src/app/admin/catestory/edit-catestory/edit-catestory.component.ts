import { Component, OnInit } from '@angular/core';
import { CateStoryService } from "../../../services/catestory.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthorizationService } from "../../../services/authorization.service";
import { IResponse } from "../../../interfaces/iresponse";
import {FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-edit-catestory',
  templateUrl: './edit-catestory.component.html',
  styleUrls: ['./edit-catestory.component.css']
})
export class EditCateStoryComponent implements OnInit {

  form: FormGroup;
  errors;
  catestory_id;

  constructor(
    protected cateStoryService: CateStoryService,
    private router: ActivatedRoute,
    private route: Router,
    protected authorization: AuthorizationService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.catestory_id = params.id;
      this.initForm();
      this.cateStoryService.show(this.catestory_id).subscribe((response: IResponse) => {
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
    this.cateStoryService.update(this.form.value, this.catestory_id).subscribe((response: IResponse) => {
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
