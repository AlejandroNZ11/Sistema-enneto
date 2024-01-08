import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosticoComponent } from './diagnostico.component';
import { DiagnosticoRoutingModule } from './diagnostico-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearDiagnosticoComponent } from './crear-diagnostico/crear-diagnostico.component';



@NgModule({
  declarations: [
    DiagnosticoComponent,
    CrearDiagnosticoComponent
  ],
  imports: [
    CommonModule,
    DiagnosticoRoutingModule,
    SharedModule,
  ]
})
export class DiagnosticoModule { }
