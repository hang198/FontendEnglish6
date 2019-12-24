import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IResponse } from '../interfaces/iresponse';
import { CateVideoService } from '../services/catevideo.service';

@Component({
  selector: 'app-catevideo-list',
  templateUrl: './catevideo-list.component.html',
  styleUrls: ['./catevideo-list.component.css']
})
export class CatevideoListComponent implements OnInit {

  catevideos = [];

  constructor(
    private cateVideoService: CateVideoService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.cateVideoService.index().subscribe((response: IResponse) => {
      this.catevideos = response.data;
    }, error => {
      console.log(error.error);
    });
  }

}
