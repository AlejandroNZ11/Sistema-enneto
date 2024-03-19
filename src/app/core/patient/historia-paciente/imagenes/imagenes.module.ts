import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagenesRoutingModule } from './imagenes-routing.module';
import { ImagenesComponent } from './imagenes.component';
import { AgregarImagenComponent } from './agregar-imagen/agregar-imagen.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ImagenesComponent,
    AgregarImagenComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ImagenesRoutingModule
  ]
})
export class ImagenesModule { }
