import { Component, OnInit } from '@angular/core';
import { IQuestion } from "../../interfaces/iquestion";
import { CateStoryService } from "../../services/catestory.service";
import { Router } from "@angular/router";
import { AuthorizationService } from "../../services/authorization.service";
import { IResponse } from "../../interfaces/iresponse";

@Component({
  selector: 'app-catestory',
  templateUrl: './catestory.component.html',
  styleUrls: ['./catestory.component.css']
})
export class CateStoryComponent implements OnInit {

  catestories = [];
  page = 1;
  errors;
  current_catestory;

  protected keyWord: string;
  protected searchedQuestions: IQuestion[] = [];

  constructor(
    protected cateStoryService: CateStoryService,
    private route: Router,
    protected authorization: AuthorizationService
  ) { }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this.cateStoryService.index().subscribe((response: IResponse) => {
      this.catestories = response.data;
    });
  }

  selectCatestory(catestory) {
    this.current_catestory = catestory;
  }

  delete() {
    this.cateStoryService.delete(this.current_catestory.id).subscribe((response: IResponse) => {
      if (response.status === 'success') {
        this.getAll();
      }
    });
  }
}
