import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OdontogramaInicialComponent } from './odontograma-inicial.component';

const routes: Routes = [{ path: '', component: OdontogramaInicialComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OdontogramaInicialRoutingModule { }
