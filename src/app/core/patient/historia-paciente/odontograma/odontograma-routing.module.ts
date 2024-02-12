import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OdontogramaComponent } from './odontograma.component';

const routes: Routes = [{ path: '', component: OdontogramaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OdontogramaRoutingModule { }
