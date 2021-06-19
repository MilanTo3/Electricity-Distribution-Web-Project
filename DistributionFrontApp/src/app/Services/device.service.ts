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
    GetDevice(id) {
      return this.http.get('http://localhost:24885/api/Device/GetDevice?id=' + id);
     }
    GetDevices() {
      return this.http.get('http://localhost:24885/api/Device/GetDevices');
    }
    GetDevicesAtLocation(street) {
      return this.http.get('http://localhost:24885/api/Device/GetDevicesAtLocation?location=' + street);
    }
    DeleteDevice(id) {
      return this.http.post('http://localhost:24885/api/Device/DeleteDevice', id);
    }



    
}