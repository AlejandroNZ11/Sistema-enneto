import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportesComponent } from './reportes.component';
const routes: Routes = [
  { path: '', component: ReportesComponent,
  children: [
    {
      path: 'comision-medico',
      loadChildren: () =>
        import('./comision-medico/comision-medico.module').then(
          (m) => m.ComisionMedicoModule
        ),
    },
    {
      path: 'control',
      loadChildren: () =>
        import('./control/control.module').then((m) => m.ControlModule),
    },
    {
      path: 'produccion-medico',
      loadChildren: () =>
        import('./produccion-medico/produccion-medico.module').then(
          (m) => m.ProduccionMedicoModule
        ),
    },
    {
      path: 'productividad',
      loadChildren: () =>
        import('./productividad/productividad.module').then(
          (m) => m.ProductividadModule
        ),
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule { }
