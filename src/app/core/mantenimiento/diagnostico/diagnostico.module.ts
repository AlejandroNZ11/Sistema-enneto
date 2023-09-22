import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosticoComponent } from './diagnostico.component';
import { DiagnosticoRoutingModule } from './diagnostico-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    DiagnosticoComponent
  ],
  imports: [
    CommonModule,
    DiagnosticoRoutingModule,
    SharedModule,
  ]
})
export class DiagnosticoModule { }
