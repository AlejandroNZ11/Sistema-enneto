import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CobroConsultaComponent } from './cobro-consulta.component';
const routes: Routes = [{ path: '', component: CobroConsultaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CobroConsultaRoutingModule { }
