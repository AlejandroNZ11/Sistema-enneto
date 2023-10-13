import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoMaterialesComponent } from './tipo-materiales.component';
import { TipoMaterialesRoutingModule } from './tipo-materiales-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarTipoMaterialesComponent } from './agregar-tipo-materiales/agregar-tipo-materiales.component';
import { EditarTipoMaterialesComponent } from './editar-tipo-materiales/editar-tipo-materiales.component';



@NgModule({
  declarations: [
    TipoMaterialesComponent,
    AgregarTipoMaterialesComponent,
    EditarTipoMaterialesComponent,
  ],
  imports: [
    CommonModule,
    TipoMaterialesRoutingModule,
    SharedModule
  ]
})
export class TipoMaterialesModule { }
