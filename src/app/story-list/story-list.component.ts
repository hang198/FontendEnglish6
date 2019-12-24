import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IResponse } from '../interfaces/iresponse';
import { StoryService } from '../services/story.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {

  stories = [];

  constructor(
    private storyService: StoryService,
    private route: Router,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.getAll(params.id);
    });
  }

  getAll(catestory_id) {
    this.storyService.getStories(catestory_id).subscribe((response: IResponse) => {
      this.stories = response.data;
    }, error => {
      console.log(error.error);
    });
  }

}
