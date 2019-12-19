import { Component, OnInit } from '@angular/core';
import {PracticeService} from '../../services/practice.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {IResponse} from '../../interfaces/iresponse';

@Component({
  selector: 'app-user-result-practices',
  templateUrl: './user-result-practices.component.html',
  styleUrls: ['./user-result-practices.component.css']
})
export class UserResultPracticesComponent implements OnInit {

  data;
  protected id: string;
  p = 1;

  constructor(private practiceService: PracticeService, private routerMap: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.authService.getUser().subscribe((response: IResponse) => {
      this.id = response.data.id;
      this.getPracticeByUserID();
    });
  }

  getPracticeByUserID() {
    this.practiceService.getPointsByTime(this.id).subscribe((response: IResponse) => {
      this.data = response.data;
      console.log(response.data);
    });
  }

  getPracticeAndPointSort() {
    this.practiceService.getPointsMax(this.id).subscribe((response: IResponse) => {
      this.data = response.data;
      console.log(response.data);
    });
  }

}
