import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CierreComponent } from './cierre.component';
import { CierreRoutingModule } from './cierre-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CierreComponent
  ],
  imports: [
    CommonModule,
    CierreRoutingModule,
    SharedModule
  ]
})
export class CierreModule { }
