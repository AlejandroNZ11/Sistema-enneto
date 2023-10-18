import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaComponent } from './cuenta.component';
import { CuentaRoutingModule } from './cuenta-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarCuentaComponent } from './agregar-cuenta/agregar-cuenta.component';
import { EditarCuentaComponent } from './editar-cuenta/editar-cuenta.component';



@NgModule({
  declarations: [
    CuentaComponent,
    AgregarCuentaComponent,
    EditarCuentaComponent
  ],
  imports: [
    CommonModule,
    CuentaRoutingModule,
    SharedModule
  ]
})
export class CuentaModule { }
