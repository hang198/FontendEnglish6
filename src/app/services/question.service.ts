import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiUrl: string;
  header: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.setApiUrl();
    this.setHeader();
  }
  setApiUrl() {
    this.apiUrl = env.apiUrl;
  }

  setHeader() {
    this.header = this.authService.getHeader();
  }

  getAll() {
    return this.http.get(this.apiUrl + '/questions', {headers: this.header});
  }

  getByID(id) {
    return this.http.get(this.apiUrl + '/questions/' + id, {headers: this.header});
  }
  getByPracticeId(id) {
    return this.http.get(this.apiUrl + '/questions/practice/' + id, {headers: this.header});
  }

  create(data) {
    return this.http.post(this.apiUrl + '/questions/create', data, {headers: this.header});
  }

  delete(questionId: number) {
    return this.http.delete(this.apiUrl + '/questions/delete/' + questionId, {headers: this.header});
  }

  update(data, id) {
    return this.http.post(this.apiUrl + '/questions/update/' + id, data, {headers: this.header});
  }
}
