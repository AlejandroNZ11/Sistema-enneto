import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BancoComponent } from './banco.component';
import { BancoRoutingModule } from './banco-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarBancoComponent } from './agregar-banco/agregar-banco.component';
import { EditarBancoComponent } from './editar-banco/editar-banco.component';



@NgModule({
  declarations: [
    BancoComponent,
    AgregarBancoComponent,
    EditarBancoComponent
  ],
  imports: [
    CommonModule,
    BancoRoutingModule,
    SharedModule,
  ]
})
export class BancoModule { }
