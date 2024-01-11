import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsentimientoComponent } from './consentimiento.component';
import { ConsentimientoRoutingModule } from './consentimiento-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarConsentimientoComponent } from './agregar-consentimiento/agregar-consentimiento.component';
import { EditarConsentimientoComponent } from './editar-consentimiento/editar-consentimiento.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


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
    AngularEditorModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ConsentimientoModule { }
