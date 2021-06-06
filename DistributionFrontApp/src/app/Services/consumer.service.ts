import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  constructor(private http: HttpClient) { }

  AddConsumer(formdata){   
    return this.http.post('http://localhost:24885/api/Consumer/AddConsumer', formdata);
  }

  GetConsumer(username) {
    return this.http.get('http://localhost:24885/api/Consumer/GetConsumer?username='+ username);
  }
  DeleteConsumer(username){   
    return this.http.get('http://localhost:24885/api/Consumer/Delete?username =' +username );
  }

  UpdateConsumer(formdata) {
    return this.http.post('http://localhost:24885/api/Consumer/Update', formdata);
  }

  GetConsumers() {
    return this.http.get('http://localhost:24885/api/Consumer/GetConsumers');
  }
}