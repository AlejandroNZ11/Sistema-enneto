import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarMedicoComponent } from './agregar-medico.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: AgregarMedicoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarMedicoRoutingModule { }
