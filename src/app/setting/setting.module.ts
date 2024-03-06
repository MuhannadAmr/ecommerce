import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { ChangePicComponent } from './change-pic/change-pic.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';


@NgModule({
  declarations: [
    ChangePassComponent,
    ChangePicComponent,
    ForgetPassComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
