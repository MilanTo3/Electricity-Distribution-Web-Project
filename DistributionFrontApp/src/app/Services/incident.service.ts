import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class IncidentService {

    constructor(private http: HttpClient) { }

    postIncident(formdata) {
        return this.http.post('http://localhost:24757/DocApp/Incident/postIncident', formdata);
    }

    getAllBasicInfo() {   
        return this.http.get('http://localhost:24757/DocApp/Incident/GetAllBasicInfo');
    }

    getMineBasicInfo() {
        let username: string = (JSON.parse(sessionStorage.getItem('loggedUser'))).username;
        return this.http.get('http://localhost:24757/DocApp/Incident/GetMyBasicInfo?username='+username);
    }

    getBasicInformation(id) {
        return this.http.get('http://localhost:24757/DocApp/Incident/GetBasicInfo?id=' + id);
    }

    getAttachments(id) { 
        return this.http.get('http://localhost:24757/DocApp/Incident/GetAttachments?id=' + id);
    }

    updateAttachments(formdata) {
        return this.http.post('http://localhost:24757/DocApp/Incident/UpdateAttachments', formdata);
    }

    getResolutionList(id) {
        return this.http.get('http://localhost:24757/DocApp/Incident/GetResolutionList?id='+id);
    }

    updateResolutionList(formdata) {
        return this.http.post('http://localhost:24757/DocApp/Incident/UpdateResolutionList', formdata);
    }

    updateBasicInfo(formdata){
        return this.http.post('http://localhost:24757/DocApp/Incident/UpdateBasicInfo', formdata);
    }


}