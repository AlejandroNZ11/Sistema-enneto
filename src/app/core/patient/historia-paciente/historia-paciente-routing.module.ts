import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriaPacienteComponent } from './historia-paciente.component';

const routes: Routes = [{ path: '', component: HistoriaPacienteComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HistoriaPacienteRoutingModule { }
