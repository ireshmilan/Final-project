import { Component, OnInit } from '@angular/core';
import {Services} from '../../services/Services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { CarService } from 'src/app/services/car.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-rent-details',
  templateUrl: './rent-details.component.html',
  styleUrls: ['./rent-details.component.css']
})
export class RentDetailsComponent implements OnInit {
  id:any;
  rentVehicle:FormGroup;
  submitted = false;


  private startDate:String;
  private endDate:String;
  private startLocation:String;
  private endLocation:String;
  private customerId:String;
  private carId:String;
  private comment:String;

  private data:any[];

  constructor(private services:Services, private route:ActivatedRoute,
    private formBuilder:FormBuilder, private carService:CarService) {

   }

  ngOnInit() {

    this.rentVehicle = this.formBuilder.group({
      customerId: '',
      carId:'',
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startLocation: ['', Validators.required],
      endLocation: ['', Validators.required],
      comment: ['', Validators.required],
      registeredNumber:'',
      model:''
    },
    {    
      validator: this.MustMatch('startDate', 'endDate')
    }
    );
    this.displayValueForm()

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
      if (control.value >= matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }


  displayValueForm() {
    //get accutale route id 
   this.id = (this.route.snapshot.paramMap.get('id'));
   console.log("wqwwqwqww",sessionStorage.getItem('user'));
 
    
    this.carService.getById(this.id)
    .subscribe(
      data=>{
        this.rentVehicle.controls['customerId'].setValue(JSON.parse(sessionStorage.getItem('user')).id);
       this.rentVehicle.controls['carId'].setValue(data[0].id);
       this.rentVehicle.controls['registeredNumber'].setValue(data[0].registeredNumber);
       this.rentVehicle.controls['model'].setValue(data[0].vehicleBrand +" "+data[0].vehicleModel.name);

      },
      error=>{
        console.group(error);
      },
      ()=>{
        console.log('Complete');
      }
    );
  }



  get controlerData() {
    return this.rentVehicle.controls;
  }



  uploadSubmit() {
    this.submitted = true;
    if (this.rentVehicle.valid) {
      let rent = {
   
      "needDate":this.controlerData.startDate.value,
      "endDate":this.controlerData.endDate.value,
      "start":this.controlerData.startLocation.value,
      "end":this.controlerData.endLocation.value,
      "comments":this.controlerData.comment.value,
      "customerId":this.controlerData.customerId.value,
      "carId":this.controlerData.carId.value

      }
      console.log('SUBMIT');
          console.log(rent);

    this.services.saveRentDetails(rent).
    subscribe(
      response=>{
        console.log(response);
        this.submitted = false;
        this.rentVehicle.reset();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your Rent has been saved',
          showConfirmButton: false,
          timer: 2500
        })
        //
      },
      error=>{
        console.log(error);
    return;
  }
  )

} else {
return;
}


}


}


