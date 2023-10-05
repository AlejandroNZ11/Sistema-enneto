import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioComponent } from './inventario.component';
import { InventarioRoutingModule } from './inventario-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    InventarioComponent,
  ],
  imports: [
    MatSortModule,
    CommonModule,
    InventarioRoutingModule,
    SharedModule,
  ]
})
export class InventarioModule { }
