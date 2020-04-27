import { Component, OnInit } from '@angular/core';
import { RentService } from 'src/app/services/rent.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-my-active-rent-table',
  templateUrl: './my-active-rent-table.component.html',
  styleUrls: ['./my-active-rent-table.component.css']
})
export class MyActiveRentTableComponent implements OnInit {
  tableData : any;
  p:number=1;
  constructor(private rentService:RentService,private router:Router) { }
  
  RoutePage(data) {
    console.log(data)
 
   let id = data.id
 
   this.router.navigate(['/myActiveRentUpdate', id]);
 
   
  }
  RoutePageCancel(data) {

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to Cancel it!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!'
    }).then((result) => {
      if (result.value) {
        this.rentService.cancel(data)
        // this.rentService.getRentByRentId(JSON.parse(sessionStorage.getItem('user')).id)
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

  //this.loginUserUpdate.controls['id'].setValue(JSON.parse(sessionStorage.getItem('user')).id);
  ngOnInit() {
   this.rentService.getRentByCustomerId(JSON.parse(sessionStorage.getItem('user')).id)
   // this.rentService.getRentByRentId(JSON.parse(sessionStorage.getItem('user')).id)
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
