import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdontogramaAltaRoutingModule } from './odontograma-alta-routing.module';
import { OdontogramaAltaComponent } from './odontograma-alta.component';


@NgModule({
  declarations: [
    OdontogramaAltaComponent
  ],
  imports: [
    CommonModule,
    OdontogramaAltaRoutingModule
  ]
})
export class OdontogramaAltaModule { }
