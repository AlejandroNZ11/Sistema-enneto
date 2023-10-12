import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoGastosComponent } from './tipo-gastos.component';
import { TipoGastosRoutingModule } from './tipo-gastos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarTipoGastosComponent } from './agregar-tipo-gastos/agregar-tipo-gastos.component';
import { EditarTipoGastosComponent } from './editar-tipo-gastos/editar-tipo-gastos.component';



@NgModule({
  declarations: [
    TipoGastosComponent,
    AgregarTipoGastosComponent,
    EditarTipoGastosComponent
  ],
  imports: [
    CommonModule,
    TipoGastosRoutingModule,
    SharedModule,
  ]
})
export class TipoGastosModule { }
