import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MedicoComponent } from './medico.component';


const routes: Routes = [
  { path: '', component: MedicoComponent,
  children: [
    {
      path: 'lista-medico',
      loadChildren: () =>
        import('./lista-medico/lista-medico.module').then(
          (m) => m.ListaMedicoModule
        ),
    },
    {
      path: 'agregar-medico',
      loadChildren: () =>
        import('./agregar-medico/agregar-medico.module').then((m) => m.AgregarMedicoModule),
    },
    {
      path: 'editar-medico/:medicoId',
      loadChildren: () =>
        import('./editar-medico/editar-medico.module').then(
          (m) => m.EditarMedicoModule
        ),
    },
    {
      path: 'perfil-medico',
      loadChildren: () =>
        import('./perfil-medico/perfil-medico.module').then(
          (m) => m.PerfilMedicoModule
        ),
    },
  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
