import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalisisGeneralComponent } from './analisis-general.component';

const routes: Routes = [{path: '', component: AnalisisGeneralComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalisisGeneralRoutingModule { }
