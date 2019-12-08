import { Component, OnInit } from '@angular/core';
import {IPractice} from '../interfaces/ipractice';
import {ICategory} from '../interfaces/icategory';
import {ActivatedRoute} from '@angular/router';
import {PracticeService} from '../services/practice.service';
import {IResponse} from '../interfaces/iresponse';
import {ILesson} from '../interfaces/ilesson';

@Component({
  selector: 'app-practice-list',
  templateUrl: './practice-list.component.html',
  styleUrls: ['./practice-list.component.css']
})
export class PracticeListComponent implements OnInit {

  private practices: IPractice[];
  private lesson: ILesson;
  protected id: string;

  constructor(private practiceService: PracticeService,
              private route: ActivatedRoute) {


  }

  ngOnInit() {
    this.getId();
    this.getpracticeById();
  }

  getpracticeById() {
    this.practiceService.getById(this.id).subscribe((
      response: IResponse) => {
      this.practices = response.data;
      this.lesson = response.lesson;
      this.practices = response.data;
      this.lesson = response.lesson;
    }, error => {
      console.log(error);
    });
  }

  getId() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  goBack() {
    window.history.back();
  }

}
