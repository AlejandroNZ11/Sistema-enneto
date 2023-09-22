import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CobroPresupuestoComponent } from './cobro-presupuesto.component';
import { CobroPresupuestoRoutingModule } from './cobro-presupuesto-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CobroPresupuestoComponent
  ],
  imports: [
    CommonModule,
    CobroPresupuestoRoutingModule,
    SharedModule
  ]
})
export class CobroPresupuestoModule { }
