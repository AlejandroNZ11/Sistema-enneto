import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TipoConceptoComponent } from './tipo-concepto.component';

const routes: Routes = [
  {
    path: '',component:TipoConceptoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoConceptoRoutingModule { }
