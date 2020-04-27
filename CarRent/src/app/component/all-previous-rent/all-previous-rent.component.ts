import { Component, OnInit } from '@angular/core';
import { RentService } from 'src/app/services/rent.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-all-previous-rent',
  templateUrl: './all-previous-rent.component.html',
  styleUrls: ['./all-previous-rent.component.css']
})
export class AllPreviousRentComponent implements OnInit {
  tableData : any;
  p:number=1;
  constructor(private rentService:RentService,private router:Router) { }




  ngOnInit() {
    this.rentService.getAllPreviousRents()
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
