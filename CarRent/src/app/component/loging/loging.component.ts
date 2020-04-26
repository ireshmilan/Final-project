import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Services } from 'src/app/services/Services';

@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent implements OnInit {
  
  submitted = false;
  returnUrl: string;
  invalidLogin = false
  loginForm

  error =false;

  constructor(private router:Router,
    private authenticationService:AuthenticationService,
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private services:Services
    ) {
      this.loginForm = this.formBuilder.group({
        username : '',
        password : ''
      });
     }

  ngOnInit():void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password:['',Validators.required]
  });
  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  get controlerData() {
    return this.loginForm.controls;
  }


  login(data) {
    this.submitted = true;
    this.authenticationService.authenticate(JSON.stringify(data)).
    subscribe(
      res=>{
      console.log("response",res);


     
      this.router.navigate(['/dashBoard']);
    },
    error=>{
      console.log(error);
    }
    )
  
  }

  

}



