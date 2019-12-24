import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IResponse } from '../interfaces/iresponse';
import { CateStoryService } from '../services/catestory.service';

@Component({
  selector: 'app-catestory-list',
  templateUrl: './catestory-list.component.html',
  styleUrls: ['./catestory-list.component.css']
})
export class CatestoryListComponent implements OnInit {

  catestories = [];

  constructor(
    private cateStoryService: CateStoryService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.cateStoryService.index().subscribe((response: IResponse) => {
      this.catestories = response.data;
    }, error => {
      console.log(error.error);
    });
  }

}
