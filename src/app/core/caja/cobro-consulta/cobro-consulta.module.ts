import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CobroConsultaComponent } from './cobro-consulta.component';
import { CobroConsultaRoutingModule } from './cobro-consulta-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CobroConsultaComponent
  ],
  imports: [
    CommonModule,
    CobroConsultaRoutingModule,
    SharedModule
  ]
})
export class CobroConsultaModule { }
