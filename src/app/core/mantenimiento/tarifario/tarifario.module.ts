import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarifarioComponent } from './tarifario.component';
import { TarifarioRoutingModule } from './tarifario-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarTarifarioComponent } from './agregar-tarifario/agregar-tarifario.component';



@NgModule({
  declarations: [
    TarifarioComponent,
    AgregarTarifarioComponent
  ],
  imports: [
    CommonModule,
    TarifarioRoutingModule,
    SharedModule,
  ]
})
export class TarifarioModule { }
