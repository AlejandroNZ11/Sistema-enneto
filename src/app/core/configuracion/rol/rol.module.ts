import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolComponent } from './rol.component';
import { RolRoutingModule } from './rol-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    RolComponent
  ],
  imports: [
    CommonModule,
    RolRoutingModule,
    SharedModule
  ]
})
export class RolModule { }
