import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaSaludComponent } from './consulta-salud.component';

const routes: Routes = [{ path: '', component: ConsultaSaludComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaSaludRoutingModule { }
