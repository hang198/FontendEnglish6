import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IResponse } from '../interfaces/iresponse';
import { VideoService } from '../services/video.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  video;

  constructor(
    protected sanitizer: DomSanitizer,
    private videoService: VideoService,
    private route: Router,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.videoService.show(params.id).subscribe((response: IResponse) => {
        this.video = response.data;
      }, error => {
        console.log(error.error);
      });
    });
  }
}
