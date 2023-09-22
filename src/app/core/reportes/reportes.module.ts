import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductividadComponent } from './productividad/productividad.component';
import { ControlComponent } from './control/control.component';
import { ProduccionMedicoComponent } from './produccion-medico/produccion-medico.component';
import { ComisionMedicoComponent } from './comision-medico/comision-medico.component';
import { ReportesComponent } from './reportes.component';
import { ReportesRoutingModule } from './reportes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ReportesComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    SharedModule
  ]
})
export class ReportesModule { }
