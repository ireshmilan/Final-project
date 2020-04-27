import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Services } from 'src/app/services/Services';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'util';
import Swal from 'sweetalert2'

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
  sites = [ "Active", "Inactive"];
  gender = [ 'Male', 'Female'];

  constructor(private services:Services,
    private route:ActivatedRoute,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit() {
this.userEdit = this.formBuilder.group({
  firstName:['',Validators.required],
  lastName:['',Validators.required],
  email:['',Validators.required],
  idCard:['',Validators.required],
  birthDay:['',Validators.required],
  gender:['',Validators.required],
  telephone1: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
  telephone2: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],

  no:['',Validators.required],
  lane:['',Validators.required],
  city:['',Validators.required],
  username:[''],
  active : [''],
  password:[''],
  joinedDate:[''],
  role:[''],

  
});
this.displayValueForm()
  }


  displayValueForm(){
    this.id = (this.route.snapshot.paramMap.get('id'));
   // this.userForm.patchValue({gender:'male', tc:true});
    this.services.getUsersById(this.id).subscribe(
      data=>{
        console.log(data[0]);
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
        this.userEdit.controls['active'].setValue(data[0].activity);
        this.userEdit.controls['role'].setValue(data[0].role);
        
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
    console.log('dsdaasdsa')
  console.log(this.controlerData.active.value);
    
    if (this.userEdit.valid) {
      let userData = {
        "id": this.id,
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
        "role":this.controlerData.role.value,
        
        
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
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'User updated',
              showConfirmButton: false,
              timer: 2500
            })
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
