import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CarDetailsComponent,
    CustomerOwnerRegisterComponent,
    RentDetailsComponent,
    DashBoardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule
  ],
  providers: [Services],
  bootstrap: [AppComponent]
})
export class AppModule { }
