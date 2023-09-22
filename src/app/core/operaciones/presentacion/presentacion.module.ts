import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentacionComponent } from './presentacion.component';
import { PresentacionRoutingModule } from './presentacion-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    PresentacionComponent
  ],
  imports: [
    CommonModule,
    PresentacionRoutingModule,
    SharedModule,
  ]
})
export class PresentacionModule { }
