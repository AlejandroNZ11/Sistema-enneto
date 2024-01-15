import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedService } from './services/shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-historia-paciente',
  templateUrl: 'historia-paciente.component.html'
})

export class HistoriaPacienteComponent {

  pacienteId = "";

  base='' //Inicializar la base Url
  terminosBuscados:string[] = ['historia-clinica', 'odontograma', 'filiacion','ortodoncia','presupuesto','diagnostico','evolucion','imagenes','estado-cuenta','consentimiento','recetas'];

  constructor(private route: ActivatedRoute, private router: Router, private sharedService: SharedService) {

    router.events.subscribe((event: object) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(event);
      }
    });
    this.getRoutes(this.router);

   }


  private getRoutes(route: { url: string }): void {

    const splitVal = route.url.split('/');
    // Buscar si incluye el término en la Url
    const terminoEncontrado = this.terminosBuscados.find(termino => splitVal.includes(termino));

    if (terminoEncontrado) {
        this.base = terminoEncontrado;
    } else {
        this.base = '';
    }

  }

}
