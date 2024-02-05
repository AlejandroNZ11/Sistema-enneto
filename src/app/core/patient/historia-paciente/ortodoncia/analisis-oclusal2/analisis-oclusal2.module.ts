import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalisisOclusal2RoutingModule } from './analisis-oclusal2-routing.module';
import { AnalisisOclusal2Component } from './analisis-oclusal2.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AnalisisOclusal2Component
  ],
  imports: [
    CommonModule,
    AnalisisOclusal2RoutingModule,
    SharedModule
  ]
})
export class AnalisisOclusal2Module { }
