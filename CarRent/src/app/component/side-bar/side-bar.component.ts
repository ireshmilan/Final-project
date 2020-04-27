import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  private currentUserSubject : BehaviorSubject<User>;
  public currentUser : Observable<User>;
  userNameDispay :any;
 isAdmin
  constructor(private router:Router, private authService:AuthenticationService) {
    this.isAdmin = AuthenticationService.isAdmin();
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log(this.currentUserSubject.value.userName);
   }

  ngOnInit() {
    this.userNameDispay = this.currentUserSubject.value.firstName;
  }

}
