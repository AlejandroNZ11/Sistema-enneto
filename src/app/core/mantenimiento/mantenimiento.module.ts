import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoPagoComponent } from './tipo-pago/tipo-pago.component';
import { MonedaComponent } from './moneda/moneda.component';
import { BancoComponent } from './banco/banco.component';
import { TipoTarjetaComponent} from './tipo-tarjeta/tipo-tarjeta.component';
import { TipoGastosComponent } from './tipo-gastos/tipo-gastos.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { TarifarioComponent } from './tarifario/tarifario.component';
import { DiagnosticoComponent } from './diagnostico/diagnostico.component';
import { MantenimientoComponent } from './mantenimiento.component';
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    MantenimientoComponent
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    SharedModule,
  ]
})
export class MantenimientoModule { }
