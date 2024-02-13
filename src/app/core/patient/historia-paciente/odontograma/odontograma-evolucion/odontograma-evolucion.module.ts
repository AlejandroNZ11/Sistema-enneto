import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdontogramaEvolucionRoutingModule } from './odontograma-evolucion-routing.module';
import { OdontogramaEvolucionComponent } from './odontograma-evolucion.component';


@NgModule({
  declarations: [
    OdontogramaEvolucionComponent
  ],
  imports: [
    CommonModule,
    OdontogramaEvolucionRoutingModule
  ]
})
export class OdontogramaEvolucionModule { }
