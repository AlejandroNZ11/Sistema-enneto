import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CobroPresupuestoComponent } from './cobro-presupuesto.component';
const routes: Routes = [{ path: '', component: CobroPresupuestoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CobroPresupuestoRoutingModule { }
