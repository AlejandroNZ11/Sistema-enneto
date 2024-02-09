import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalisisCefalometricoRoutingModule } from './analisis-cefalometrico-routing.module';
import { AnalisisCefalometricoComponent } from './analisis-cefalometrico.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AnalisisCefalometricoComponent
  ],
  imports: [
    CommonModule,
    AnalisisCefalometricoRoutingModule,
    SharedModule
  ]
})
export class AnalisisCefalometricoModule { }
