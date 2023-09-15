import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { TipoConceptoRoutingModule } from './tipo-concepto-routing.module';
import { TipoConceptoComponent } from './tipo-concepto.component';
import { AgregarTipoConceptoComponent } from './agregar-tipo-concepto/agregar-tipo-concepto.component';
import { EditarTipoConceptoComponent } from './editar-tipo-concepto/editar-tipo-concepto.component';


@NgModule({
  declarations: [
    TipoConceptoComponent,
    AgregarTipoConceptoComponent,
    EditarTipoConceptoComponent,
  ],
  imports: [
    MatSortModule,
    CommonModule,
    SharedModule,
    TipoConceptoRoutingModule
  ]
})
export class TipoConceptoModule { }
