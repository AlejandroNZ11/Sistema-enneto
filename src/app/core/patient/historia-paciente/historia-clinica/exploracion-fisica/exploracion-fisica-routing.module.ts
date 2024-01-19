import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploracionFisicaComponent } from './exploracion-fisica.component';

const routes: Routes = [{ path: '', component: ExploracionFisicaComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploracionFisicaRoutingModule { }
