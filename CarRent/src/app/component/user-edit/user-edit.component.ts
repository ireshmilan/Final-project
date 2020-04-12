import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Services } from 'src/app/services/Services';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id:any;
  userEdit:FormGroup;
  submitted = false;
  selectValue:any;

  gender = [ 'Male', 'Female'];

  constructor(private services:Services,
    private route:ActivatedRoute,
    private formBuilder:FormBuilder) { }

  ngOnInit() {
this.userEdit = this.formBuilder.group({
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
  password:[''],
  joinedDate:['']
  
});
this.displayValueForm()
  }


  displayValueForm(){
    this.id = (this.route.snapshot.paramMap.get('id'));
    
    this.services.getUsersById(this.id).subscribe(
      data=>{
        this.userEdit.controls['firstName'].setValue(data[0].firstName);
        this.userEdit.controls['lastName'].setValue(data[0].lastName);
        this.userEdit.controls['email'].setValue(data[0].email);
        this.userEdit.controls['idCard'].setValue(data[0].idCardNumber);
        this.userEdit.controls['birthDay'].setValue(data[0].dateOfBirth);
        this.userEdit.controls['gender'].setValue(data[0].gender);
        this.userEdit.controls['no'].setValue(data[0].address.no);
        this.userEdit.controls['lane'].setValue(data[0].address.lane);
        this.userEdit.controls['city'].setValue(data[0].address.city);
        this.userEdit.controls['telephone1'].setValue(data[0].telephone[0].telephone);
        this.userEdit.controls['telephone2'].setValue(data[0].telephone[1].telephone);
        this.userEdit.controls['username'].setValue(data[0].username);
        this.userEdit.controls['password'].setValue(data[0].password);
        this.userEdit.controls['joinedDate'].setValue(data[0].joinedDate);
      },
      error=>{
        console.log(error);
      },
      ()=>{
        console.log('complete');
      }
      
    );
  }




  get controlerData() {
    return this.userEdit.controls;
  }

  uploadSubmit() {
    this.submitted = true;

    if (this.userEdit.valid) {
      let userData = {
        "id": this.id,
        "firstName": this.controlerData.firstName.value,
        "lastName": this.controlerData.lastName.value,
        "email": this.controlerData.email.value,
        "gender": this.controlerData.gender.value,
        "dateOfBirth": this.controlerData.birthDay.value,
        "idCardNumber": this.controlerData.idCard.value,
        
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
            this.userEdit.reset();
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
