import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo.component';

const routes: Routes = [
  { path: '', component: CatalogoComponent,
  children: [
    {
      path: 'categoria',
      loadChildren: () =>
        import('./categoria/categoria.module').then(
          (m) => m.CategoriaModule
        ),
    },
    {
      path: 'especialidades',
      loadChildren: () =>
        import('./especialidades/especialidades.module').then(
          (m) => m.EspecialidadesModule
        ),
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogoRoutingModule { }
