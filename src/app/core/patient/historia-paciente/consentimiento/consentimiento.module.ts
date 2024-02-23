import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsentimientoComponent } from './consentimiento.component';
import { AgregarConsentimientoPacienteComponent } from './agregar-consentimiento-paciente/agregar-consentimiento-paciente.component';
import { EditarConsentimientoPacienteComponent } from './editar-consentimiento-paciente/editar-consentimiento-paciente.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsentimientoRoutingModule } from './consentimiento-routing.module';



@NgModule({
  declarations: [
    ConsentimientoComponent,
    AgregarConsentimientoPacienteComponent,
    EditarConsentimientoPacienteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConsentimientoRoutingModule
  ]
})
export class ConsentimientoModule { }
