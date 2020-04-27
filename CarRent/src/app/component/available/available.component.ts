import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { RentService } from 'src/app/services/rent.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})
export class AvailableComponent implements OnInit {

  tableData : any;
  p:number=1;
  constructor(private rentService:RentService,private router:Router) { }

  RoutePage(data) {
    console.log(data)
 
   let id = data.id
 
   this.router.navigate(['/rentDetailsEdit', id]);
 
   
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
