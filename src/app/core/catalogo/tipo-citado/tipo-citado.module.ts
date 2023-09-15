import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { TipoCitadoRoutingModule } from './tipo-citado-routing.module';
import { TipoCitadoComponent } from './tipo-citado.component';
import { AgregarTipoCitadoComponent } from './agregar-tipo-citado/agregar-tipo-citado.component';
import { EditarTipoCitadoComponent } from './editar-tipo-citado/editar-tipo-citado.component';


@NgModule({
  declarations: [
    TipoCitadoComponent,
    AgregarTipoCitadoComponent,
    EditarTipoCitadoComponent,
  ],
  imports: [
    MatSortModule,
    CommonModule,
    SharedModule,
    TipoCitadoRoutingModule
  ]
})
export class TipoCitadoModule { }
