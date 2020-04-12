import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

tableData : any;
 constructor(private carService:CarService,
  private router:Router) {

 }
 RoutePage(data) {
   console.log(data)

  let id = data.id

  this.router.navigate(['/edit-car', id]);

  
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
