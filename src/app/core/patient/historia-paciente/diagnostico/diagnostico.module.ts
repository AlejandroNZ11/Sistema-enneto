import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosticoRoutingModule } from './diagnostico-routing.module';
import { DiagnosticoComponent } from './diagnostico.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarDiagnosticoPacienteComponent } from './agregar-diagnostico-paciente/agregar-diagnostico-paciente.component';
import { EditarDiagnosticoPacienteComponent } from './editar-diagnostico-paciente/editar-diagnostico-paciente.component';


@NgModule({
  declarations: [
    DiagnosticoComponent,
    AgregarDiagnosticoPacienteComponent,
    EditarDiagnosticoPacienteComponent
  ],
  imports: [
    CommonModule,
    DiagnosticoRoutingModule,
    SharedModule
  ]
})
export class DiagnosticoModule { }
