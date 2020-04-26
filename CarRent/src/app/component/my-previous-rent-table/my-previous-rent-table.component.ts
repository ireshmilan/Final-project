import { Component, OnInit } from '@angular/core';
import { RentService } from 'src/app/services/rent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-previous-rent-table',
  templateUrl: './my-previous-rent-table.component.html',
  styleUrls: ['./my-previous-rent-table.component.css']
})
export class MyPreviousRentTableComponent implements OnInit {
  tableData : any;
  p:number=1;
  constructor(private rentService:RentService,private router:Router) { }

  // RoutePage(data) {
  //   console.log(data)
 
  //  let id = data.id
 
  //  this.router.navigate(['/rentDetailsEdit', id]);
 
   
  // }


  //this.loginUserUpdate.controls['id'].setValue(JSON.parse(sessionStorage.getItem('user')).id);
  ngOnInit() {
   this.rentService.getPreviousRentByCustomerId(JSON.parse(sessionStorage.getItem('user')).id)
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
