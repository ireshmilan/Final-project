import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Services } from '../../services/Services';
import { PasswordStrengthValidator } from 'src/app/shared/password-strength.validators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  userRegistration: FormGroup;
  submitted = false;
  invalidLogin = false


  gender = ['Select Gender', 'Male', 'Female'];

  constructor(private services: Services,
    private formBuilder: FormBuilder,private router: Router) {

      this.services = services;
     }

  ngOnInit() {
    this.userRegistration = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['',  [Validators.required, Validators.email]],
      idNumber: ['', Validators.required],
      birthDay: ['', Validators.required],
      gender: ['', Validators.required],

      telephone1: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
      telephone2: ['', [Validators.required, Validators.pattern(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/)]],
    
      no: ['', Validators.required],
      lane: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', [Validators.required, PasswordStrengthValidator]],
      confirmPassword: ['', Validators.required],
    },
    {    
      validator: this.MustMatch('password', 'confirmPassword')
    })

  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }


  addDefaultValue() {
    const defaultData = 'Select Gender';

    if (defaultData !== this.gender[0]) {
      this.gender.push('Select Gender');
    }

  }

  removeDefualtValue() {
    const defaultData = 'Select Gender';
    if (defaultData == this.gender[0]) {
      this.gender.shift();

    }

  }

  loging(){
  
    this.router.navigate([''])
  }
  get controlerData() {
    return this.userRegistration.controls;
  }

  uploadSubmit() {
    this.submitted = true;

    if (this.userRegistration.valid) {
      let userdata = {
        "firstName": this.controlerData.firstName.value,
        "lastName": this.controlerData.lastName.value,
        "email": this.controlerData.email.value,
        "gender": this.controlerData.gender.value,
        "dateOfBirth": this.controlerData.birthDay.value,
        "idCardNumber": this.controlerData.idNumber.value,
        "username": this.controlerData.userName.value,
        "password": this.controlerData.password.value,
        "address": {
          "no": this.controlerData.no.value,
          "lane": this.controlerData.lane.value,
          "city": this.controlerData.city.value
        },
        "telephone":[{"telephone":this.controlerData.telephone1.value},{"telephone":this.controlerData.telephone2.value}],
        
        
        
      }
      console.log('SUBMIT');
      console.log(userdata);
      //image eka yane Sti    
     
      const formData = new FormData();
      //formData.append('car', JSON.(userdata));

    


      this.services.saveCustomerOwnerDetails(userdata)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate([""]);
            this.submitted = false;
            this.userRegistration.reset();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Successfully Registerd!',
              showConfirmButton: false,
              timer: 2500
            })
          },
          error => {
            {
              let errorMsg = "Something went Wrong";
              if (error.status === 500) {
                errorMsg = "Username or email already exit!!!!";
              }
              console.log("error", error)
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: errorMsg,
                showConfirmButton: true,
                timer: 5500
              })
              this.invalidLogin = true
            }
          }
        )

    } else {
      return;
    }


  }



}
