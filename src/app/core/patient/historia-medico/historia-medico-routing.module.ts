import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HistoriaMedicoComponent } from './historia-medico.component';
const routes: Routes = [{ path: '', component: HistoriaMedicoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriaMedicoRoutingModule { }
