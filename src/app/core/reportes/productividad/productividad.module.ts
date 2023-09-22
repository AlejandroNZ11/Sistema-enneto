import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductividadComponent } from './productividad.component';
import { ProductividadRoutingModule } from './productividad-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProductividadComponent
  ],
  imports: [
    CommonModule,
    ProductividadRoutingModule,
    SharedModule,
  ]
})
export class ProductividadModule { }
