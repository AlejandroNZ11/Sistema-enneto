import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorComponent } from './proveedor.component';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarProveedorComponent } from './agregar-proveedor/agregar-proveedor.component';



@NgModule({
  declarations: [
    ProveedorComponent,
    AgregarProveedorComponent
  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    SharedModule
  ]
})
export class ProveedorModule { }
