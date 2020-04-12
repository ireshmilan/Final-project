import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class Services {

    private serverUrl: string ='http://localhost:8383';
    
    private serverUrl2: string ='http://localhost:7676';


    constructor(private http: HttpClient) {
        this.http = http;
    }

    saveCarDetails(data):Observable<any>{
        console.log('SERVICE');
        console.log(data);
        return this.http.post( this.serverUrl +'/service/save',data)
        // .pipe(map())
    
    }

    saveCustomerOwnerDetails(customer){
        return this.http.post(this.serverUrl2 +'/save',customer)
    }

    saveRentDetails(rent){
        return this.http.post(this.serverUrl + '/service/save',rent)
    }
    getAllCars(){
        return this.http.get( this.serverUrl +'/service/findAllCars');
    }
    getUsers(){
        return this.http.get( this.serverUrl2 +'/get')
    }
    getUsersById(id){
        return this.http.get(this.serverUrl2 + `/service/get/${id}`)
    }
    updateUsers(userData) {

        return this.http.put(this.serverUrl2 + '/service/update', userData);
      }
      getUsersByActivity(){
        return this.http.get(this.serverUrl2 + '/getActive')
    }


}