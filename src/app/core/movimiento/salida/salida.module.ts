import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalidaComponent } from './salida.component';
import { SalidaRoutingModule } from './salida-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SalidaComponent,
  ],
  imports: [
    CommonModule,
    SalidaRoutingModule,
    SharedModule,
  ]
})
export class SalidaModule { }
