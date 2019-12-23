import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CateStoryService {

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
    return this.http.get(this.apiUrl + '/catestory', {headers: this.header});
  }

  create(data) {
    return this.http.post(this.apiUrl + '/catestory', data, {headers: this.header});
  }

  show(id) {
    return this.http.get(this.apiUrl + '/catestory/' + id, {headers: this.header});
  }

  update(data, id) {
    return this.http.put(this.apiUrl + '/catestory/' + id, data, {headers: this.header});
  }

  delete(id) {
    return this.http.delete(this.apiUrl + '/catestory/' + id, {headers: this.header});
  }
}
