import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HistoryStateChange } from '../Models/HistoryStateChange.model';

@Injectable({
  providedIn: 'root'
})
export class WorkPlanServiceService {

  constructor(private http: HttpClient) { }

  postWorkRequest(formdata){
    
    return this.http.post('http://localhost:24885/api/WorkPlan/postRequest', formdata);
  }

  
  getAllBasicInfo(){
    
    return this.http.get('http://localhost:24885/api/WorkPlan/getAllBasicInfo');
  }

  getBasicInformation(id) {
    return this.http.get('http://localhost:24885/api/WorkPlan/getBasicInfo?id='+id);
  }

  getHistoryState(id) {
    return this.http.get('http://localhost:24885/api/WorkPlan/getHistory?id='+id);
  }

  getAttachments(id){
    return this.http.get('http://localhost:24885/api/WorkPlan/getAttachments?id='+id);
  }

  updateBasicInfo(formdata){
    return this.http.post('http://localhost:24885/api/WorkPlan/updateBasicInfo', formdata);
  }

  updateHistoryState(formdata: HistoryStateChange[], wpId){
    formdata.forEach(x => x.documentId = wpId);
    return this.http.post('http://localhost:24885/api/WorkPlan/updateHistory', formdata);
  }

  updateAttachments(formdata){
    return this.http.post('http://localhost:24885/api/WorkPlan/UpdateAttachments', formdata);
  }
}
