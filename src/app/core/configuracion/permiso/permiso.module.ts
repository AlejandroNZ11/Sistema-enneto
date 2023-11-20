import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisoComponent } from './permiso.component';
import { PermisoRoutingModule } from './permiso-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarPermisoComponent } from './agregar-permiso/agregar-permiso.component';
import { EditarPermisoComponent } from './editar-permiso/editar-permiso.component';



@NgModule({
  declarations: [
    PermisoComponent,
    AgregarPermisoComponent,
    EditarPermisoComponent
  ],
  imports: [
    CommonModule,
    PermisoRoutingModule,
    SharedModule
  ]
})
export class PermisoModule { }
