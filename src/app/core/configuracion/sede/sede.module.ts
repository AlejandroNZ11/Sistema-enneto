import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SedeComponent } from './sede.component';
import { SedeRoutingModule } from './sede-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SedeComponent
  ],
  imports: [
    CommonModule,
    SedeRoutingModule,
    SharedModule,
  ]
})
export class SedeModule { }
