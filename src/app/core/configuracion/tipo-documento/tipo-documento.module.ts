import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoDocumentoComponent } from './tipo-documento.component';
import { TipoDocumentoRoutingModule } from './tipo-documento-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TipoDocumentoComponent
  ],
  imports: [
    CommonModule,
    TipoDocumentoRoutingModule,
    SharedModule,
  ]
})
export class TipoDocumentoModule { }
