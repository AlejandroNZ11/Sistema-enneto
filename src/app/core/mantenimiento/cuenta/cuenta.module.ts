import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaComponent } from './cuenta.component';
import { CuentaRoutingModule } from './cuenta-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CuentaComponent
  ],
  imports: [
    CommonModule,
    CuentaRoutingModule,
    SharedModule
  ]
})
export class CuentaModule { }
