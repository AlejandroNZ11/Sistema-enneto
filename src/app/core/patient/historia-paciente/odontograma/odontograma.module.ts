import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OdontogramaRoutingModule } from './odontograma-routing.module';
import { OdontogramaComponent } from './odontograma.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OdontogramaHallazgosComponent } from './odontograma-hallazgos/odontograma-hallazgos.component';
import { AgregarHallazgo2Component } from './agregar-hallazgo2/agregar-hallazgo2.component';
import { AgregarHallazgo3Component } from './agregar-hallazgo3/agregar-hallazgo3.component';
import { EditarHallazgo1Component } from './lista-hallazgos/editar-hallazgo1/editar-hallazgo1.component';
import { AgregarHallazgo4Component } from './agregar-hallazgo-odontograma/agregar-hallazgo4/agregar-hallazgo4.component';
import { AgregarHallazgo5Component } from './agregar-hallazgo-odontograma/agregar-hallazgo5/agregar-hallazgo5.component';
import { AgregarHallazgo6Component } from './agregar-hallazgo-odontograma/agregar-hallazgo6/agregar-hallazgo6.component';
import { AgregarHallazgo7Component } from './agregar-hallazgo-odontograma/agregar-hallazgo7/agregar-hallazgo7.component';
import { CapturaOdontogramaComponent } from './captura-odontograma/captura-odontograma.component';


@NgModule({
  declarations: [
    OdontogramaComponent,
    OdontogramaHallazgosComponent,
    AgregarHallazgo2Component,
    AgregarHallazgo3Component,
    EditarHallazgo1Component,
    AgregarHallazgo4Component,
    AgregarHallazgo5Component,
    AgregarHallazgo6Component,
    AgregarHallazgo7Component,
    CapturaOdontogramaComponent
  ],
  imports: [
    CommonModule,
    OdontogramaRoutingModule,
    SharedModule
  ]
})
export class OdontogramaModule { }
