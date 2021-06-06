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
    
    return this.http.post('http://localhost:24885/api/WorkPlan/postRequest', formdata);
  }

  
  getAllBasicInfo(){
    
    return this.http.get('http://localhost:24885/api/WorkPlan/GetAllBasicInfo');
  }
  getMineBasicInfo(){
    return this.http.get('http://localhost:24885/api/WorkPlan/GetMyBasicInfo');

  }
  getBasicInformation(id) {
    return this.http.get('http://localhost:24885/api/WorkPlan/GetBasicInfo?id='+id);
  }

  getHistoryState(id) {
    return this.http.get('http://localhost:24885/api/WorkPlan/GetHistory?id='+id);
  }

  getAttachments(id){
    return this.http.get('http://localhost:24885/api/WorkPlan/GetAttachments?id='+id);
  }
  getSwitchingInstructionsWP(id) {
    return this.http.get('http://localhost:24885/api/WorkPlan/GetSwitchingInstructionsWP?id='+id);
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

  updateSwitchingInstructions(formdata : SwitchingInstruction[], wpId)
  {
    formdata.forEach(x => x.documentId = wpId);
    return this.http.post('http://localhost:24885/api/WorkPlan/UpdateInstructions', formdata);
  }
  
  getStatus(idDoc){
    return this.http.get('http://localhost:24885/api/WorkPlan/getDocStatus?id='+idDoc);
  }

  getCreator(idDoc){
    return this.http.get('http://localhost:24885/api/WorkPlan/getCreator?id='+idDoc, {responseType:'text'});
  }
}
