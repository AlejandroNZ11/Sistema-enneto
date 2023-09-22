import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo.component';

const routes: Routes = [
  {
    path: '', component: CatalogoComponent,
    children: [
      {
        path: 'categoria',
        loadChildren: () =>
          import('./categoria/categoria.module').then(
            (m) => m.CategoriaModule
          ),
      },
      {
        path: 'especialidad',
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
      {
        path: 'clientes',
        loadChildren: () =>
          import('./clientes/clientes.module').then(
            (m) => m.ClientesModule
          ),
      },
      {
        path: 'apoderado',
        loadChildren: () =>
          import('./apoderado/apoderado.module').then(
            (m) => m.ApoderadoModule
          ),
      },
      {
        path: 'consentimiento',
        loadChildren: () =>
          import('./consentimiento/consentimiento.module').then(
            (m) => m.ConsentimientoModule
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
