import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsentimientoComponent } from './consentimiento.component';
import { ConsentimientoRoutingModule } from './consentimiento-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarConsentimientoComponent } from './agregar-consentimiento/agregar-consentimiento.component';
import { EditarConsentimientoComponent } from './editar-consentimiento/editar-consentimiento.component';
import { NgxEditorModule } from 'ngx-editor';
@NgModule({
  declarations: [
    ConsentimientoComponent,
    AgregarConsentimientoComponent,
    EditarConsentimientoComponent,
  ],
  imports: [
    CommonModule,
    ConsentimientoRoutingModule,
    SharedModule,
    NgxEditorModule,
  ]
})
export class ConsentimientoModule { }
