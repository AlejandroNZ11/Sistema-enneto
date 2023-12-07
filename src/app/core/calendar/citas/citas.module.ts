import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasComponent } from './citas.component';
import { CitasRoutingModule } from './citas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditarCitaComponent } from './editar-cita/editar-cita.component';
import { AgregarCitaComponent } from './agregar-cita/agregar-cita.component';




@NgModule({
  declarations: [
    CitasComponent,
    EditarCitaComponent,
    AgregarCitaComponent,
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    SharedModule,
    MatCheckboxModule,
  ],
})
export class CitasModule { }
