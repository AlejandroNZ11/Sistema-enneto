import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalisisGeneralRoutingModule } from './analisis-general-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AnalisisGeneralRoutingModule,
    SharedModule
  ]
})
export class AnalisisGeneralModule { }
