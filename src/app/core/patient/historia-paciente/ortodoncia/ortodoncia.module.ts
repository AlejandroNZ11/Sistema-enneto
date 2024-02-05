import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrtodonciaRoutingModule } from './ortodoncia-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { OrtodonciaComponent } from './ortodoncia.component';



@NgModule({
  declarations: [
    OrtodonciaComponent,

  ],
  imports: [
    CommonModule,
    OrtodonciaRoutingModule,
    SharedModule
  ]
})
export class OrtodonciaModule { }
