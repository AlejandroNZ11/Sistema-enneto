import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriaPacienteRoutingModule } from './historia-paciente-routing.module';
import { HistoriaPacienteComponent } from './historia-paciente.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FiltroPipe } from './pipes/filtro.pipe';
import { MiniSidebarComponent } from './mini-sidebar/mini-sidebar.component';



@NgModule({
    declarations: [
        HistoriaPacienteComponent,
        FiltroPipe,
        MiniSidebarComponent,
    ],
    imports: [
        CommonModule,
        HistoriaPacienteRoutingModule,
        SharedModule
    ]
})
export class HistoriaPacienteModule { }
