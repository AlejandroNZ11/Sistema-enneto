import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasComponent } from './ventas/ventas.component';
import { SalidaComponent } from './salida/salida.component';
import { ComprasComponent } from './compras/compras.component';
import { InventarioComponent } from './inventario/inventario.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { MovimientoComponent } from './movimiento.component';
import { MovimientoRoutingModule } from './movimiento-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    MovimientoComponent,
  ],
  imports: [
    CommonModule,
    MovimientoRoutingModule,
    SharedModule,
  ]
})
export class MovimientoModule { }
