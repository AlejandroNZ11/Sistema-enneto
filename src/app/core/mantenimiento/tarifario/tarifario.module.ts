import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarifarioComponent } from './tarifario.component';
import { TarifarioRoutingModule } from './tarifario-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TarifarioComponent
  ],
  imports: [
    CommonModule,
    TarifarioRoutingModule,
    SharedModule,
  ]
})
export class TarifarioModule { }
