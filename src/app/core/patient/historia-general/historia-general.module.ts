import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriaGeneralComponent } from './historia-general.component';
import { HistoriaGeneralRoutingModule } from './historia-general-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HistoriaGeneralComponent
  ],
  imports: [
    CommonModule,
    HistoriaGeneralRoutingModule,
    SharedModule
  ]
})
export class HistoriaGeneralModule { }
