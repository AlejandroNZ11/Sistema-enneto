import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ClientesComponent,
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule,
  ]
})
export class ClientesModule { }
