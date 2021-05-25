import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

    constructor(private http: HttpClient) { }

    AddDevice(formData) {
        return this.http.post('http://localhost:24885/api/Device/AddDevice', formData);
    }

    
}