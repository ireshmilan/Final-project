import { Component, OnInit } from '@angular/core';
import {Services} from '../../services/Services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { CarService } from 'src/app/services/car.service';

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
    });
    this.displayValueForm()

  }


  displayValueForm() {
    //get accutale route id 
   this.id = (this.route.snapshot.paramMap.get('id'));
   console.log(this.id);
 
    
    this.carService.getById(this.id)
    .subscribe(
      data=>{
      
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


