import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';
import { HistoriaClinicaComponent } from './historia-clinica.component';
import { HistoriaClinicaRoutingModule } from './historia-clinica-routing.module';
import { ConsultaSaludComponent } from './consulta-salud/consulta-salud.component';
import { ExploracionFisicaComponent } from './exploracion-fisica/exploracion-fisica.component';
import { AlergiaComponent } from './alergia/alergia.component';



@NgModule({
  declarations: [
    HistoriaClinicaComponent,
    ConsultaSaludComponent,
    ExploracionFisicaComponent,
    AlergiaComponent
  ],
  imports: [
    CommonModule,
    HistoriaClinicaRoutingModule,
    SharedModule
  ]
})
export class HistoriaClinicaModule { }
