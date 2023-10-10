import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovimientoComponent } from './movimiento.component';
const routes: Routes = [
  { path: '', component: MovimientoComponent,
  children: [
    {
      path: 'almacen',
      loadChildren: () =>
        import('./almacen/almacen.module').then(
          (m) => m.AlmacenModule
        ),
    },
    {
      path: 'compras',
      loadChildren: () =>
        import('./compras/compras.module').then((m) => m.ComprasModule),
    },
    {
      path: 'salida',
      loadChildren: () =>
        import('./salida/salida.module').then(
          (m) => m.SalidaModule
        ),
    },
    {
      path: 'ventas',
      loadChildren: () =>
        import('./ventas/ventas.module').then(
          (m) => m.VentasModule
        ),
    },
    {
      path: 'inventario',
      loadChildren: () =>
        import('./inventario/inventario.module').then(
          (m) => m.InventarioModule
        ),
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimientoRoutingModule { }
