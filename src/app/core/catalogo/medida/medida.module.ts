import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarMedidaComponent } from './agregar-medida/agregar-medida.component';
import { EditarMedidaComponent } from './editar-medida/editar-medida.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MedidaRoutingModule } from './medida-routing.module';
import { MedidaComponent } from './medida.component';


@NgModule({
  declarations: [
    MedidaComponent,
    AgregarMedidaComponent,
    EditarMedidaComponent
  ],
  imports: [
    MatSortModule,
    CommonModule,
    SharedModule,
    MedidaRoutingModule
  ]
})
export class MedidaModule { }
