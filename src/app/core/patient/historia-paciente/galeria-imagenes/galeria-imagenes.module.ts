import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GaleriaImagenesRoutingModule } from './galeria-imagenes-routing.module';
import { GaleriaImagenesComponent } from './galeria-imagenes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarGaleriaImagenesComponent } from './agregar-galeria-imagenes/agregar-galeria-imagenes.component';


@NgModule({
  declarations: [
    GaleriaImagenesComponent,
    AgregarGaleriaImagenesComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    GaleriaImagenesRoutingModule
  ]
})
export class GaleriaImagenesModule { }
