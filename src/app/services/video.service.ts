import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

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
    return this.http.get(this.apiUrl + '/videos', {headers: this.header});
  }

  create(data) {
    return this.http.post(this.apiUrl + '/videos', data, {headers: this.header});
  }

  show(id) {
    return this.http.get(this.apiUrl + '/videos/' + id, {headers: this.header});
  }

  update(data, id) {
    return this.http.put(this.apiUrl + '/videos/' + id, data, {headers: this.header});
  }

  delete(id) {
    return this.http.delete(this.apiUrl + '/videos/' + id, {headers: this.header});
  }

  uploadImage(data: FormData) {
    return this.http.post(this.apiUrl + '/images', data, {headers: this.header});
  }

  getVideos(catevideo_id) {
    return this.http.get(this.apiUrl + '/videos/' + catevideo_id + "/getVideos", {headers: this.header});
  }
}
