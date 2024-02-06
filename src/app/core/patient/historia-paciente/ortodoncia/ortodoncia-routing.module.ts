import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrtodonciaComponent } from './ortodoncia.component';


const routes: Routes =
[
  {
    path: '',
    component: OrtodonciaComponent,
    children:[
    {
      path:'analisis-general/:pacienteId',
      loadChildren:() =>
      import('./analisis-general/analisis-general.module').then((m)=>m.AnalisisGeneralModule),
    },
    {
      path:'analisis-facial/:pacienteId',
      loadChildren:() =>
      import('./analisis-facial/analisis-facial.module').then((m)=>m.AnalisisFacialModule),
    },
    {
      path:'analisis-oclusal1/:pacienteId',
      loadChildren:() =>
      import('./analisis-oclusal1/analisis-oclusal1.module').then((m)=>m.AnalisisOclusal1Module),
    },
    {
      path:'analisis-oclusal2/:pacienteId',
      loadChildren:() =>
      import('./analisis-oclusal2/analisis-oclusal2.module').then((m)=>m.AnalisisOclusal2Module),
    },
    {
      path:'analisis-cefalometrico/:pacienteId',
      loadChildren:() =>
      import('./analisis-cefalometrico/analisis-cefalometrico.module').then((m)=>m.AnalisisCefalometricoModule),
    }
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrtodonciaRoutingModule { }
