import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApoderadoComponent } from './apoderado.component';
import { ApoderadoRoutingModule } from './apoderado-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ApoderadoComponent
  ],
  imports: [
    CommonModule,
    ApoderadoRoutingModule,
    SharedModule,
  ]
})
export class ApoderadoModule { }
