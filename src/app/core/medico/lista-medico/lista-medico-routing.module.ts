import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaMedicoComponent } from './lista-medico.component';
const routes: Routes = [{ path: '', component: ListaMedicoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaMedicoRoutingModule { }
