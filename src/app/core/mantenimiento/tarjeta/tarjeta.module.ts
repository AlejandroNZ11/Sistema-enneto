import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaComponent } from './tarjeta.component';
import { TarjetaRoutingModule } from './tarjeta-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TarjetaComponent
  ],
  imports: [
    CommonModule,
    TarjetaRoutingModule,
    SharedModule,
  ]
})
export class TarjetaModule { }
