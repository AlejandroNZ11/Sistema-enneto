import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AntecedentesComponent } from './antecedentes.component';



const routes: Routes = [{ path: '', component: AntecedentesComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AntecedentesRoutingModule { }
