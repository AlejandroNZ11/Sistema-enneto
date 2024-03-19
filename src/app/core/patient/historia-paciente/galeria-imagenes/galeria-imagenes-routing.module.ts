import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaleriaImagenesComponent } from './galeria-imagenes.component';

const routes: Routes = [{path:'',component:GaleriaImagenesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GaleriaImagenesRoutingModule { }
