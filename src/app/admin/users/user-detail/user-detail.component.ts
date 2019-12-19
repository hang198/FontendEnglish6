import { Component, OnInit } from '@angular/core';
import {IResponse} from '../../../interfaces/iresponse';
import {PracticeService} from '../../../services/practice.service';
import {ActivatedRoute} from '@angular/router';
import {IPractice} from '../../../interfaces/ipractice';
import {IUser} from '../../../interfaces/iuser';
import {IPoint} from '../../../interfaces/ipoint';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: IUser;
  practices: IPractice[];
  points: IPoint[];
  protected id: string;

  constructor(private practiceService: PracticeService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.setId();
    this.getPracticeByUserID();
  }

  setId() {
    this.practiceService.setId(this.id);
  }

  getPracticeByUserID() {
    this.practiceService.getByUserID(this.id).subscribe((response: IResponse) => {
      this.practices = response.data;
      this.points = response.data.points;
      this.user = response.data;
    });
  }

}
