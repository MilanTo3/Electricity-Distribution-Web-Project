import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HistoryStateChange } from '../Models/HistoryStateChange.model';
import { MySafetyDoc } from '../Models/MySafetyDoc.model';

@Injectable({
  providedIn: 'root'
})
export class SafetyDocumentServiceService {

  constructor(private http: HttpClient) { }

  postSafetyDoc(formdata){
    
    return this.http.post('http://localhost:24885/api/SafetyDocs/postDoc', formdata);
  }

  updateBasicInfo(formdata){
    return this.http.post('http://localhost:24885/api/SafetyDocs/updateBasicInfo', formdata);
  }

  getBasicInformation(id) {
    return this.http.get('http://localhost:24885/api/SafetyDocs/GetBasicInfo?id=' + id);
  }

  getCreator(idDoc){
    return this.http.get('http://localhost:24885/api/SafetyDocs/getCreator?id='+idDoc, {responseType:'text'});
  }

  getStatus(idDoc){
    return this.http.get('http://localhost:24885/api/SafetyDocs/getDocStatus?id='+idDoc);
  }

  updateHistoryState(formdata: HistoryStateChange[], sdId){
    formdata.forEach(x => x.documentId = sdId);
    return this.http.post('http://localhost:24885/api/SafetyDocs/updateHistory', formdata);
  }

  getAllBasicInfo(){
    
    return this.http.get('http://localhost:24885/api/SafetyDocs/GetAllBasicInfo');
  }

  getMineBasicInfo(){
    return this.http.get('http://localhost:24885/api/SafetyDocs/GetMyBasicInfo');
  }

  getAttachments(id){
    return this.http.get('http://localhost:24885/api/SafetyDocs/GetAttachments?id='+id);
  }

  getCheckList(id) {
    return this.http.get('http://localhost:24885/api/SafetyDocs/GetCheckList?id='+id);
  }

  updateCheckList(formdata : MySafetyDoc[], sdId)
  {
    formdata.forEach(x => x.documentId = sdId);
    return this.http.post('http://localhost:24885/api/SafetyDocs/UpdateCheckList', formdata);
  }

}
