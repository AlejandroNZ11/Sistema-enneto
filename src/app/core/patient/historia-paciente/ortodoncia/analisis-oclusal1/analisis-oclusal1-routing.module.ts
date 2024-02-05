import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalisisOclusal1Component } from './analisis-oclusal1.component';

const routes: Routes = [{path:'', component:AnalisisOclusal1Component}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalisisOclusal1RoutingModule { }
