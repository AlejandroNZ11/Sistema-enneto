import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoPagoComponent } from './tipo-pago.component';
import { TipoPagoRoutingModule } from './tipo-pago-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarTipoPagoComponent } from './agregar-tipo-pago/agregar-tipo-pago.component';
import { EditarTipoPagoComponent } from './editar-tipo-pago/editar-tipo-pago.component';



@NgModule({
  declarations: [
    TipoPagoComponent,
    AgregarTipoPagoComponent,
    EditarTipoPagoComponent,
  ],
  imports: [
    CommonModule,
    TipoPagoRoutingModule,
    SharedModule,
  ]
})
export class TipoPagoModule { }
