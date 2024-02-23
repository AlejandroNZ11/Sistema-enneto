import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TarifarioComponent } from './tarifario.component';
import { TarifarioRoutingModule } from './tarifario-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarTarifarioComponent } from './agregar-tarifario/agregar-tarifario.component';
import { EditarTarifarioComponent } from './editar-tarifario/editar-tarifario.component';



@NgModule({
  
  declarations: [
    TarifarioComponent,
    AgregarTarifarioComponent,
    EditarTarifarioComponent
    
  ],
  imports: [
    CommonModule,
    TarifarioRoutingModule,
    SharedModule,
  ],
  providers: [DatePipe],
})
export class TarifarioModule { }
