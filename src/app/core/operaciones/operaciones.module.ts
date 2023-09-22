import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos/productos.component';
import { MarcaComponent } from './marca/marca.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { TipoMaterialesComponent } from './tipo-materiales/tipo-materiales.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { OperacionesComponent } from './operaciones.component';
import { OperacionesRoutingModule } from './operaciones-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    OperacionesComponent
  ],
  imports: [
    CommonModule,
    OperacionesRoutingModule,
    SharedModule
  ]
})
export class OperacionesModule { }
