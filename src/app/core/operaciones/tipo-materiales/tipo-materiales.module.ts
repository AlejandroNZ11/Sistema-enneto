import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoMaterialesComponent } from './tipo-materiales.component';
import { TipoMaterialesRoutingModule } from './tipo-materiales-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TipoMaterialesComponent,
  ],
  imports: [
    CommonModule,
    TipoMaterialesRoutingModule,
    SharedModule
  ]
})
export class TipoMaterialesModule { }
