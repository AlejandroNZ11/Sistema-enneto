import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicaComponent } from './clinica.component';
import { ClinicaRoutingModule } from './clinica-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ClinicaComponent
  ],
  imports: [
    CommonModule,
    ClinicaRoutingModule,
    SharedModule
  ]
})
export class ClinicaModule { }
