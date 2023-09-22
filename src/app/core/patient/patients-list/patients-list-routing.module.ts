import { NgModule } from '@angular/core';
import { PatientsListComponent } from './patients-list.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: PatientsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsListRoutingModule { }
