import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerfilMedicoComponent } from './perfil-medico.component';
const routes: Routes = [{ path: '', component: PerfilMedicoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilMedicoRoutingModule { }
