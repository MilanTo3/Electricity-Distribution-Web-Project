import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  AddLocation(formdata){   
    return this.http.post('http://localhost:24757/DocApp/Location/AddLocation', formdata);
  }

  GetLocation(id) {
    return this.http.get('http://localhost:24757/DocApp/Location/'+id);
  }
  DeleteLocation(id){   
    return this.http.delete('http://localhost:24757/DocApp/Location/Delete/' +id );
  }

  UpdateLocation(formdata) {
    return this.http.put('http://localhost:24757/DocApp/Location/Update', formdata);
  }

  GetLocations() {
    return this.http.get('http://localhost:24757/DocApp/Location/GetLocations');
  }
}
