import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getDefaultSettings(){
    return this.http.get('http://localhost:24757/NotifApp/Settings/GetDefaultSettings');
  }
  getCurrentSettings(){
    return this.http.get('http://localhost:24757/NotifApp/Settings/GetCurrentSettings');
  }

  updateSettings(formdata: FormData){
    return this.http.post('http://localhost:24757/NotifApp/Settings/UpdateSettings',formdata);
  }

  deleteSettings(id){
    return this.http.post('http://localhost:24757/NotifApp/Settings/Delete',id);

  }

}
