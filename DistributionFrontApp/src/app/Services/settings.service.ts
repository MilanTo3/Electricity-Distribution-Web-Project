import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getDefaultSettings(){
    return this.http.get('http://localhost:24885/api/Settings/GetDefaultSettings');
  }
  getCurrentSettings(){
    return this.http.get('http://localhost:24885/api/Settings/GetCurrentSettings');
  }

  updateSettings(formdata: FormData){
    return this.http.post('http://localhost:24885/api/Settings/UpdateSettings',formdata);
  }

  deleteSettings(id){
    return this.http.post('http://localhost:24885/api/Settings/Delete',id);

  }

}
