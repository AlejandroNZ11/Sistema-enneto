import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisoComponent } from './permiso.component';
import { PermisoRoutingModule } from './permiso-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    PermisoComponent
  ],
  imports: [
    CommonModule,
    PermisoRoutingModule,
    SharedModule
  ]
})
export class PermisoModule { }
