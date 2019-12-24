import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IResponse } from '../interfaces/iresponse';
import { StoryService } from '../services/story.service';

@Component({
  selector: 'app-story-view',
  templateUrl: './story-view.component.html',
  styleUrls: ['./story-view.component.css']
})
export class StoryViewComponent implements OnInit {

  story;

  constructor(
    private storyService: StoryService,
    private route: Router,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.storyService.show(params.id).subscribe((response: IResponse) => {
        this.story = response.data;
      }, error => {
        console.log(error.error);
      });
    });
  }
}
