import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CajaComponent } from './caja.component';

const routes: Routes = [
  { path: '', component: CajaComponent,
  children: [
    {
      path: 'cierre',
      loadChildren: () =>
        import('./cierre/cierre.module').then(
          (m) => m.CierreModule
        ),
    },
    {
      path: 'cobro-presupuesto',
      loadChildren: () =>
        import('./cobro-presupuesto/cobro-presupuesto.module').then(
          (m) => m.CobroPresupuestoModule),
    },
    {
      path: 'cobro-consulta',
      loadChildren: () =>
        import('./cobro-consulta/cobro-consulta.module').then(
          (m) => m.CobroConsultaModule
        ),
    },
    {
      path: 'gastos',
      loadChildren: () =>
        import('./gastos/gastos.module').then(
          (m) => m.GastosModule
        ),
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CajaRoutingModule { }
