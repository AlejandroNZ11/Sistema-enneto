import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicoComponent } from './medico.component';
import { MedicoRoutingModule } from './medico-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MedicoComponent
  ],
  imports: [
    CommonModule,
    MedicoRoutingModule,
    SharedModule,
  ]
})
export class MedicoModule { }
