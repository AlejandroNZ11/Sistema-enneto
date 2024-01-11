import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiliacionComponent } from './filiacion.component';
import { FiliacionRoutingModule } from './filiacion-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FiliacionComponent
  ],
  imports: [
    CommonModule,
    FiliacionRoutingModule,
    SharedModule
  ]
})
export class FiliacionModule { }
