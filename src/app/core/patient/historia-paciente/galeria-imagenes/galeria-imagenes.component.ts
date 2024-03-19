import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../services/shared-service.service';

@Component({
  selector: 'app-galeria-imagenes',
  templateUrl: './galeria-imagenes.component.html',
  styleUrls: ['./galeria-imagenes.component.scss']
})
export class GaleriaImagenesComponent {


  constructor(private router: Router, private route: ActivatedRoute, private sharedService: SharedService){}

  pacienteId = "";

  ngOnInit() {



    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })

    this.sharedService.setPacienteId(this.pacienteId);

  }

  navegarAImagenes() {
    const pacienteId = this.pacienteId; // Obtén el pacienteId de donde lo tengas guardado en tu componente
    this.router.navigate(['/paciente/historia-paciente/imagenes', pacienteId]);
  }

}
