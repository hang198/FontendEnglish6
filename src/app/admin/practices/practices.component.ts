import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';
import {PracticeService} from '../../services/practice.service';
import {IResponse} from '../../interfaces/iresponse';

@Component({
  selector: 'app-practices',
  templateUrl: './practices.component.html',
  styleUrls: ['./practices.component.css']
})
export class PracticesComponent implements OnInit {

  practices = [];
  p = 1;

  constructor(private practiceService: PracticeService,
              protected authorization: AuthorizationService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.practiceService.getAll().subscribe((response: IResponse) => {
      if (response.data) {
        this.practices = response.data;
      }
    });
  }

  delete(id) {
    this.practiceService.delete(id).subscribe((response: IResponse) => {
      this.getAll();
    });
  }

}
