import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosticoComponent } from './diagnostico.component';
import { DiagnosticoRoutingModule } from './diagnostico-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearDiagnosticoComponent } from './crear-diagnostico/crear-diagnostico.component';
import { EditarDiagnosticoComponent } from './editar-diagnostico/editar-diagnostico.component';



@NgModule({
  declarations: [
    DiagnosticoComponent,
    CrearDiagnosticoComponent,
    EditarDiagnosticoComponent
  ],
  imports: [
    CommonModule,
    DiagnosticoRoutingModule,
    SharedModule,
  ]
})
export class DiagnosticoModule { }
