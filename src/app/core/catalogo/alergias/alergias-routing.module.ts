import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AlergiasComponent } from './alergias.component';

const routes: Routes = [
  {
    path: '',component:AlergiasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlergiasRoutingModule { }
