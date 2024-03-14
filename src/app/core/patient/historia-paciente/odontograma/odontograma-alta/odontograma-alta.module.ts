import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdontogramaAltaRoutingModule } from './odontograma-alta-routing.module';
import { OdontogramaAltaComponent } from './odontograma-alta.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OdontogramaAltaComponent
  ],
  imports: [
    CommonModule,
    OdontogramaAltaRoutingModule,
    SharedModule

  ]
})
export class OdontogramaAltaModule { }
