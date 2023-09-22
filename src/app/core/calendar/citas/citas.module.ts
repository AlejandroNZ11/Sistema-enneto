import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasComponent } from './citas.component';
import { CitasRoutingModule } from './citas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CitasComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    SharedModule
  ]
})
export class CitasModule { }
