import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-vehicle-table',
  templateUrl: './rent-vehicle-table.component.html',
  styleUrls: ['./rent-vehicle-table.component.css']
})
export class RentVehicleTableComponent implements OnInit {

  tableData : any;
  p:number=1;

  constructor(private carService:CarService,private router:Router) { }

  RoutePage(data) {
    console.log(data)
 
   let id = data.id
 
   this.router.navigate(['/addRent', id]);
 
   
  }

  ngOnInit() {
    this.carService.getAllCars()
    .subscribe(
      response=>{
        console.log(response);
        this.tableData = response;
      },
      error=>{
        console.log(error);
      }
    )
  }

}
