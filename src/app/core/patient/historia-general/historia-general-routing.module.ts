import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HistoriaGeneralComponent } from './historia-general.component';
const routes: Routes = [{ path: '', component: HistoriaGeneralComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriaGeneralRoutingModule { }
