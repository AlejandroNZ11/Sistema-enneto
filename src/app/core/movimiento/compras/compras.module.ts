import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasComponent } from './compras.component';
import { ComprasRoutingModule } from './compras-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ComprasComponent,
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    SharedModule,
  ]
})
export class ComprasModule { }
