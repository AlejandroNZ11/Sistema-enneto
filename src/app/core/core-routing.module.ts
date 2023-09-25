import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
import { Auth0Guard } from '../shared/guard/auth0.guard';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    canActivate: [Auth0Guard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'catalogo',
        loadChildren: () =>
          import('./catalogo/catalogo.module').then((m) => m.CatalogoModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'medico',
        loadChildren: () =>
          import('./medico/medico.module').then((m) => m.MedicoModule),
      },
      {
        path: 'paciente',
        loadChildren: () =>
          import('./patient/patient.module').then((m) => m.PatientModule),
      },
      {
        path: 'caja',
        loadChildren: () =>
          import('./caja/caja.module').then((m) => m.CajaModule),
      },
      {
        path: 'configuracion',
        loadChildren: () =>
          import('./configuracion/configuracion.module').then((m) => m.ConfiguracionModule),
      },
      {
        path: 'mantenimiento',
        loadChildren: () =>
          import('./mantenimiento/mantenimiento.module').then((m) => m.MantenimientoModule),
      },
      {
        path: 'movimiento',
        loadChildren: () =>
          import('./movimiento/movimiento.module').then((m) => m.MovimientoModule),
      },
      {
        path: 'operaciones',
        loadChildren: () =>
          import('./operaciones/operaciones.module').then((m) => m.OperacionesModule),
      },
      {
        path: 'reportes',
        loadChildren: () =>
          import('./reportes/reportes.module').then((m) => m.ReportesModule),
      },
      {
        path: 'calendario',
        loadChildren: () =>
          import('./calendar/calendar.module').then((m) => m.CalendarModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
