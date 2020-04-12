import { Component, OnInit } from '@angular/core';
import {Services} from '../../services/Services';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  private cars=[];
  private data:any[];
  constructor(private services:Services) { 
    this.services=services;
  }

  ngOnInit() {
    this.getCars();
  }

  getCars(){
    this.services.getAllCars().subscribe(

          (serversData: any[]) => this.cars=serversData,
          
          (error) => console.log(error)
      );
      console.log(this.cars)
  }
}
