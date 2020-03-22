import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  private serverUrl: string = 'http://localhost:8383';

  constructor(private http: HttpClient) {

  }

  getAllCars() {
    return this.http.get(this.serverUrl + '/service/findAllCars');
  }
  updateAllCars(carsData) {
    console.log(carsData)
    return this.http.put(this.serverUrl + '/service/update', carsData);
  }
  getById(id){
    return this.http.get(this.serverUrl+`/service/findAllCars/${id}`)
  }

}
