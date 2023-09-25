import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgregarMedicoComponent } from './agregar-medico.component';
const routes: Routes = [{ path: '', component: AgregarMedicoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarMedicoRoutingModule { }
