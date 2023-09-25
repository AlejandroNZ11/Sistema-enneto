import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarMedicoComponent } from './agregar-medico.component';
import { AgregarMedicoRoutingModule } from './agregar-medico-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AgregarMedicoComponent
  ],
  imports: [
    CommonModule,
    AgregarMedicoRoutingModule,
    SharedModule
  ]
})
export class AgregarMedicoModule { }
