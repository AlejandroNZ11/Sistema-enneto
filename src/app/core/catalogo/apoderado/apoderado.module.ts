import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApoderadoComponent } from './apoderado.component';
import { ApoderadoRoutingModule } from './apoderado-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarApoderadoComponent } from './agregar-apoderado/agregar-apoderado.component';
import { EditarApoderadoComponent } from './editar-apoderado/editar-apoderado.component';



@NgModule({
  declarations: [
    ApoderadoComponent,
    AgregarApoderadoComponent,
    EditarApoderadoComponent
  ],
  imports: [
    CommonModule,
    ApoderadoRoutingModule,
    SharedModule,
  ]
})
export class ApoderadoModule { }
