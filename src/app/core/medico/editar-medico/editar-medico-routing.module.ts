import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditarMedicoComponent } from './editar-medico.component';
const routes: Routes = [{ path: '', component: EditarMedicoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarMedicoRoutingModule { }
