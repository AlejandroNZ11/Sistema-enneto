import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';
import { HistoriaClinicaComponent } from './historia-clinica.component';
import { HistoriaClinicaRoutingModule } from './historia-clinica-routing.module';



@NgModule({
  declarations: [
    HistoriaClinicaComponent
  ],
  imports: [
    CommonModule,
    HistoriaClinicaRoutingModule,
    SharedModule
  ]
})
export class HistoriaClinicaModule { }
