import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {

  apiUrl: string;
  headers: HttpHeaders;
  userId;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.setHeaders();
    this.setApiUrl();
    this.getAll();
  }

  setApiUrl() {
    this.apiUrl = env.apiUrl;
  }

  setHeaders() {
    this.headers = this.auth.getHeader();
  }

  getAll() {
    return this.http.get(this.apiUrl + '/practices', {headers: this.headers});
  }

  create(data) {
    return this.http.post(this.apiUrl + '/practices/create', data, {headers: this.headers});
  }

  delete(id) {
    return this.http.delete(this.apiUrl + '/practices/' + id + '/delete', {headers: this.headers});
  }

  getById(id: string) {
    return this.http.get(this.apiUrl + '/practices/' + id, {headers: this.headers});
  }

  update(data, id) {
    return this.http.post(this.apiUrl + '/practices/' + id + '/update', data, {headers: this.headers});
  }
  getByLessonID(id: string) {
    return this.http.get(this.apiUrl + '/practices/' + id, {headers: this.headers});
  }
  submitResult(data: any) {
    return this.http.post(this.apiUrl + '/practices/point/create', data, {headers: this.headers});
  }

  getResult(id) {
    return this.http.get(this.apiUrl + '/practices/point/' + id, {headers: this.headers});
  }

  getByUserID(id: string) {
    return this.http.get(this.apiUrl + '/users/' + id, {headers: this.headers});
  }

  getUserByPracticeId(id: string) {
    return this.http.get(this.apiUrl + '/practices/' + id + '/point', {headers: this.headers});
  }

  getPointsMax(id) {
    return this.http.get(this.apiUrl + '/points/' + id + '/user', {headers: this.headers});
  }

  getPointsByPracticeSort(id) {
    return this.http.get(this.apiUrl + '/points/' + id + '/practice-sort', {headers: this.headers});
  }

  getPointsByPracticeTime(id) {
    return this.http.get(this.apiUrl + '/points/' + id + '/practice-time', {headers: this.headers});
  }

  getPointsByTime(id) {
    return this.http.get(this.apiUrl + '/points/' + id + '/time', {headers: this.headers});
  }
  setId(id) {
    this.userId = id;
  }
  getID() {
    return this.userId;
  }
}
