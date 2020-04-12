import { Component, OnInit } from '@angular/core';
import {Services} from '../../services/Services';

@Component({
  selector: 'app-rent-details',
  templateUrl: './rent-details.component.html',
  styleUrls: ['./rent-details.component.css']
})
export class RentDetailsComponent implements OnInit {

  private startDate:String;
  private endDate:String;
  private startLocation:String;
  private endLocation:String;
  private customerId:String;
  private carId:String;
  private comment:String;

  private data:any[];

  constructor(private services:Services) {
this.services=services;
   }

  ngOnInit() {
  }

  save(){
    var rent = {

      "needDate":this.startDate,
      "endDate":this.endDate,
      "start":this.startLocation,
      "end":this.endLocation,
      "comments":this.comment,
      "customerId":this.customerId,
      "carId":this.carId

    }
    this.services.saveRentDetails(rent).subscribe(
      (data: any[]) => this.data = data,
      (error) => alert("cannot connect to server")
    );
  }

}
