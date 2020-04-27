import { Component, OnInit } from '@angular/core';
import { RentService } from 'src/app/services/rent.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-rent-details-table',
  templateUrl: './rent-details-table.component.html',
  styleUrls: ['./rent-details-table.component.css']
})
export class RentDetailsTableComponent implements OnInit {
  tableData : any;
  p:number=1;
  constructor(private rentService:RentService,private router:Router) { }

  RoutePage(data) {
    console.log(data)
 
   let id = data.id
 
   this.router.navigate(['/rentDetailsEdit', id]);
 
   
  }

  RoutePageCancel(data) {

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!'
    }).then((result) => {
      if (result.value) {
        this.rentService.cancel(data)
   
     .subscribe(
       response=>{
         console.log(response);
         this.tableData = response;
         this.router.navigate(['/dashBoard']);
       },
       error=>{
         console.log(error);
       }
     )
      }
    })

  
 
   
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
