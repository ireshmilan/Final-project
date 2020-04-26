import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private serverUrl: string = 'http://localhost:8686';

  constructor(private http: HttpClient) {   
  }
  

  getAllRents() {
    return this.http.get(this.serverUrl + '/service/getAllRent');
  }
  getRentByRentId(id) {
    return this.http.get(this.serverUrl + `/service/findAllRents/${id}`)
  }
  update(rentData){
    return this.http.put(this.serverUrl + '/service/update', rentData);
  }
  getRentByCustomerId(id) {
    return this.http.get(this.serverUrl+ `/service/rent/${id}`)
  }
  getPreviousRentByCustomerId(id) {
    return this.http.get(this.serverUrl+ `/service/previousRent/${id}`)
  }

  cancel(rentData){
    return this.http.put(this.serverUrl + '/service/cancel', rentData);
  }
}
