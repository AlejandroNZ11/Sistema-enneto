import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';



@NgModule({
  declarations: [
    ClientesComponent,
    AgregarClienteComponent,
    EditarClienteComponent,
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule,
  ]
})
export class ClientesModule { }
