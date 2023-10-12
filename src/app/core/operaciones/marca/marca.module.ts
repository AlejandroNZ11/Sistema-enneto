import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcaComponent } from './marca.component';
import { MarcaRoutingModule } from './marca-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarMarcaComponent } from './agregar-marca/agregar-marca.component';



@NgModule({
  declarations: [
    MarcaComponent,
    AgregarMarcaComponent
  ],
  imports: [
    CommonModule,
    MarcaRoutingModule,
    SharedModule,
  ]
})
export class MarcaModule { }
