import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

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

  index() {
    return this.http.get(this.apiUrl + '/stories', {headers: this.header});
  }

  create(data) {
    return this.http.post(this.apiUrl + '/stories', data, {headers: this.header});
  }

  show(id) {
    return this.http.get(this.apiUrl + '/stories/' + id, {headers: this.header});
  }

  update(data, id) {
    return this.http.put(this.apiUrl + '/stories/' + id, data, {headers: this.header});
  }

  delete(id) {
    return this.http.delete(this.apiUrl + '/stories/' + id, {headers: this.header});
  }

  uploadImage(data: FormData) {
    return this.http.post(this.apiUrl + '/images', data, {headers: this.header});
  }
}
