import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdontogramaRoutingModule } from './odontograma-routing.module';
import { OdontogramaComponent } from './odontograma.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OdontogramaHallazgosComponent } from './odontograma-hallazgos/odontograma-hallazgos.component';
import { AgregarHallazgo2Component } from './agregar-hallazgo2/agregar-hallazgo2.component';
import { AgregarHallazgo3Component } from './agregar-hallazgo3/agregar-hallazgo3.component';
import { EditarHallazgo1Component } from './editar/editar-hallazgo1/editar-hallazgo1.component';
import { EditarHallazgo2Component } from './editar/editar-hallazgo2/editar-hallazgo2.component';
import { EditarHallazgo3Component } from './editar/editar-hallazgo3/editar-hallazgo3.component';


@NgModule({
  declarations: [
    OdontogramaComponent,
    OdontogramaHallazgosComponent,
    AgregarHallazgo2Component,
    AgregarHallazgo3Component,
    EditarHallazgo1Component,
    EditarHallazgo2Component,
    EditarHallazgo3Component
  ],
  imports: [
    CommonModule,
    OdontogramaRoutingModule,
    SharedModule
  ]
})
export class OdontogramaModule { }
