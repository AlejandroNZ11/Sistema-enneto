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
        path: 'odontograma',
        loadChildren: () =>
          import('./odontograma/odontograma.module').then((m) => m.OdontogramaModule),
      },
      {
        path:'historia-clinica',
        loadChildren:()=>
        import('./historia-clinica/historia-clinica.module').then((m) => m.HistoriaClinicaModule)
      },
      {
        path:'ortodoncia',
        loadChildren:()=>
        import('./ortodoncia/ortodoncia.module').then((m) => m.OrtodonciaModule)
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
      {
        path: 'imagenes/:pacienteId',
        loadChildren: () =>
          import('./imagenes/imagenes.module').then((m) => m.ImagenesModule),
      },
      {
        path: 'galeria-imagenes/:pacientId',
        loadChildren: () =>
          import('./galeria-imagenes/galeria-imagenes.module').then((m) => m.GaleriaImagenesModule),
      },
      {
        path: 'consentimiento/:pacienteId',
        loadChildren: () =>
          import('./consentimiento/consentimiento.module').then((m) => m.ConsentimientoModule),
      },
      {
        path: 'recetas/:pacienteId',
        loadChildren: () =>
          import('./recetas/recetas.module').then((m) => m.RecetasModule),
      },
    ],
  },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HistoriaPacienteRoutingModule { }
