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

const routes: Routes = [
  { path: '', component: LogingComponent },
  {path:'createCar', component:CarDetailsComponent},
  {path:'dashBoard', component:DashBoardComponent},
  {path:'edit-car/:id', component:CarEditComponent},
  {path:'update-car', component:CarUpdateComponent},
  {path:'userRegistration', component:UserRegistrationComponent},
  {path:'userUpdate', component:UserUpdateComponent},
  {path:'userEdit/:id', component:UserEditComponent},
  
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
