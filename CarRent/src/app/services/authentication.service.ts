import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(private httpClient:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
   }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  authenticate(formData) {
    const headers=new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
      return this.httpClient.post<any>('http://localhost:7676/authenticate',formData,{headers: headers}).pipe(
     map(
       userData => {
      // sessionStorage.setItem('username',username);
      
      sessionStorage.setItem('user', JSON.stringify(userData.user))
        sessionStorage.setItem('token', 'Bearer '+userData.token)
        console.log("dddddddddddddddddddddddddddddddd"+userData.user)
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
  userName(){
    let user = sessionStorage.getItem('username')
  }
}

