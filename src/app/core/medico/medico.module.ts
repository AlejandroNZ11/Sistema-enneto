import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarMedicoComponent } from './agregar-medico/agregar-medico.component';
import { ListaMedicoComponent } from './lista-medico/lista-medico.component';
import { PerfilMedicoComponent } from './perfil-medico/perfil-medico.component';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { MedicoComponent } from './medico.component';
import { MedicoRoutingModule } from './medico-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



@NgModule({
  declarations: [
    MedicoComponent
  ],
  imports: [
    CommonModule,
    MedicoRoutingModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class MedicoModule { }
