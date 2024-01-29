import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvolucionComponent } from './evolucion.component';

const routes: Routes = [{ path: '', component: EvolucionComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvolucionRoutingModule { }
