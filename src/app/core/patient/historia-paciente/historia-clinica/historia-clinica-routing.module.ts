import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriaClinicaComponent } from './historia-clinica.component';





const routes: Routes = [
  {
    path: '',
    component: HistoriaClinicaComponent,
    children: [
      {
        path: 'antecedentes/:pacienteId',
        loadChildren: () =>
          import('./antecedentes/antecedentes.module').then((m) => m.AntecedentesModule),
      },
      {
        path: 'consulta-salud/:pacienteId',
        loadChildren: () =>
          import('./consulta-salud/consulta-salud.module').then((m) => m.ConsultaSaludModule),
      },
      {
        path: 'exploracion-fisica/:pacienteId',
        loadChildren: () =>
          import('./exploracion-fisica/exploracion-fisica.module').then((m) => m.ExploracionFisicaModule),
      },
      {
        path: 'alergia/:pacienteId',
        loadChildren: () =>
          import('./alergia/alergia.module').then((m) => m.AlergiaModule),
      },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HistoriaClinicaRoutingModule { }
