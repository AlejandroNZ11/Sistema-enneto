import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoGastosComponent } from './tipo-gastos.component';
import { TipoGastosRoutingModule } from './tipo-gastos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TipoGastosComponent
  ],
  imports: [
    CommonModule,
    TipoGastosRoutingModule,
    SharedModule,
  ]
})
export class TipoGastosModule { }
