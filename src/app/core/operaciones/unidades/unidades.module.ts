import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadesComponent } from './unidades.component';
import { UnidadesRoutingModule } from './unidades-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    UnidadesComponent
  ],
  imports: [
    CommonModule,
    UnidadesRoutingModule,
    SharedModule,
  ]
})
export class UnidadesModule { }
