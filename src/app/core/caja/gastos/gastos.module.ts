import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GastosComponent } from './gastos.component';
import { GastosRoutingModule } from './gastos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarGastosComponent } from './agregar-gastos/agregar-gastos.component';
import { EditarGastosComponent } from './editar-gastos/editar-gastos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GastosComponent,
    AgregarGastosComponent,
    EditarGastosComponent
  ],
  imports: [
    CommonModule,
    GastosRoutingModule,
    SharedModule,
    FormsModule, ReactiveFormsModule 
  ]
})
export class GastosModule { }
