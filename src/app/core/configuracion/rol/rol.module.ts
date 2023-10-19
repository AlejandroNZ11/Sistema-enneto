import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolComponent } from './rol.component';
import { RolRoutingModule } from './rol-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarRolesComponent } from './agregar-roles/agregar-roles.component';
import { EditarRolesComponent } from './editar-roles/editar-roles.component';



@NgModule({
  declarations: [
    RolComponent,
    AgregarRolesComponent,
    EditarRolesComponent
  ],
  imports: [
    CommonModule,
    RolRoutingModule,
    SharedModule
  ]
})
export class RolModule { }
