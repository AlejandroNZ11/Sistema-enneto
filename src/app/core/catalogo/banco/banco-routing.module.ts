import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BancosComponent } from './banco.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '', component: BancosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BancosRoutingModule { }
