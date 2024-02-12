import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GastosComponent } from './gastos.component';
import { GastosRoutingModule } from './gastos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarGastosComponent } from './agregar-gastos/agregar-gastos.component';



@NgModule({
  declarations: [
    GastosComponent,
    AgregarGastosComponent
  ],
  imports: [
    CommonModule,
    GastosRoutingModule,
    SharedModule
  ]
})
export class GastosModule { }
