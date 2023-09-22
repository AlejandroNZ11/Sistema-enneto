import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { HeaderComponent } from '../common-component/header/header.component';
import { SidebarComponent } from '../common-component/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { ModalComponent } from './modal/modal.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { HttpClientModule } from '@angular/common/http';
import { CajaComponent } from './caja/caja.component';
import { MovimientoComponent } from './movimiento/movimiento.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { ReportesComponent } from './reportes/reportes.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    SidebarComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
  ],
})
export class CoreModule { }
