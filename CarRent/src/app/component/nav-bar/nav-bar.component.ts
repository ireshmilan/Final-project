import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/_model/user';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private currentUserSubject : BehaviorSubject<User>;
  public currentUser : Observable<User>;
  userNameDispay :any;

  constructor(private router:Router, private authService:AuthenticationService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log(this.currentUserSubject.value.userName);
   }
 


  btnClick= function () {
    this.router.navigateByUrl('/logUserUpdate');
};
 
  ngOnInit() {
      console.log(this.currentUserSubject.value);

      this.userNameDispay = this.currentUserSubject.value.firstName;
      
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate([''])
  }



}
