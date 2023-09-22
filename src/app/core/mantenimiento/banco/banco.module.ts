import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BancoComponent } from './banco.component';
import { BancoRoutingModule } from './banco-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    BancoComponent
  ],
  imports: [
    CommonModule,
    BancoRoutingModule,
    SharedModule
  ]
})
export class BancoModule { }
