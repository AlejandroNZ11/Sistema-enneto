import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SedeComponent } from './sede.component';
import { SedeRoutingModule } from './sede-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarSedeComponent } from './agregar-sede/agregar-sede.component';
import { EditarSedeComponent } from './editar-sede/editar-sede.component';



@NgModule({
  declarations: [
    SedeComponent,
    AgregarSedeComponent,
    EditarSedeComponent
  ],
  imports: [
    CommonModule,
    SedeRoutingModule,
    SharedModule,
  ]
})
export class SedeModule { }
