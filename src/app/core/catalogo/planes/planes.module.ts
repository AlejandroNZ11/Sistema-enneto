import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { PlanesRoutingModule } from './planes-routing.module';
import { PlanesComponent } from './planes.component';
import { AgregarPlanComponent } from './agregar-plan/agregar-plan.component';
import { EditarPlanComponent } from './editar-plan/editar-plan.component';


@NgModule({
  declarations: [
    PlanesComponent,
    AgregarPlanComponent,
    EditarPlanComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlanesRoutingModule,
    MatSortModule,
  ],
})
export class PlanesModule { }
