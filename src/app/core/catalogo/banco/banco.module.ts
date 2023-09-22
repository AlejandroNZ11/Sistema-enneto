import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { AgregarBancoComponent } from './agregar-banco/agregar-banco.component';
import { EditarBancoComponent } from './editar-banco/editar-banco.component';
import { BancosComponent } from './banco.component';
import { BancosRoutingModule } from './banco-routing.module';


@NgModule({
    declarations: [
        AgregarBancoComponent,
        EditarBancoComponent,
        BancosComponent
    ],
    imports: [
        MatSortModule,
        CommonModule,
        SharedModule,
        BancosRoutingModule  
    ]
})
export class BancosModule { }
