import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { HistoriaGeneralComponent } from './historia-general/historia-general.component';
import { HistoriaMedicoComponent } from './historia-medico/historia-medico.component';


@NgModule({
  declarations: [
    PatientComponent,
    HistoriaGeneralComponent,
    HistoriaMedicoComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
