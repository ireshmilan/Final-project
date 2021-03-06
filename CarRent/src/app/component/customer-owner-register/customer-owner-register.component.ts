import { Component, OnInit } from '@angular/core';
import {Services} from '../../services/Services';

@Component({
  selector: 'app-customer-owner-register',
  templateUrl: './customer-owner-register.component.html',
  styleUrls: ['./customer-owner-register.component.css']
})
export class CustomerOwnerRegisterComponent implements OnInit {

  gender ='male';
  private firstName:String;
  private middleName:String;
  private lastName:String;
  private idCardNo:String;
  private dob:String;
  private email:String;
  private telephone1:String;
  private telephone2:String;
  private no:String;
  private lane:String;
  private city:String;
 
  
  private data:any[];
  
    constructor(private services: Services) {
  this.services=services;
  
     }
  ngOnInit() {  
  }
  save(){
    var customer = {

      
        "firstName":this.firstName,
        "middleName":this.middleName,
        "lastName":this.lastName,
        "gender":this.gender,
        "dateOfBirth":this.dob,	
        "idCardNumber":this.idCardNo,
        "email":this.email,
        "address":{"no":this.no,"lane":this.lane,"city":this.city} ,
        
        "telephone":[{"telephone":this.telephone1},{"telephone":this.telephone2}]
            
    };


    this.services.saveCustomerOwnerDetails(customer).subscribe(
      (data: any[]) => this.data = data,
      (error) => alert("cannot connect to server")
    );
 }
}
