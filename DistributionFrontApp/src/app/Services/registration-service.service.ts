import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(formdata: FormData) {
    return this.http.post('http://localhost:24885/api/ApplicationUser/Login', formdata);
  }

  register(formdata: FormData) {
    return this.http.post('http://localhost:24885/api/ApplicationUser/Register', formdata, { responseType: 'text' });
  }

  getPendingUsers() {
    return this.http.get('http://localhost:24885/api/ApplicationUser/getPendingUsers');
  }

  getUserProfile() {
    return this.http.get('http://localhost:24885/api/ApplicationUser/getUserProfile');
  }

  getProfileImg(username) {
    
    return this.http.get('http://localhost:24885/api/ApplicationUser/getProfileImg?username='+username, {reportProgress: true, responseType: 'blob'});
  }

}
