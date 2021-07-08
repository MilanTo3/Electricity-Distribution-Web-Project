import { SwitchingInstruction } from './../Models/SwitchingInstruction.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HistoryStateChange } from '../Models/HistoryStateChange.model';

@Injectable({
  providedIn: 'root'
})
export class WorkPlanServiceService {

  constructor(private http: HttpClient) { }

  postWorkRequest(formdata){
    
    return this.http.post('http://localhost:24757/DocApp/WorkPlan/postRequest', formdata);
  }

  
  getAllBasicInfo(){
    
    return this.http.get('http://localhost:24757/DocApp/WorkPlan/GetAllBasicInfo');
  }
  getMineBasicInfo(){
    let username: string = (JSON.parse(sessionStorage.getItem('loggedUser'))).username;
    return this.http.get('http://localhost:24757/DocApp/WorkPlan/GetMyBasicInfo?username='+username);

  }
  getBasicInformation(id) {
    return this.http.get('http://localhost:24757/DocApp/WorkPlan/GetBasicInfo?id='+id);
  }

  getHistoryState(id) {
    return this.http.get('http://localhost:24757/DocApp/WorkPlan/GetHistory?id='+id);
  }

  getAttachments(id){
    return this.http.get('http://localhost:24757/DocApp/WorkPlan/GetAttachments?id='+id);
  }
  getSwitchingInstructionsWP(id) {
    return this.http.get('http://localhost:24757/DocApp/WorkPlan/GetSwitchingInstructionsWP?id='+id);
  }
  updateBasicInfo(formdata){
    return this.http.post('http://localhost:24757/DocApp/WorkPlan/updateBasicInfo', formdata);
  }

  updateHistoryState(formdata: HistoryStateChange[], wpId){
    formdata.forEach(x => x.documentId = wpId);
    return this.http.post('http://localhost:24757/DocApp/WorkPlan/updateHistory', formdata);
  }

  updateAttachments(formdata){
    return this.http.post('http://localhost:24757/DocApp/WorkPlan/UpdateAttachments', formdata);
  }

  updateSwitchingInstructions(formdata : SwitchingInstruction[], wpId)
  {
    formdata.forEach(x => x.documentId = wpId);
    return this.http.post('http://localhost:24757/DocApp/WorkPlan/UpdateInstructions', formdata);
  }
  
  getStatus(idDoc){
    return this.http.get('http://localhost:24757/DocApp/WorkPlan/getDocStatus?id='+idDoc);
  }

  getCreator(idDoc){
    return this.http.get('http://localhost:24757/DocApp/WorkPlan/getCreator?id='+idDoc, {responseType:'text'});
  }
}
