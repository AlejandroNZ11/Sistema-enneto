import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarMedicoComponent } from './editar-medico.component';
import { EditarMedicoRoutingModule } from './editar-medico-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    EditarMedicoComponent
  ],
  imports: [
    CommonModule,
    EditarMedicoRoutingModule,
    SharedModule
  ]
})
export class EditarMedicoModule { }
