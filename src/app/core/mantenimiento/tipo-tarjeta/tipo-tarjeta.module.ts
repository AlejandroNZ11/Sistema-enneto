import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoTarjetaComponent } from './tipo-tarjeta.component';
import { TarjetaRoutingModule } from './tipo-tarjeta-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarTarjetaComponent } from './agregar-tarjeta/agregar-tarjeta.component';
import { EditarTarjetaComponent } from './editar-tarjeta/editar-tarjeta.component';



@NgModule({
  declarations: [
    TipoTarjetaComponent,
    AgregarTarjetaComponent,
    EditarTarjetaComponent
  ],
  imports: [
    CommonModule,
    TarjetaRoutingModule,
    SharedModule,
  ]
})
export class TarjetaModule { }
