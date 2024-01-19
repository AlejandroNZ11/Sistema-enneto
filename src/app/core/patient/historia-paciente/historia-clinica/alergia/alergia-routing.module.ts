import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlergiaComponent } from './alergia.component';

const routes: Routes = [{ path: '', component: AlergiaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlergiaRoutingModule { }
