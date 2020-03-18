import { Component, OnInit } from '@angular/core';
import {Services} from '../../Services';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  private fuel='Diesel';
  private transmission='Auto';
  private acOrNonAc='Ac';
  private registerdNumber:String;
  private registerdYear:String;
  private brand:String;
  private ModelName:String;
  private modelColor:String;
  private modelYear:String;
  private comment:String;
  private onwerName:String;
  private owners: Array<String>=[];

private data:any[];


  constructor(private services:Services) {
    this.services=services;
   }

  ngOnInit() {
    this.getOwners();
  }
  getOwners(){
    this.services.getOwners().subscribe(
          (serversData: any[]) => this.owners=serversData,
          (error) => console.log(error)
      );
  }
  
  save(){
    var car ={

      "registeredNumber":this.registerdNumber,
      "registerdYear":this.registerdYear,
      "fuleType":this.fuel,
      "acOrNonAc":this.acOrNonAc,
      "transmission":this.transmission,
      "vehicleBrand":this.brand,
      "comment":this.comment,
      "vehicleModel":{ "name":this.ModelName,
      "color":this.modelColor,
      "modelYear":this.modelYear},
      "ownerId":this.onwerName

    };


    this.services.saveCarDetails(car).subscribe(
      (data: any[]) => this.data = data,
      (error) => alert("cannot connect to server")
    );

  }
 
}
