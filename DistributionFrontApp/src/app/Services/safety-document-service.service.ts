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
    
    return this.http.post('http://localhost:24757/DocApp/SafetyDocs/postDoc', formdata);
  }

  updateBasicInfo(formdata){
    return this.http.post('http://localhost:24757/DocApp/SafetyDocs/updateBasicInfo', formdata);
  }

  getBasicInformation(id) {
    return this.http.get('http://localhost:24757/DocApp/SafetyDocs/GetBasicInfo?id=' + id);
  }

  getCreator(idDoc){
    return this.http.get('http://localhost:24757/DocApp/SafetyDocs/getCreator?id='+idDoc, {responseType:'text'});
  }

  getStatus(idDoc){
    return this.http.get('http://localhost:24757/DocApp/SafetyDocs/getDocStatus?id='+idDoc);
  }

  updateHistoryState(formdata: HistoryStateChange[], sdId){
    formdata.forEach(x => x.documentId = sdId);
    return this.http.post('http://localhost:24757/DocApp/SafetyDocs/updateHistory', formdata);
  }

  getAllBasicInfo(){
    
    return this.http.get('http://localhost:24757/DocApp/SafetyDocs/GetAllBasicInfo');
  }

  getMineBasicInfo(){
    let username: string = (JSON.parse(sessionStorage.getItem('loggedUser'))).username;
    return this.http.get('http://localhost:24757/DocApp/SafetyDocs/GetMyBasicInfo?username='+username);
  }

  getAttachments(id){
    return this.http.get('http://localhost:24757/DocApp/SafetyDocs/GetAttachments?id='+id);
  }

  getCheckList(id) {
    return this.http.get('http://localhost:24757/DocApp/SafetyDocs/GetCheckList?id='+id);
  }

  updateCheckList(formdata)
  {

    return this.http.post('http://localhost:24757/DocApp/SafetyDocs/updateCheckList', formdata);
  }

  updateAttachments(formdata){
    return this.http.post('http://localhost:24757/DocApp/SafetyDocs/UpdateAttachments', formdata);
  }

}
