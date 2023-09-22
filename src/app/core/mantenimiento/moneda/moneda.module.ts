import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonedaComponent } from './moneda.component';
import { MonedaRoutingModule } from './moneda-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    MonedaComponent
  ],
  imports: [
    CommonModule,
    MonedaRoutingModule,
    SharedModule
  ]
})
export class MonedaModule { }
