import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonedaComponent } from './moneda.component';
import { MonedaRoutingModule } from './moneda-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarMonedaComponent } from './agregar-moneda/agregar-moneda.component';
import { EditarMonedaComponent } from './editar-moneda/editar-moneda.component';



@NgModule({
  declarations: [
    MonedaComponent,
    AgregarMonedaComponent,
    EditarMonedaComponent
  ],
  imports: [
    CommonModule,
    MonedaRoutingModule,
    SharedModule
  ]
})
export class MonedaModule { }
