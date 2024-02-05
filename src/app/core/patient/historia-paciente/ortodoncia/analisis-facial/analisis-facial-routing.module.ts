import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalisisFacialComponent } from './analisis-facial.component';

const routes: Routes = [{path:'', component:AnalisisFacialComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalisisFacialRoutingModule { }
