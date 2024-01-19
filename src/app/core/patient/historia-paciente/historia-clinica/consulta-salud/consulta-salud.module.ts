import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaSaludRoutingModule } from './consulta-salud-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConsultaSaludRoutingModule,
    SharedModule,

  ]
})
export class ConsultaSaludModule { }
