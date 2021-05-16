import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

    login(formdata: FormData){
      return this.http.post('http://localhost:24885/api/ApplicationUser/Login', formdata);
    }

    register(formdata: FormData){
        return this.http.post('http://localhost:24885/api/ApplicationUser/Register', formdata, { headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text'});
    }

    getPendingUsers(){
      return this.http.get('http://localhost:24885/api/ApplicationUser/getPendingUsers');
    }

    getUserProfile(){
      var tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + sessionStorage.getItem('token')});
      return this.http.get('http://localhost:24885/api/ApplicationUser/getUserProfile', {headers: tokenHeader});
    }
}
