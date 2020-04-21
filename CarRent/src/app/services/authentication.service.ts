import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient:HttpClient) { }

  authenticate(formData) {
    const headers=new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
      return this.httpClient.post<any>('http://localhost:7676/authenticate',formData,{headers: headers}).pipe(
     map(
       userData => {
      // sessionStorage.setItem('username',username);
        sessionStorage.setItem('token', 'Bearer '+userData.token)
        console.log("dddddddddddddddddddddddddddddddd"+userData.token)
        return true;
       } 
     )

    );
  }

 
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}

