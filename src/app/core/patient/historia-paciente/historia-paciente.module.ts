import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriaPacienteRoutingModule } from './historia-paciente-routing.module';
import { HistoriaPacienteComponent } from './historia-paciente.component';


@NgModule({
    declarations: [
        HistoriaPacienteComponent
    ],
    imports: [
        CommonModule,
        HistoriaPacienteRoutingModule
    ]
})
export class HistoriaPacienteModule { }
