import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdontogramaEvolucionRoutingModule } from './odontograma-evolucion-routing.module';
import { OdontogramaEvolucionComponent } from './odontograma-evolucion.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OdontogramaEvolucionComponent
  ],
  imports: [
    CommonModule,
    OdontogramaEvolucionRoutingModule,
    SharedModule
  ]
})
export class OdontogramaEvolucionModule { }
