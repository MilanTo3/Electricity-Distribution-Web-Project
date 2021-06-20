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


}