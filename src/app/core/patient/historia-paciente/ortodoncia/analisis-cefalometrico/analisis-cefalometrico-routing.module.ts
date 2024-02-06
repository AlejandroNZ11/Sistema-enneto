import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalisisCefalometricoComponent } from './analisis-cefalometrico.component';

const routes: Routes = [{path:'', component:AnalisisCefalometricoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalisisCefalometricoRoutingModule { }
