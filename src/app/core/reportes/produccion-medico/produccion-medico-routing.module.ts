import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProduccionMedicoComponent } from './produccion-medico.component';
const routes: Routes = [{ path: '', component: ProduccionMedicoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduccionMedicoRoutingModule { }
