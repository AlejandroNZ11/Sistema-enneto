import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TipoMaterialesComponent } from './tipo-materiales.component';
const routes: Routes = [{ path: '', component: TipoMaterialesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoMaterialesRoutingModule { }
