import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicaComponent } from './clinica.component';
import { ClinicaRoutingModule } from './clinica-routing.module';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregrarClinicaComponent } from './agregrar-clinica/agregrar-clinica.component';
import { EditarClinicaComponent } from './editar-clinica/editar-clinica.component';



@NgModule({
  declarations: [
    ClinicaComponent,
    AgregrarClinicaComponent,
    EditarClinicaComponent
  ],
  imports: [
    MatSortModule,
    CommonModule,
    ClinicaRoutingModule,
    SharedModule
  ]
})
export class ClinicaModule { }
