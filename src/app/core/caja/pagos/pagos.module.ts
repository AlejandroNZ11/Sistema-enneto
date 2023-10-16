import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagosComponent } from './pagos.component';
import { PagosRoutingModule } from './pagos-rounting.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { AgregarPagoComponent } from './agregar-pago/agregar-pago.component';


@NgModule({
  declarations: [
    PagosComponent,
    AgregarPagoComponent
  ],
  imports: [
    MatSortModule,
    CommonModule,
    SharedModule,
    PagosRoutingModule,
  ]
})
export class PagosModule { }