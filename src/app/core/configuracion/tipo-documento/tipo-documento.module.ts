import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoDocumentoComponent } from './tipo-documento.component';
import { TipoDocumentoRoutingModule } from './tipo-documento-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarDocumentoComponent } from './agregar-documento/agregar-documento.component';
import { EditarDocumentoComponent } from './editar-documento/editar-documento.component';



@NgModule({
  declarations: [
    TipoDocumentoComponent,
    AgregarDocumentoComponent,
    EditarDocumentoComponent
  ],
  imports: [
    CommonModule,
    TipoDocumentoRoutingModule,
    SharedModule,
  ]
})
export class TipoDocumentoModule { }
