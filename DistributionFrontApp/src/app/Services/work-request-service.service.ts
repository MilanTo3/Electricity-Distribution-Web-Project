import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HistoryStateChange } from '../Models/HistoryStateChange.model';

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
  getMineBasicInfo(){
    return this.http.get('http://localhost:24885/api/WorkRequest/getMyBasicInfo');

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

  updateBasicInfo(formdata){
    return this.http.post('http://localhost:24885/api/WorkRequest/updateBasicInfo', formdata);
  }

  updateHistoryState(formdata: HistoryStateChange[], wrId){
    formdata.forEach(x => x.documentId = wrId);
    return this.http.post('http://localhost:24885/api/WorkRequest/updateHistory', formdata);
  }

  updateAttachments(formdata){
    return this.http.post('http://localhost:24885/api/WorkRequest/UpdateAttachments', formdata);
  }

  getStatus(idDoc){
    return this.http.get('http://localhost:24885/api/WorkRequest/getDocStatus?id='+idDoc);
  }
}
