import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OdontogramaEvolucionComponent } from './odontograma-evolucion.component';

const routes: Routes = [{ path: '', component: OdontogramaEvolucionComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OdontogramaEvolucionRoutingModule { }
