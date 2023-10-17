import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadesComponent } from './unidades.component';
import { UnidadesRoutingModule } from './unidades-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarUnidadesComponent } from './agregar-unidades/agregar-unidades.component';
import { EditarUnidadesComponent } from './editar-unidades/editar-unidades.component';



@NgModule({
  declarations: [
    UnidadesComponent,
    AgregarUnidadesComponent,
    EditarUnidadesComponent
  ],
  imports: [
    CommonModule,
    UnidadesRoutingModule,
    SharedModule,
  ]
})
export class UnidadesModule { }
