import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarDetailsComponent } from './component/car-details/car-details.component';
import { CustomerOwnerRegisterComponent } from './component/customer-owner-register/customer-owner-register.component';
import { HttpClientModule } from '@angular/common/http';
import { Services } from './services/Services';
import { from } from 'rxjs';
import { RentDetailsComponent } from './component/rent-details/rent-details.component';
import { DashBoardComponent } from './component/dash-board/dash-board.component';
import { LogingComponent } from './component/loging/loging.component';
import { CarUpdateComponent } from './component/car-update/car-update.component';
import { CarEditComponent } from './component/car-edit/car-edit.component';
import { SharedModule } from './shared/shared.module';
import { UserRegistrationComponent } from './component/user-registration/user-registration.component';
import { UserUpdateComponent } from './component/user-update/user-update.component';
import { UserEditComponent } from './component/user-edit/user-edit.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { RentVehicleTableComponent } from './component/rent-vehicle-table/rent-vehicle-table.component';
import { LogingUserUpdateComponent } from './component/loging-user-update/loging-user-update.component';
import { CarDeleteTableComponent } from './component/car-delete-table/car-delete-table.component';
import { CarDeleteComponent } from './component/car-delete/car-delete.component';
import { RentDetailsTableComponent } from './component/rent-details-table/rent-details-table.component';
import { AuthGuard } from './_helpers/auth.guard';
import { CarCardComponent } from './component/car-card/car-card.component';
import { RentDetailsEditComponent } from './component/rent-details-edit/rent-details-edit.component';
import { MyActiveRentTableComponent } from './component/my-active-rent-table/my-active-rent-table.component';
import { MyPreviousRentTableComponent } from './component/my-previous-rent-table/my-previous-rent-table.component';
import { MyActiveRentUpdateComponent } from './component/my-active-rent-update/my-active-rent-update.component';
import { ReturnVehicleTableComponent } from './component/return-vehicle-table/return-vehicle-table.component';
import { ReturnVehicleComponent } from './component/return-vehicle/return-vehicle.component';
import { AvailableComponent } from './component/available/available.component';
import { AllPreviousRentComponent } from './component/all-previous-rent/all-previous-rent.component';
import { AdminPermissionComponent } from './component/admin-permission/admin-permission.component';


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
    UserRegistrationComponent,
    UserUpdateComponent,
    UserEditComponent,
    SideBarComponent,
    NavBarComponent,
    RentVehicleTableComponent,
    LogingUserUpdateComponent,
    CarDeleteTableComponent,
    CarDeleteComponent,
    RentDetailsTableComponent,
    CarCardComponent,
    RentDetailsEditComponent,
    MyActiveRentTableComponent,
    MyPreviousRentTableComponent,
    MyActiveRentUpdateComponent,
    ReturnVehicleTableComponent,
    ReturnVehicleComponent,
    AvailableComponent,
    AllPreviousRentComponent,
    AdminPermissionComponent,
 
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    SharedModule
    
    
  ],
  providers: [AuthGuard,Services],
  bootstrap: [AppComponent]
})
export class AppModule { }
