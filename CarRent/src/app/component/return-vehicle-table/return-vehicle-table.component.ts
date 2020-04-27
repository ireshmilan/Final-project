import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { Router } from '@angular/router';
import { RentService } from 'src/app/services/rent.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-return-vehicle-table',
  templateUrl: './return-vehicle-table.component.html',
  styleUrls: ['./return-vehicle-table.component.css']
})
export class ReturnVehicleTableComponent implements OnInit {

  tableData : any;
  p:number=1;
  constructor(private rentService:RentService,private router:Router) { }



  RoutePageCancel(data) {

    this.rentService.complete(data)
    // this.rentService.getRentByRentId(JSON.parse(sessionStorage.getItem('user')).id)
     .subscribe(
       response=>{
         console.log(response);
         this.tableData = response;
         Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Completed!',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/dashBoard']);
       },
       error=>{
         console.log(error);
       }
     )
 
   
  }

  ngOnInit() {
    this.rentService.getAllRents()
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
