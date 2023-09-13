import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EspecialidadesComponent } from './especialidades.component';

const routes: Routes = [
  {
    path: '',component:EspecialidadesComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspecialidadesRoutingModule { }
