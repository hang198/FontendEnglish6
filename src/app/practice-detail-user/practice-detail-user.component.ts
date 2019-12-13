import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from '../services/question.service';
import {IResponse} from '../interfaces/iresponse';
import * as $ from 'jquery';
import {Option, Question} from './models';
import {PracticeService} from '../services/practice.service';
import {IUser} from '../interfaces/iuser';
import {AuthService} from '../services/auth.service';
import {IPractice} from '../interfaces/ipractice';

@Component({
  selector: 'app-practice-detail-user',
  templateUrl: './practice-detail-user.component.html',
  styleUrls: ['./practice-detail-user.component.css']
})
export class PracticeDetailUserComponent implements OnInit, OnDestroy {
  private id: string;
  private questions = [];
  protected page = 1;
  protected currentUser: IUser;
  seconds = 120;
  protected practice: IPractice = {};
  private alphabet = 'ABCDEFGHI';
  timer;

  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private practiceService: PracticeService,
              private authService: AuthService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.getId();
    this.getQuestions();
    this.getCurrentUser();
    this.startTimer();
  }

  getId() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  getQuestions() {
    this.questionService.getByPracticeId(this.id).subscribe((response: IResponse) => {
      const questions = response.data;
      this.practice = response.practice;
      $.each(questions, (i, question) => {
        this.questions.push(new Question(question.question));
      });
    });
  }

  onSelect(question: any, option: any) {
    option.selected = (option.selected) ? 0 : 1;
  }

  initFormData() {
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.questions));
    formData.append('practice_id', this.id);
    formData.append('currentUser', this.currentUser.id);
    return formData;
  }

  getCurrentUser() {
    this.authService.getUser().subscribe((response: IResponse) => {
      this.currentUser = response.data;
    });
  }

  onSubmit() {
    this.practiceService.submitResult(this.initFormData()).subscribe((response: IResponse) => {
      this.router.navigate(['/practice', response.data.id, 'result']);
    }, error => {
      console.log(error);
    });
  }

  goBack() {
    window.history.back();
  }

  displayTimeElapsed() {
    return Math.floor(this.seconds / 60) + 'm: ' + Math.floor(this.seconds % 60) + 's';
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.minusSecond();
      localStorage.setItem('seconds', this.seconds.toString());
    }, 1000);
  }

  minusSecond() {
    if (this.seconds <= 0) {
      clearInterval(this.timer);
      this.onSubmit();
    } else {
      this.seconds--;
    }
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
