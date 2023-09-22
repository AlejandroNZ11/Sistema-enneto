import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GastosComponent } from './gastos.component';
import { GastosRoutingModule } from './gastos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    GastosComponent
  ],
  imports: [
    CommonModule,
    GastosRoutingModule,
    SharedModule
  ]
})
export class GastosModule { }
