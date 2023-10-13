import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentacionComponent } from './presentacion.component';
import { PresentacionRoutingModule } from './presentacion-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarPresentacionComponent } from './agregar-presentacion/agregar-presentacion.component';



@NgModule({
  declarations: [
    PresentacionComponent,
    AgregarPresentacionComponent
  ],
  imports: [
    CommonModule,
    PresentacionRoutingModule,
    SharedModule,
  ]
})
export class PresentacionModule { }
