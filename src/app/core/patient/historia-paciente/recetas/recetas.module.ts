import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecetasRoutingModule } from './recetas-routing.module';
import { RecetasComponent } from './recetas.component';
import { AgregarRecetaComponent } from './agregar-receta/agregar-receta.component';
import { EditarRecetaComponent } from './editar-receta/editar-receta.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RecetasComponent,
    AgregarRecetaComponent,
    EditarRecetaComponent,
  ],
  imports: [
    CommonModule,
    RecetasRoutingModule,
    SharedModule,
  ]
})
export class RecetasModule { }
