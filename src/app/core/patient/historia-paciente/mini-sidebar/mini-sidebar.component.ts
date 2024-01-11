import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { SharedService } from '../services/shared-service.service';

@Component({
  selector: 'app-mini-sidebar',
  templateUrl: './mini-sidebar.component.html',
  styleUrls: ['./mini-sidebar.component.scss']
})
export class MiniSidebarComponent {

public routes = routes;
  activeLink='HistoriaContenidoFiliacion'
  pacienteId: string = ''; // Inicializar con algún valor predeterminado

  constructor(private sharedService: SharedService) {
    this.sharedService.pacienteId$.subscribe(pacienteId => {
      this.pacienteId = pacienteId;
      console.log(pacienteId)
    });
  }

  setActiveLink(link: string): void {
    this.activeLink = link;

  }

}
