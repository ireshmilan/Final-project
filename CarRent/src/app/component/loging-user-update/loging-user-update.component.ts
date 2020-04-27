import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Services } from 'src/app/services/Services';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-loging-user-update',
  templateUrl: './loging-user-update.component.html',
  styleUrls: ['./loging-user-update.component.css']
})
export class LogingUserUpdateComponent implements OnInit {

  id:any;
  loginUserUpdate:FormGroup;
  submitted = false;
  selectValue:any;
  sites = [ "Active", "Inactive"];
  gender = [ 'Male', 'Female'];

  constructor(private services:Services,
    private route:ActivatedRoute,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit() {
this.loginUserUpdate = this.formBuilder.group({
  firstName:['',Validators.required],
  lastName:['',Validators.required],
  email:['',Validators.required],
  idCard:['',Validators.required],
  birthDay:['',Validators.required],
  gender:['',Validators.required],
  telephone1:['',Validators.required],
  telephone2:['',Validators.required],
  no:['',Validators.required],
  lane:['',Validators.required],
  city:['',Validators.required],
  username:[''],
  active : [''],
  password:[''],
  joinedDate:[''],
  role:[''],
  id:['']
  
});
this.displayValueForm()
  }


  displayValueForm(){
    //this.id = (this.route.snapshot.paramMap.get('id'));
    console.log("wqwddddddwqwqww",sessionStorage.getItem('user'));
  
   // this.userForm.patchValue({gender:'male', tc:true});
    // this.services.getUsersById(this.id).subscribe(
    //   data=>{
    //     console.log(data[0]);
        this.loginUserUpdate.controls['id'].setValue(JSON.parse(sessionStorage.getItem('user')).id);
        this.loginUserUpdate.controls['firstName'].setValue(JSON.parse(sessionStorage.getItem('user')).firstName);
      //  this.userEdit.controls['firstName'].setValue(data[0].firstName);
        this.loginUserUpdate.controls['lastName'].setValue(JSON.parse(sessionStorage.getItem('user')).lastName);
        this.loginUserUpdate.controls['email'].setValue(JSON.parse(sessionStorage.getItem('user')).email);
        this.loginUserUpdate.controls['idCard'].setValue(JSON.parse(sessionStorage.getItem('user')).idCardNumber);
        this.loginUserUpdate.controls['birthDay'].setValue(JSON.parse(sessionStorage.getItem('user')).dateOfBirth);
        this.loginUserUpdate.controls['gender'].setValue(JSON.parse(sessionStorage.getItem('user')).gender);
        this.loginUserUpdate.controls['no'].setValue(JSON.parse(sessionStorage.getItem('user')).address.no);
        this.loginUserUpdate.controls['lane'].setValue(JSON.parse(sessionStorage.getItem('user')).address.lane);
        this.loginUserUpdate.controls['city'].setValue(JSON.parse(sessionStorage.getItem('user')).address.city);
        this.loginUserUpdate.controls['telephone1'].setValue(JSON.parse(sessionStorage.getItem('user')).telephone[0].telephone);
        this.loginUserUpdate.controls['telephone2'].setValue(JSON.parse(sessionStorage.getItem('user')).telephone[1].telephone);
        this.loginUserUpdate.controls['username'].setValue(JSON.parse(sessionStorage.getItem('user')).username);
        this.loginUserUpdate.controls['password'].setValue(JSON.parse(sessionStorage.getItem('user')).password);
        this.loginUserUpdate.controls['joinedDate'].setValue(JSON.parse(sessionStorage.getItem('user')).joinedDate);
        this.loginUserUpdate.controls['active'].setValue(JSON.parse(sessionStorage.getItem('user')).activity);
        this.loginUserUpdate.controls['role'].setValue(JSON.parse(sessionStorage.getItem('user')).role);

    //   },
    //   error=>{
    //     console.log(error);
    //   },
    //   ()=>{
    //     console.log('complete');
    //   }
      
    // );
  }




  get controlerData() {
    return this.loginUserUpdate.controls;
  }

  uploadSubmit() {
    this.submitted = true;
    console.log('dsdaasdsa')
  console.log(this.controlerData.active.value);
    
    if (this.loginUserUpdate.valid) {
      let userData = {
        "id": this.controlerData.id.value,
        "firstName": this.controlerData.firstName.value,
        "lastName": this.controlerData.lastName.value,
        "email": this.controlerData.email.value,
        "gender": this.controlerData.gender.value,
        "dateOfBirth": this.controlerData.birthDay.value,
        "idCardNumber": this.controlerData.idCard.value,
        "activity" : Number(this.controlerData.active.value),

        
        "address": {
          "no": this.controlerData.no.value,
          "lane": this.controlerData.lane.value,
          "city": this.controlerData.city.value
          
        },

        "telephone": [
          {
            "telephone": this.controlerData.telephone1.value
          },
          {
            "telephone": this.controlerData.telephone2.value,
          }
        ],
        "username": this.controlerData.username.value,
        "password": this.controlerData.password.value,
        "joinedDate": this.controlerData.joinedDate.value,
        "role":this.controlerData.role.value
        
        
      }

      
      console.log('SUBMIT');
      console.log(userData);
      //image eka yane Sting eka


      //passing to service
      this.services.updateUsers(userData)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = false;
            this.loginUserUpdate.reset();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 2500
              
            })
            sessionStorage.setItem('user', JSON.stringify(response))
            this.router.navigate(['/dashBoard']);
          },
          error => {
            console.log(error);
            return;
          }
        )

    } else {
      return;
    }


  }
}
