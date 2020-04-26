import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-delete-table',
  templateUrl: './car-delete-table.component.html',
  styleUrls: ['./car-delete-table.component.css']
})
export class CarDeleteTableComponent implements OnInit {

  tableData : any;
  p:number=1;
   constructor(private carService:CarService,
    private router:Router) {
  
   }
   RoutePage(data) {
     console.log(data)
  
    let id = data.id
  
    this.router.navigate(['/carDelete', id]);
  
    
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
  