import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarCategoriaComponent } from './agregar-categoria/agregar-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { CategoriaComponent } from './categoria.component';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
      CategoriaComponent,
      AgregarCategoriaComponent,
      EditarCategoriaComponent,
  ],
  imports: [
    MatSortModule,
    CommonModule,
    SharedModule,
    CategoriaRoutingModule,
  ]
})
export class CategoriaModule { }
