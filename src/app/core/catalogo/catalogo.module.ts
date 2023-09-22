import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria/categoria.component';
import { CatalogoComponent } from './catalogo.component';
import { CatalogoRoutingModule } from './catalogo-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { MedidaComponent } from './medida/medida.component';
import { TipoConceptoComponent } from './tipo-concepto/tipo-concepto.component';
import { AgregarTipoConceptoComponent } from './tipo-concepto/agregar-tipo-concepto/agregar-tipo-concepto.component';
import { EditarTipoConceptoComponent } from './tipo-concepto/editar-tipo-concepto/editar-tipo-concepto.component';
import { TipoCitadoComponent } from './tipo-citado/tipo-citado.component';
import { AgregarTipoCitadoComponent } from './tipo-citado/agregar-tipo-citado/agregar-tipo-citado.component';
import { EditarTipoCitadoComponent } from './tipo-citado/editar-tipo-citado/editar-tipo-citado.component';
import { AlergiasComponent } from './alergias/alergias.component';
import { AgregarAlergiasComponent } from './alergias/agregar-alergias/agregar-alergias.component';
import { EditarAlergiasComponent } from './alergias/editar-alergias/editar-alergias.component';




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
