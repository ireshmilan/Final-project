import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class Services {

    private serverUrl: string = 'http://localhost:9923';
    
    private serverUrl2: string ='http://localhost:7676';

    private serverUrl3: string ='http://localhost:8686';
    
    register

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
        return this.http.post(this.serverUrl3 + '/service/save',rent)
    }
    
    getAllCars(){
        return this.http.get( this.serverUrl +'/service/findAllCars');
    }
    // getAllCars(){
    //     const headers= new HttpHeaders({
    //         'Content-Type' : 'application/json',
    //         'Authorization' : sessionStorage.getItem('token')
    //     })
    //     return this.http.get( this.serverUrl +'/service/findAllCars',{headers:headers});
    // }
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