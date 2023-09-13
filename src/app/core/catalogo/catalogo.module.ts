import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria/categoria.component';
import { CatalogoComponent } from './catalogo.component';
import { CatalogoRoutingModule } from './catalogo-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EspecialidadesComponent } from './especialidades/especialidades.component';


@NgModule({
  declarations: [
    CatalogoComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    CatalogoRoutingModule
  ]
})
export class CatalogoModule { }
