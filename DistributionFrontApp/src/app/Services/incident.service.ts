import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class IncidentService {

    constructor(private http: HttpClient) { }

    postIncident(formdata) {
        return this.http.post('http://localhost:24885/api/Incident/postIncident', formdata);
    }

    getAllBasicInfo() {   
        return this.http.get('http://localhost:24885/api/Incident/GetAllBasicInfo');
    }

    getMineBasicInfo() {
        return this.http.get('http://localhost:24885/api/Incident/GetMyBasicInfo');
    }

    getBasicInformation(id) {
        return this.http.get('http://localhost:24885/api/Incident/GetBasicInfo?id=' + id);
    }

    getAttachments(id) { 
        return this.http.get('http://localhost:24885/api/Incident/GetAttachments?id=' + id);
    }

    updateAttachments(formdata) {
        return this.http.post('http://localhost:24885/api/Incident/UpdateAttachments', formdata);
    }

    getResolutionList(id) {
        return this.http.get('http://localhost:24885/api/Incident/GetResolutionList?id='+id);
    }

    updateResolutionList(formdata) {
        return this.http.post('http://localhost:24885/api/Incident/UpdateResolutionList', formdata);
    }




}