import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalisisOclusal2Component } from './analisis-oclusal2.component';

const routes: Routes = [{path:'', component:AnalisisOclusal2Component}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalisisOclusal2RoutingModule { }
