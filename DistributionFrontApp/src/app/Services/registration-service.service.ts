import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(formdata: FormData) {
    return this.http.post('http://localhost:24757/UserApp/ApplicationUser/Login', formdata);
  }

  register(formdata: FormData) {
    return this.http.post('http://localhost:24757/UserApp/ApplicationUser/Register', formdata, { responseType: 'text' });
  }
  updatePassword(formdata: FormData)
  {
    console.log(formdata);
    return this.http.post('http://localhost:24757/UserApp/ApplicationUser/ChangePassword', formdata);
  }
  approveOrDenyRequest(formdata){
    return this.http.post('http://localhost:24757/UserApp/ApplicationUser/approveOrDenyRequest', formdata);
  }

  updateUserRole(role)
  {
    return this.http.get('http://localhost:24757/UserApp/ApplicationUser/ChangeRole?role='+ role);
  }
  getPendingUsers() {
    return this.http.get<User[]>('http://localhost:24757/UserApp/ApplicationUser/getPendingUsers');
  }

  getUserProfile() {
    return this.http.get('http://localhost:24757/UserApp/ApplicationUser/getUserProfile');
  }

  deleteUserProfile(username:string){
    return this.http.get('http://localhost:24757/UserApp/ApplicationUser/deleteProfile?username=' + username);

  }
  updateUserProfile(formdata: FormData) {
    return this.http.put('http://localhost:24757/UserApp/ApplicationUser/updateProfile', formdata, { responseType: 'text' });
  }
  getProfileImg(username) {
    
    return this.http.get('http://localhost:24757/UserApp/ApplicationUser/getProfileImg?username='+username, {reportProgress: true, responseType: 'blob'});
  }
  registerSocialMedia(formdata){
    return this.http.post('http://localhost:24757/UserApp/ApplicationUser/registerSocialMedia', formdata);
  }
  getUserData(accessToken){
    return this.http.get(`http://graph.facebook.com/me?fields=name,location,picture,birthday,email&access_token=${accessToken}`);
  }
  getRoleRequests()
  {
    return this.http.get<User[]>('http://localhost:24757/UserApp/ApplicationUser/GetRoleRequests');

  }
  approveOrDenyRoleRequest(formdata){
    return this.http.post('http://localhost:24757/UserApp/ApplicationUser/ApproveOrDenyRole', formdata);
  }
  getUser(username)
  {
    return this.http.get('http://localhost:24757/UserApp/ApplicationUser/GetUser?username='+ username);
  }
}
