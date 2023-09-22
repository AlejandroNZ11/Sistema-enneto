import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConsentimientoComponent } from './consentimiento.component';
const routes: Routes = [{ path: '', component: ConsentimientoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsentimientoRoutingModule { }
