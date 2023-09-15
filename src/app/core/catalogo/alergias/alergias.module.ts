import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { AlergiasRoutingModule } from './alergias-routing.module';
import { AlergiasComponent } from './alergias.component';
import { AgregarAlergiasComponent } from './agregar-alergias/agregar-alergias.component';
import { EditarAlergiasComponent } from './editar-alergias/editar-alergias.component';


@NgModule({
  declarations: [
    AlergiasComponent,
    AgregarAlergiasComponent,
    EditarAlergiasComponent
  ],
  imports: [
    MatSortModule,
    CommonModule,
    SharedModule,
    AlergiasRoutingModule
  ]
})
export class AlergiasModule { }
