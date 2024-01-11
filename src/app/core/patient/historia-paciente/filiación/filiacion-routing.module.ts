import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiliacionComponent } from './filiacion.component';


const routes: Routes = [{ path: '', component: FiliacionComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FiliacionRoutingModule { }
