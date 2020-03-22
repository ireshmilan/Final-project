import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarDetailsComponent } from './component/car-details/car-details.component';
import { CustomerOwnerRegisterComponent } from './component/customer-owner-register/customer-owner-register.component';
import { HttpClientModule } from '@angular/common/http';
import { Services } from './Services';
import { from } from 'rxjs';
import { RentDetailsComponent } from './component/rent-details/rent-details.component';
import { DashBoardComponent } from './component/dash-board/dash-board.component';
import { LogingComponent } from './component/loging/loging.component';
import { CarUpdateComponent } from './component/car-update/car-update.component';
import { CarEditComponent } from './component/car-edit/car-edit.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    CarDetailsComponent,
    CustomerOwnerRegisterComponent,
    RentDetailsComponent,
    DashBoardComponent,
    LogingComponent,
    CarUpdateComponent,
    CarEditComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [Services],
  bootstrap: [AppComponent]
})
export class AppModule { }
