import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario.component';
import { RolComponent } from './rol/rol.component';
import { PermisoComponent } from './permiso/permiso.component';
import { ClinicaComponent } from './clinica/clinica.component';
import { TipoDocumentoComponent } from './tipo-documento/tipo-documento.component';
import { SedeComponent } from './sede/sede.component';
import { ConfiguracionComponent } from './configuracion.component';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    SharedModule
  ]
})
export class ConfiguracionModule { }
