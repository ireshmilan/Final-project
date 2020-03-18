import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class Services {

    private serverUrl: string ='http://localhost:8383';

    private serverUrl2: string ='http://localhost:7676';



    constructor(private http: HttpClient) {
        this.http = http;
    }

    saveCarDetails(car){
        return this.http.post( this.serverUrl +'/service/save',car);
    }

    saveCustomerOwnerDetails(customer){
        return this.http.post(this.serverUrl2 +'/service/save',customer)
    }

    saveRentDetails(rent){
        return this.http.post(this.serverUrl + '/service/save',rent)
    }
    getAllCars(){
        return this.http.get( this.serverUrl +'/service/findAllCars');
    }
    getOwners(){
        return this.http.get( this.serverUrl2 +'/service/get')
    }

}