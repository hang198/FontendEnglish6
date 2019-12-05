import { Component, OnInit } from '@angular/core';
import {ICategory} from '../interfaces/icategory';
import {Router} from '@angular/router';
import {IResponse} from '../interfaces/iresponse';
import {CategoryService} from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: ICategory[];

  constructor(private categoryService: CategoryService, private router: Router) { }
  private id: string;

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.categoryService.getAll().subscribe((response: IResponse) => {
      this.categories = response.data;
      console.log(response);
    });
  }

}
