import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {

  constructor(private http: HttpClient) { }

    register(formdata: FormData){
        return this.http.post('http://localhost:24885/api/ApplicationUser/Register', formdata, { headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text'});
    }

    getPendingUsers(){
      return this.http.get('http://localhost:24885/api/ApplicationUser/getPendingUsers');
    }
}
