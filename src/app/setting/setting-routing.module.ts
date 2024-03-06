import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { authGuard } from '../auth.guard';
import { ChangePicComponent } from './change-pic/change-pic.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';

const routes: Routes = [
  {path:"" , redirectTo:"changePassword" , pathMatch:"full"},
  {path:"changePassword" , component:ChangePassComponent , title:"change password" , canActivate:[authGuard]},
  {path:"changePicture" , component:ChangePicComponent , title:"change picture" , canActivate:[authGuard]},
  {path:"forgetPassword" , component:ForgetPassComponent , title:"forget password" , canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
