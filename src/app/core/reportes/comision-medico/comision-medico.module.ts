import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComisionMedicoComponent } from './comision-medico.component';
import { ComisionMedicoRoutingModule } from './comision-medico-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ComisionMedicoComponent
  ],
  imports: [
    CommonModule,
    ComisionMedicoRoutingModule,
    SharedModule
  ]
})
export class ComisionMedicoModule { }
