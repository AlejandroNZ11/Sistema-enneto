import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OperacionesComponent } from './operaciones.component';
const routes: Routes = [
  { path: '', component: OperacionesComponent,
  children: [
    {
      path: 'categoria',
      loadChildren: () =>
        import('./categoria/categoria.module').then(
          (m) => m.CategoriaModule
        ),
    },
    {
      path: 'marca',
      loadChildren: () =>
        import('./marca/marca.module').then((m) => m.MarcaModule),
    },
    {
      path: 'presentacion',
      loadChildren: () =>
        import('./presentacion/presentacion.module').then(
          (m) => m.PresentacionModule
        ),
    },
    {
      path: 'productos',
      loadChildren: () =>
        import('./productos/productos.module').then(
          (m) => m.ProductosModule
        ),
    },
    {
      path: 'proveedor',
      loadChildren: () =>
        import('./proveedor/proveedor.module').then(
          (m) => m.ProveedorModule
        ),
    },
    {
      path: 'tipo-materiales',
      loadChildren: () =>
        import('./tipo-materiales/tipo-materiales.module').then(
          (m) => m.TipoMaterialesModule
        ),
    },
    {
      path: 'unidades',
      loadChildren: () =>
        import('./unidades/unidades.module').then(
          (m) => m.UnidadesModule
        ),
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperacionesRoutingModule { }
