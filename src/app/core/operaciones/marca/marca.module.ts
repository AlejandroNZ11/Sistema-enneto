import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcaComponent } from './marca.component';
import { MarcaRoutingModule } from './marca-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarMarcaComponent } from './agregar-marca/agregar-marca.component';
import { EditarMarcaComponent } from './editar-marca/editar-marca.component';



@NgModule({
  declarations: [
    MarcaComponent,
    AgregarMarcaComponent,
    EditarMarcaComponent
  ],
  imports: [
    CommonModule,
    MarcaRoutingModule,
    SharedModule,
  ]
})
export class MarcaModule { }
