import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OdontogramaComponent } from './odontograma.component';

const routes: Routes = [
  {
    path: '',
    component: OdontogramaComponent,
    children:[
      {
        path:'odontograma-inicial/:pacienteId',
        loadChildren:() => import('./odontograma-inicial/odontograma-inicial.module').then((m) => m.OdontogramaInicialModule)
      },
      {
        path:'odontograma-evolucion/:pacienteId',
        loadChildren:() => import('./odontograma-evolucion/odontograma-evolucion.module').then((m) => m.OdontogramaEvolucionModule)
      },
      {
        path:'odontograma-alta/:pacienteId',
        loadChildren:() => import('./odontograma-alta/odontograma-alta.module').then((m) => m.OdontogramaAltaModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OdontogramaRoutingModule { }
