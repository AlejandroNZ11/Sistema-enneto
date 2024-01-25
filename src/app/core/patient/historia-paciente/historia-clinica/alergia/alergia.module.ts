import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlergiaRoutingModule } from './alergia-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarAlergiaPacienteComponent } from './agregar-alergia-paciente/agregar-alergia-paciente.component';
import { EditarAlergiaPacienteComponent } from './editar-alergia-paciente/editar-alergia-paciente.component';


@NgModule({
  declarations: [
    AgregarAlergiaPacienteComponent,
    EditarAlergiaPacienteComponent
  ],
  imports: [
    CommonModule,
    AlergiaRoutingModule,
    SharedModule

  ]
})
export class AlergiaModule { }
