import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
@Component({
  selector: 'app-cierre',
  templateUrl: './cierre.component.html',
  styleUrls: ['./cierre.component.scss']
})
export class CierreComponent {
  public routes = routes;
  mostrarFormulario = true;
  mostrarFormularioC = true;


  alternarFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mostrarFormularioC = !this.mostrarFormularioC;
  }





}
