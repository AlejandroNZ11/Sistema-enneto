import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdontogramaInicialRoutingModule } from './odontograma-inicial-routing.module';
import { OdontogramaInicialComponent } from './odontograma-inicial.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OdontogramaInicialComponent
  ],
  imports: [
    CommonModule,
    OdontogramaInicialRoutingModule,
    SharedModule
  ]
})
export class OdontogramaInicialModule { }
