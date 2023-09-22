import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TipoGastosComponent } from './tipo-gastos.component';
const routes: Routes = [{ path: '', component: TipoGastosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoGastosRoutingModule { }
