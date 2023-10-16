import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriaComponent } from './categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { AgregarCategoriaComponent } from './agregar-categoria/agregar-categoria.component';


@NgModule({
  declarations: [
   CategoriaComponent,
   EditarCategoriaComponent,
   AgregarCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    SharedModule,
  ]
})
export class CategoriaModule { }
