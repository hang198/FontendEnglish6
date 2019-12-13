import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IValidators} from '../../../interfaces/ivalidators';
import {ActivatedRoute, Router} from '@angular/router';
import {UnitService} from '../../../services/unit.service';
import {IResponse} from '../../../interfaces/iresponse';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.css']
})
export class EditUnitComponent implements OnInit {

  id;
  form: FormGroup;
  image: any;
  validators: IValidators = {};
  unit;

  constructor(private routeMap: ActivatedRoute,
              private unitService: UnitService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.id = this.routeMap.snapshot.paramMap.get('id');
    this.initFormGroup();
    this.getByID();
  }

  getByID() {
    this.unitService.getById(this.id).subscribe((response: IResponse) => {
      console.log(response.data);
      this.unit = response.data;
      this.form.patchValue({
        name: [response.data.name]
      });
    });
  }

  onSubmit() {
    const formData = this.initFormData();
    this.unitService.update(formData, this.id).subscribe((response: IResponse) => {
      if (response.status === 'success') {
        this.router.navigate(['/admin/dashboard/units']);
      }
    }, error => {
      this.validators = error.error.errors;
      if (error.status === 403) {
        this.router.navigate(['/forbidden']);
      }
    });
  }

  initFormGroup() {
    this.form = this.fb.group({
      name: [''],
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
