import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthorizationService } from "../../services/authorization.service";
import { VideoService } from "../../services/video.service";
import { IResponse } from "../../interfaces/iresponse";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {


  videos = [];
  current_video;
  page = 1;

  constructor(
    private route: Router,
    protected authorization: AuthorizationService,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this.videoService.index().subscribe((response: IResponse) => {
      this.videos = response.data;
    });
  }

  selectVideo(video) {
    this.current_video = video;
  }

  delete() {
    this.videoService.delete(this.current_video.id).subscribe((response: IResponse) => {
      if (response.status === 'success') {
        this.getAll();
      }
    });
  }

}
