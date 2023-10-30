import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { PlanesRoutingModule } from './planes-routing.module';
import { PlanesComponent } from './planes.component';


@NgModule({
  declarations: [
    PlanesComponent,
  ],
  imports: [
    MatSortModule,
    CommonModule,
    SharedModule,
    PlanesRoutingModule
  ]
})
export class PlanesModule { }
