import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionComponent } from './configuracion.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ConfiguracionComponent,
  children: [
    {
      path: 'clinica',
      loadChildren: () =>
        import('./clinica/clinica.module').then(
          (m) => m.ClinicaModule
        ),
    },
    {
      path: 'permiso',
      loadChildren: () =>
        import('./permiso/permiso.module').then(
          (m) => m.PermisoModule),
    },
    {
      path: 'rol',
      loadChildren: () =>
        import('./rol/rol.module').then(
          (m) => m.RolModule
        ),
    },
    {
      path: 'sede',
      loadChildren: () =>
        import('./sede/sede.module').then(
          (m) => m.SedeModule
        ),
    },
    {
      path: 'tipo-documento',
      loadChildren: () =>
        import('./tipo-documento/tipo-documento.module').then(
          (m) => m.TipoDocumentoModule
        ),
    },
    {
      path: 'usuario',
      loadChildren: () =>
        import('./usuario/usuario.module').then(
          (m) => m.UsuarioModule
        ),
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionRoutingModule { }
