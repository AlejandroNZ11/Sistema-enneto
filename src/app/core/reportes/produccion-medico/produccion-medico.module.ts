import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduccionMedicoComponent } from './produccion-medico.component';
import { ProduccionMedicoRoutingModule } from './produccion-medico-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProduccionMedicoComponent
  ],
  imports: [
    CommonModule,
    ProduccionMedicoRoutingModule,
    SharedModule
  ]
})
export class ProduccionMedicoModule { }
