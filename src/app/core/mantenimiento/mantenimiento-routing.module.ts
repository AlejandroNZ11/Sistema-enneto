import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoComponent } from './mantenimiento.component';
const routes: Routes = [
  {
    path: '', component: MantenimientoComponent,
    children: [
      {
        path: 'banco',
        loadChildren: () =>
          import('./banco/banco.module').then(
            (m) => m.BancoModule
          ),
      },
      {
        path: 'cuenta',
        loadChildren: () =>
          import('./cuenta/cuenta.module').then((m) => m.CuentaModule),
      },
      {
        path: 'diagnostico',
        loadChildren: () =>
          import('./diagnostico/diagnostico.module').then(
            (m) => m.DiagnosticoModule
          ),
      },
      {
        path: 'moneda',
        loadChildren: () =>
          import('./moneda/moneda.module').then(
            (m) => m.MonedaModule
          ),
      },
      {
        path: 'tarifario',
        loadChildren: () =>
          import('./tarifario/tarifario.module').then(
            (m) => m.TarifarioModule
          ),
      },
      {
        path: 'tipo-tarjeta',
        loadChildren: () =>
          import('./tipo-tarjeta/tipo-tarjeta.module').then(
            (m) => m.TarjetaModule
          ),
      },
      {
        path: 'tipo-gastos',
        loadChildren: () =>
          import('./tipo-gastos/tipo-gastos.module').then(
            (m) => m.TipoGastosModule
          ),
      },
      {
        path: 'tipo-pago',
        loadChildren: () =>
          import('./tipo-pago/tipo-pago.module').then(
            (m) => m.TipoPagoModule
          ),
      },
      {
        path: 'caja',
        loadChildren: () =>
          import('./caja/caja.module').then(
            (m) => m.CajaModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimientoRoutingModule { }
