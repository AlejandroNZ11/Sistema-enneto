import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriaMedicoComponent } from './historia-medico.component';
import { HistoriaMedicoRoutingModule } from './historia-medico-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HistoriaMedicoComponent
  ],
  imports: [
    CommonModule,
    HistoriaMedicoRoutingModule,
    SharedModule
  ]
})
export class HistoriaMedicoModule { }
