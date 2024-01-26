import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriaPacienteComponent } from './historia-paciente.component';

const routes: Routes = [
  {
    path: '',
    component: HistoriaPacienteComponent,
    children: [
      {
        path: 'filiacion/:pacienteId',
        loadChildren: () =>
          import('./filiación/filiación.module').then((m) => m.FiliacionModule),
      },
      {
        path:'historia-clinica',
        loadChildren:()=>
        import('./historia-clinica/historia-clinica.module').then((m) => m.HistoriaClinicaModule)
      },
      {
        path: 'diagnostico/:pacienteId',
        loadChildren: () =>
          import('./diagnostico/diagnostico.module').then((m) => m.DiagnosticoModule),
      },
      {
        path: 'evolucion/:pacienteId',
        loadChildren: () =>
          import('./evolucion/evolucion.module').then((m) => m.EvolucionModule),
      },
    ],
  },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HistoriaPacienteRoutingModule { }
