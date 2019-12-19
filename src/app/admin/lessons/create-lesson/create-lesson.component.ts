import { Component, OnInit } from '@angular/core';
import {IUnit} from '../../../interfaces/iunit';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UnitService} from '../../../services/unit.service';
import {LessonService} from '../../../services/lesson.service';
import {Router} from '@angular/router';
import {IResponse} from '../../../interfaces/iresponse';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {

  protected units: IUnit[] = [];
  protected form: FormGroup;
  protected p = 1;
  protected page = 1;

  constructor(private fb: FormBuilder,
              private unitService: UnitService,
              private lessonService: LessonService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      content: [''],
      unit_id: [''],
    });
    this.getAllUnits();
  }
  public getAllUnits() {
    this.unitService.getAll().subscribe((response: IResponse) => {
      const responseUnits = response.data;
      this.units = responseUnits;
    });
  }

  onSubmit() {
    this.lessonService.create(this.form.value).subscribe(
      (response: IResponse) => {
        console.log(response.data);
        this.router.navigate(['/admin/dashboard/lessons']);
      }, error => {
        console.log(error.error)
        if (error.status === 403) {
          this.router.navigate(['/']);
        }
      });
  }

}
