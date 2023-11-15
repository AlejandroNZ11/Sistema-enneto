import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarProductosComponent } from './agregar-productos/agregar-productos.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';



@NgModule({
  declarations: [
    ProductosComponent,
    AgregarProductosComponent,
    EditarProductoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule
  ]
})
export class ProductosModule { }
