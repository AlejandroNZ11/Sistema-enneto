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
    {
      path: 'alergias',
      loadChildren: () =>
        import('./alergias/alergias.module').then(
          (m) => m.AlergiasModule
        ),
    },
    {
      path: 'medida',
      loadChildren: () =>
        import('./medida/medida.module').then(
          (m) => m.MedidaModule
        ),
    },
    {
      path: 'tipo-citado',
      loadChildren: () =>
        import('./tipo-citado/tipo-citado.module').then(
          (m) => m.TipoCitadoModule
        ),
    },
    {
      path: 'tipo-concepto',
      loadChildren: () =>
        import('./tipo-concepto/tipo-concepto.module').then(
          (m) => m.TipoConceptoModule
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
