import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/User.model';

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
  updatePassword(formdata: FormData)
  {
    console.log(formdata);
    return this.http.post('http://localhost:24885/api/ApplicationUser/ChangePassword', formdata);
  }
  approveOrDenyRequest(formdata){
    return this.http.post('http://localhost:24885/api/ApplicationUser/approveOrDenyRequest', formdata);
  }

  getPendingUsers() {
    return this.http.get<User[]>('http://localhost:24885/api/ApplicationUser/getPendingUsers');
  }

  getUserProfile() {
    return this.http.get('http://localhost:24885/api/ApplicationUser/getUserProfile');
  }

  deleteUserProfile(username:string){
    return this.http.get('http://localhost:24885/api/ApplicationUser/deleteProfile?username=' + username);

  }
  updateUserProfile(formdata: FormData) {
    return this.http.put('http://localhost:24885/api/ApplicationUser/updateProfile', formdata, { responseType: 'text' });
  }
  getProfileImg(username) {
    
    return this.http.get('http://localhost:24885/api/ApplicationUser/getProfileImg?username='+username, {reportProgress: true, responseType: 'blob'});
  }
  registerSocialMedia(formdata){
    return this.http.post('http://localhost:24885/api/ApplicationUser/registerSocialMedia', formdata);
  }
  getUserData(accessToken){
    return this.http.get(`http://graph.facebook.com/me?fields=name,location,picture,birthday,email&access_token=${accessToken}`);
  }

}
