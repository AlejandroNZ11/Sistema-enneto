import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsentimientoComponent } from './consentimiento.component';
import { ConsentimientoRoutingModule } from './consentimiento-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ConsentimientoComponent,
  ],
  imports: [
    CommonModule,
    ConsentimientoRoutingModule,
    SharedModule,
  ]
})
export class ConsentimientoModule { }
