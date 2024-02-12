import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdontogramaRoutingModule } from './odontograma-routing.module';
import { OdontogramaComponent } from './odontograma.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OdontogramaComponent
  ],
  imports: [
    CommonModule,
    OdontogramaRoutingModule,
    SharedModule
  ]
})
export class OdontogramaModule { }
