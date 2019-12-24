import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IResponse } from '../interfaces/iresponse';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  videos = [];

  constructor(
    private videoService: VideoService,
    private route: Router,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.getAll(params.id);
    });
  }

  getAll(catevideo_id) {
    this.videoService.getVideos(catevideo_id).subscribe((response: IResponse) => {
      this.videos = response.data;
    }, error => {
      console.log(error.error);
    });
  }

}
