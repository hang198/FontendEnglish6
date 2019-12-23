import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthorizationService } from "../../services/authorization.service";
import { StoryService } from "../../services/story.service";
import { IResponse } from "../../interfaces/iresponse";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {


  stories = [];
  current_story;
  page = 1;

  constructor(
    private route: Router,
    protected authorization: AuthorizationService,
    private storyService: StoryService
  ) { }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this.storyService.index().subscribe((response: IResponse) => {
      this.stories = response.data;
    });
  }

  selectStory(story) {
    this.current_story = story;
  }

  delete() {
    this.storyService.delete(this.current_story.id).subscribe((response: IResponse) => {
      if (response.status === 'success') {
        this.getAll();
      }
    });
  }

}
