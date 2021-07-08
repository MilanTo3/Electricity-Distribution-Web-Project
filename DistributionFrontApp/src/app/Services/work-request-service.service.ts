import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HistoryStateChange } from '../Models/HistoryStateChange.model';

@Injectable({
  providedIn: 'root'
})
export class WorkRequestServiceService {

  constructor(private http: HttpClient) { }

  postWorkRequest(formdata){
    
    return this.http.post('http://localhost:24757/DocApp/WorkRequest/postRequest', formdata);
  }

  getAllBasicInfo(){
    
    return this.http.get('http://localhost:24757/DocApp/WorkRequest/getAllBasicInfo');
  }
  getMineBasicInfo(){
    let username: string = (JSON.parse(sessionStorage.getItem('loggedUser'))).username;
    return this.http.get('http://localhost:24757/DocApp/WorkRequest/getMyBasicInfo?username='+username);

  }
  getBasicInformation(id) {
    return this.http.get('http://localhost:24757/DocApp/WorkRequest/getBasicInfo?id='+id);
  }

  getHistoryState(id) {
    return this.http.get('http://localhost:24757/DocApp/WorkRequest/getHistory?id='+id);
  }

  getAttachments(id){
    return this.http.get('http://localhost:24757/DocApp/WorkRequest/getAttachments?id='+id);
  }

  updateBasicInfo(formdata){
    return this.http.post('http://localhost:24757/DocApp/WorkRequest/updateBasicInfo', formdata);
  }

  updateHistoryState(formdata: HistoryStateChange[], wrId){
    formdata.forEach(x => x.documentId = wrId);
    return this.http.post('http://localhost:24757/DocApp/WorkRequest/updateHistory', formdata);
  }

  updateAttachments(formdata){
    return this.http.post('http://localhost:24757/DocApp/WorkRequest/UpdateAttachments', formdata);
  }

  getStatus(idDoc){
    return this.http.get('http://localhost:24757/DocApp/WorkRequest/getDocStatus?id='+idDoc);
  }
  getCreator(idDoc){
    return this.http.get('http://localhost:24757/DocApp/WorkRequest/getCreator?id='+idDoc, {responseType:'text'});
  }
}
