import { Component, OnInit } from '@angular/core';
import {IResponse} from '../../../interfaces/iresponse';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonService} from '../../../services/lesson.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UnitService} from '../../../services/unit.service';
import {IUnit} from '../../../interfaces/iunit';
import {AngularEditorConfig} from "@kolkov/angular-editor";

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {

  protected units: IUnit[] = [];
  protected id;
  protected form: FormGroup;
  protected p = 1;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private unitService: UnitService,
              private lessonService: LessonService,
              private router: Router) {
  }

  ngOnInit() {
    this.getId();
    this.form = this.fb.group({
      name: [''],
      content: [''],
      unit_id: ['']
    });
    this.getLessonById();
    this.getAllUnits();
  }

  getId() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  getLessonById() {
    this.lessonService.getByID(this.id).subscribe((response: IResponse) => {
      this.form.patchValue({
        name: response.data.name,
        content: response.data.content,
        unit_id: response.data.unit_id
      });
      console.log(response.data);
    });
  }
  getAllUnits() {
    this.unitService.getAll().subscribe((response: IResponse) => {
      const responseUnits = response.data;
      this.units = responseUnits;
    });
  }
  onSubmit() {
    this.lessonService.update(this.form.value, this.id).subscribe(
      (response: IResponse) => {
        this.router.navigate(['/admin/dashboard/lessons']);
      }, error => {
        if (error.status === 403) {
          this.router.navigate(['/']);
        }
      });
  }
}
