import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkRequestServiceService {

  constructor(private http: HttpClient) { }

  postWorkRequest(formdata){
    
    return this.http.post('http://localhost:24885/api/WorkRequest/postRequest', formdata);
  }

  sendAttachments(files){
    
    return this.http.post('http://localhost:24885/api/WorkRequest/sendAttachments', files);
  }

  getBasicInformation(id) {
    return this.http.get('http://localhost:24885/api/WorkRequest/getBasicInformation?id='+id);
  }

  getHistoryState(id) {
    return this.http.get('http://localhost:24885/api/WorkRequest/getHistoryState?id='+id);
  }
}
