import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Services } from 'src/app/services/Services';
import { error } from 'util';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  tableData : any;
  p:number=1;

  constructor(private router:Router, private services:Services) { }


  RoutePage(data) {
    console.log(data)
 
   let id = data.id
 
   this.router.navigate(['/userEdit', id]);
 
   
  }


  ngOnInit() {
    this.services.getUsers().subscribe(
      response=>{
        this.tableData = response
        console.log("hhhhhhhhhhhhhhhhh"+this.tableData)
      },
      error=>{
        console.log(error);
      }
    )
  }

}


