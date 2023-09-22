import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComisionMedicoComponent } from './comision-medico.component';
const routes: Routes = [{ path: '', component: ComisionMedicoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComisionMedicoRoutingModule { }
