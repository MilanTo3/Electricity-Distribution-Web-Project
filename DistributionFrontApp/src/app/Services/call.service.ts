import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private http: HttpClient) { }

  AddNewCall(formdata){   
    return this.http.post('http://localhost:24885/api/Call/AddNewCall', formdata);
  }

  GetCall(id) {
    return this.http.get('http://localhost:24885/api/Call/GetCall?id='+id);
  }
  DeleteCall(id){   
    return this.http.post('http://localhost:24885/api/Call/DeleteCall', id );
  }

  UpdateCall(formdata) {
    return this.http.put('http://localhost:24885/api/Call/UpdateCall', formdata);
  }

  GetCalls() {
    return this.http.get('http://localhost:24885/api/Call/GetCalls');
  }

  GetConnectedCalls(documentId) {
    return this.http.get('http://localhost:24885/api/Call/GetConnectedCalls?documentId=' + documentId);
  }
}
