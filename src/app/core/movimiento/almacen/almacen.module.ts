import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenComponent } from './almacen.component';
import { AlmacenRoutingModule } from './almacen-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarAlmacenComponent } from './agregar-almacen/agregar-almacen.component';



@NgModule({
  declarations: [
    AlmacenComponent,
    AgregarAlmacenComponent
  ],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    SharedModule
  ]
})
export class AlmacenModule { }
