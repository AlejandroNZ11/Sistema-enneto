import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalisisFacialRoutingModule } from './analisis-facial-routing.module';
import { AnalisisFacialComponent } from './analisis-facial.component';


@NgModule({
  declarations: [
    AnalisisFacialComponent
  ],
  imports: [
    CommonModule,
    AnalisisFacialRoutingModule
  ]
})
export class AnalisisFacialModule { }
