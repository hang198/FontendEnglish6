import { Component, OnInit } from '@angular/core';
import { IQuestion } from "../../interfaces/iquestion";
import { CateVideoService } from "../../services/catevideo.service";
import { Router } from "@angular/router";
import { AuthorizationService } from "../../services/authorization.service";
import { IResponse } from "../../interfaces/iresponse";

@Component({
  selector: 'app-catevideo',
  templateUrl: './catevideo.component.html',
  styleUrls: ['./catevideo.component.css']
})
export class CateVideoComponent implements OnInit {

  catevideos = [];
  page = 1;
  errors;
  current_catevideo;

  protected keyWord: string;
  protected searchedQuestions: IQuestion[] = [];

  constructor(
    protected cateVideoService: CateVideoService,
    private route: Router,
    protected authorization: AuthorizationService
  ) { }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this.cateVideoService.index().subscribe((response: IResponse) => {
      this.catevideos = response.data;
    });
  }

  selectCatevideo(catevideo) {
    this.current_catevideo = catevideo;
  }

  delete() {
    this.cateVideoService.delete(this.current_catevideo.id).subscribe((response: IResponse) => {
      if (response.status === 'success') {
        this.getAll();
      }
    });
  }
}
