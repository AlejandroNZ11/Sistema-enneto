import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioComponent } from './inventario.component';
import { InventarioRoutingModule } from './inventario-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { AgregarInventarioComponent } from './agregar-inventario/agregar-inventario.component';
import { EditarInventarioComponent } from './editar-inventario/editar-inventario.component';



@NgModule({
  declarations: [
    InventarioComponent,
    AgregarInventarioComponent,
    EditarInventarioComponent,
  ],
  imports: [
    MatSortModule,
    CommonModule,
    InventarioRoutingModule,
    SharedModule,
  ]
})
export class InventarioModule { }
