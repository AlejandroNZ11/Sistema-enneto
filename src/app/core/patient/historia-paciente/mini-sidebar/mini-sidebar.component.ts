import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { SharedService } from '../services/shared-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { PacienteEditar } from 'src/app/shared/models/paciente';

@Component({
  selector: 'app-mini-sidebar',
  templateUrl: './mini-sidebar.component.html',
  styleUrls: ['./mini-sidebar.component.scss']
})
export class MiniSidebarComponent implements OnInit, OnDestroy{




public routes = routes;
  activeLink='HistoriaContenidoFiliacion'
  pacienteId: string = ''; // Inicializar con algún valor predeterminado

  base='' //Inicializar la base Url
  terminosBuscados:string[] = ['historia-clinica', 'odontograma', 'filiacion','ortodoncia','presupuesto','diagnostico','evolucion','imagenes','estado-cuenta','consentimiento','recetas'];

  constructor(private sharedService: SharedService, private router: Router, public pacienteService: PacienteService) {
    this.sharedService.pacienteId$.subscribe(pacienteId => {
      this.pacienteId = pacienteId;
      console.log(pacienteId)
    });

    router.events.subscribe((event: object) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(event);
      }
    });
    this.getRoutes(this.router);
  }

  setActiveLink(link: string): void {
    this.activeLink = link;

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


  pacienteIdSubscription!: Subscription;
  pacienteNameSubscription!: Subscription;
  idPaciente!:string;
  nombres?:string;
  apellidos?:string;

  ngOnInit() {

    this.pacienteIdSubscription = this.sharedService.pacienteId$.subscribe((id: string) => {
      this.idPaciente = id;
      if(this.idPaciente){
        this.pacienteNameSubscription= this.pacienteService.obtenerPaciente(this.idPaciente)
      .subscribe(async (paciente: PacienteEditar) => {
        if (paciente) {
          this.nombres = paciente.nombres;
          this.apellidos = paciente.apellidos
        }
      })
      }

    });



  }

  ngOnDestroy() {
    // Asegúrate de desuscribirte para evitar pérdidas de memoria
    if (this.pacienteIdSubscription) {
      this.pacienteIdSubscription.unsubscribe();
      this.pacienteNameSubscription.unsubscribe();
    }
  }

}
