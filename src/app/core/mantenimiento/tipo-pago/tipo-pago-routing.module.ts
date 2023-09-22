import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TipoPagoComponent } from './tipo-pago.component';
const routes: Routes = [{ path: '', component: TipoPagoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoPagoRoutingModule { }
