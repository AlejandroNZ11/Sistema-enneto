import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent } from './control.component';
import { ControlRoutingModule } from './control-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ControlComponent
  ],
  imports: [
    CommonModule,
    ControlRoutingModule,
    SharedModule,
  ]
})
export class ControlModule { }
