import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarEspecialidadComponent } from './agregar-especialidad/agregar-especialidad.component';
import { EditarEspecialidadComponent } from './editar-especialidad/editar-especialidad.component';
import { EspecialidadesComponent } from './especialidades.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { EspecialidadesRoutingModule } from './especialidades-routing.module';



@NgModule({
  declarations: [
    EspecialidadesComponent,
    AgregarEspecialidadComponent,
    EditarEspecialidadComponent
  ],
  imports: [
    MatSortModule,
    CommonModule,
    EspecialidadesRoutingModule,
    SharedModule,
  ]
})
export class EspecialidadesModule { }
