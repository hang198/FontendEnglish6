import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {IValidators} from "../../../interfaces/ivalidators";
import {UnitService} from "../../../services/unit.service";
import {Router} from "@angular/router";
import {IResponse} from "../../../interfaces/iresponse";

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.css']
})
export class CreateUnitComponent implements OnInit {

  form: FormGroup;
  image: any;
  validators: IValidators = {};

  constructor(private fb: FormBuilder, private unitService: UnitService, private router: Router) {
  }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.form = this.fb.group({
      name: [''],
    });
  }

  onSubmit() {
    const formData = this.initFormData();
    this.unitService.create(formData).subscribe((response: IResponse) => {
      if (response.status === 'success') {
        this.router.navigate(['/admin/dashboard/units']);
      }
    }, error => {
      this.validators = error.error.errors;
      if (error.status === 403) {
        this.router.navigate(['/']);
      }
    });
  }

  initFormData() {
    const formData = new FormData();
    formData.append('name', this.form.get('name').value);
    if (this.image) {
      formData.append('image', this.image);
    }
    return formData;
  }

  changeImage(images) {
    if (images && images[0]) {
      this.image = images[0];
      const reader = new FileReader();
      reader.readAsDataURL(images[0]);
      reader.onload = (e) => {
        // @ts-ignore
        $('#image').attr('src', reader.result);
      };
    }
  }

}
