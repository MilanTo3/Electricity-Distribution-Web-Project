import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

    constructor(private http: HttpClient) { }

    AddDevice(formData) {
        return this.http.post('http://localhost:24757/DocApp/Device/AddDevice', formData);
    }
    GetDevice(id) {
      return this.http.get('http://localhost:24757/DocApp/Device/GetDevice?id=' + id);
     }
    GetDevices() {
      return this.http.get('http://localhost:24757/DocApp/Device/GetDevices');
    }
    GetDevicesAtLocation(street) {
      return this.http.get('http://localhost:24757/DocApp/Device/GetDevicesAtLocation?location=' + street);
    }
    DeleteDevice(id) {
      return this.http.post('http://localhost:24757/DocApp/Device/DeleteDevice', id);
    }
    GetConnectedDevices(documentId) {
      return this.http.get('http://localhost:24757/DocApp/Device/GetConnectedDevices?documentId=' + documentId);
    }
    SearchDevices(address, type) {
      return this.http.get('http://localhost:24757/DocApp/Device/SearchDevices?address=' + address + '&type=' + type);
    }



    
}