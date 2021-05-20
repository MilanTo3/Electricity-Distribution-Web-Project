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

  getAllBasicInfo(){
    
    return this.http.get('http://localhost:24885/api/WorkRequest/getAllBasicInfo');
  }

  sendAttachments(files){
    
    return this.http.post('http://localhost:24885/api/WorkRequest/sendAttachments', files);
  }

  getBasicInformation(id) {
    return this.http.get('http://localhost:24885/api/WorkRequest/getBasicInfo?id='+id);
  }

  getHistoryState(id) {
    return this.http.get('http://localhost:24885/api/WorkRequest/getHistory?id='+id);
  }

  getAttachments(id){
    return this.http.get('http://localhost:24885/api/WorkRequest/getAttachments?id='+id);
  }

  updateBasicInfo(formdata, wrId){
    return this.http.post('http://localhost:24885/api/WorkRequest/updateBasicInfo', { basicInfo: formdata, id: wrId });
  }

  updateHistoryState(formdata, wrId){
    return this.http.post('http://localhost:24885/api/WorkRequest/updateHistory', { historyInfo: formdata, id: wrId });
  }
}