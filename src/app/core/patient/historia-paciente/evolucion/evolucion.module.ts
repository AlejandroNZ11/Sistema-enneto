import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvolucionComponent } from './evolucion.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarEvolucionPacienteComponent } from './agregar-evolucion-paciente/agregar-evolucion-paciente.component';
import { EditarEvolucionPacienteComponent } from './editar-evolucion-paciente/editar-evolucion-paciente.component';
import { EvolucionRoutingModule } from './evolucion-routing.module';



@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    EvolucionRoutingModule
  ],
  exports: [],
  declarations: [EvolucionComponent, AgregarEvolucionPacienteComponent, EditarEvolucionPacienteComponent],
  providers: [],
})
export class EvolucionModule { }
