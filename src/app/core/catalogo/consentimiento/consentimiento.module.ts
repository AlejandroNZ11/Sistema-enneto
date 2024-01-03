import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsentimientoComponent } from './consentimiento.component';
import { ConsentimientoRoutingModule } from './consentimiento-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarConsentimientoComponent } from './agregar-consentimiento/agregar-consentimiento.component';



@NgModule({
  declarations: [
    ConsentimientoComponent,
    AgregarConsentimientoComponent,
  ],
  imports: [
    CommonModule,
    ConsentimientoRoutingModule,
    SharedModule,
  ]
})
export class ConsentimientoModule { }
