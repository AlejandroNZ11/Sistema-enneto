import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CajaComponent } from './caja.component';
import { CajaRoutingModule } from './caja-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditarCajaComponent } from './editar-caja/editar-caja.component';
import { AgregarCajaComponent } from './agregar-caja/agregar-caja.component';


@NgModule({
  declarations: [
    CajaComponent,
    EditarCajaComponent,
    AgregarCajaComponent,
  ],
  imports: [
    CommonModule,
    CajaRoutingModule,
    SharedModule
  ]
})
export class CajaModule { }
