import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CobroConsultaComponent } from './cobro-consulta/cobro-consulta.component';
import { CobroPresupuestoComponent } from './cobro-presupuesto/cobro-presupuesto.component';
import { CierreComponent } from './cierre/cierre.component';
import { GastosComponent } from './gastos/gastos.component';
import { CajaComponent } from './caja.component';
import { CajaRoutingModule } from './caja-routing.module';




@NgModule({
  declarations: [
    CajaComponent,
  ],
  imports: [
    CommonModule,
    CajaRoutingModule
  ]
})
export class CajaModule { }
