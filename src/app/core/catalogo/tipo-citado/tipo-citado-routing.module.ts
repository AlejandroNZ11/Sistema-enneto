import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TipoCitadoComponent } from './tipo-citado.component';

const routes: Routes = [
  {
    path: '',component:TipoCitadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoCitadoRoutingModule { }
