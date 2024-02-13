import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OdontogramaAltaComponent } from './odontograma-alta.component';

const routes: Routes = [{ path: '', component: OdontogramaAltaComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OdontogramaAltaRoutingModule { }
