import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarDetailsComponent } from './component/car-details/car-details.component';
import { LogingComponent } from './component/loging/loging.component';
import { DashBoardComponent } from './component/dash-board/dash-board.component';
import { CarEditComponent } from './component/car-edit/car-edit.component';
import { CarUpdateComponent } from './component/car-update/car-update.component';
import { UserRegistrationComponent } from './component/user-registration/user-registration.component';
import { UserUpdateComponent } from './component/user-update/user-update.component';
import { UserEditComponent } from './component/user-edit/user-edit.component';
import { RentDetailsComponent } from './component/rent-details/rent-details.component';
import { RentVehicleTableComponent } from './component/rent-vehicle-table/rent-vehicle-table.component';
import { LogingUserUpdateComponent } from './component/loging-user-update/loging-user-update.component';
import { CarDeleteTableComponent } from './component/car-delete-table/car-delete-table.component';
import { CarDeleteComponent } from './component/car-delete/car-delete.component';
import { RentDetailsTableComponent } from './component/rent-details-table/rent-details-table.component';
import { RentDetailsEditComponent } from './component/rent-details-edit/rent-details-edit.component';
import { MyActiveRentTableComponent } from './component/my-active-rent-table/my-active-rent-table.component';
import { MyPreviousRentTableComponent } from './component/my-previous-rent-table/my-previous-rent-table.component';
import { MyActiveRentUpdateComponent } from './component/my-active-rent-update/my-active-rent-update.component';

const routes: Routes = [
  { path: '', component: LogingComponent },
  {path:'createCar', component:CarDetailsComponent},
  {path:'dashBoard', component:DashBoardComponent},
  {path:'edit-car/:id', component:CarEditComponent},
  {path:'update-car', component:CarUpdateComponent},
  {path:'userRegistration', component:UserRegistrationComponent},
  {path:'userUpdate', component:UserUpdateComponent},
  {path:'userEdit/:id', component:UserEditComponent},
  {path:'addRent/:id', component:RentDetailsComponent},
  {path:'selectVehicle', component:RentVehicleTableComponent},
  {path:'logUserUpdate', component:LogingUserUpdateComponent},
  {path:'carDeleteTable', component:CarDeleteTableComponent},
  {path:'carDelete/:id', component:CarDeleteComponent},
  {path:'rentDetailsTable', component:RentDetailsTableComponent},
  {path:'rentDetailsEdit/:id', component:RentDetailsEditComponent},
  {path:'myActiveRentTable', component:MyActiveRentTableComponent},
  {path:'myPreviousRentTable', component:MyPreviousRentTableComponent},
  {path:'myActiveRentUpdate/:id', component:MyActiveRentUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
