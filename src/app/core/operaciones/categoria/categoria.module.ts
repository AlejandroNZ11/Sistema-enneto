import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriaComponent } from './categoria.component';


@NgModule({
  declarations: [
   CategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    SharedModule,
  ]
})
export class CategoriaModule { }
