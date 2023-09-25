import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaMedicoComponent } from './lista-medico.component';
import { ListaMedicoRoutingModule } from './lista-medico-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ListaMedicoComponent
  ],
  imports: [
    CommonModule,
    ListaMedicoRoutingModule,
    SharedModule
  ]
})
export class ListaMedicoModule { }
