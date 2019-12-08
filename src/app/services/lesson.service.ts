import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  apiUrl: string;
  headers: HttpHeaders;

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
    return this.http.get(this.apiUrl + '/lessons', {headers: this.headers});
  }

  create(data) {
    return this.http.post(this.apiUrl + '/lessons/create', data, {headers: this.headers});
  }

  delete(id) {
    return this.http.delete(this.apiUrl + '/lessons/' + id + '/delete', {headers: this.headers});
  }

  getById(id: string) {
    return this.http.get(this.apiUrl + '/lessons/' + id, {headers: this.headers});
  }

  update(data, id) {
    return this.http.post(this.apiUrl + '/lessons/' + id + '/update', data, {headers: this.headers});
  }
  getByUnitID(id: string) {
    return this.http.get(this.apiUrl + '/units/' + id, {headers: this.headers});
  }
}
