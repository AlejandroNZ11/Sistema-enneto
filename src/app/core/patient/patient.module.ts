import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { CumpleaniosComponent } from './cumpleanios/cumpleanios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ModalAgregarPacienteComponent } from './modal-agregar-paciente/modal-agregar-paciente.component';



@NgModule({
  declarations: [
    PatientComponent,
    CumpleaniosComponent,
    ModalAgregarPacienteComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class PatientModule { }
