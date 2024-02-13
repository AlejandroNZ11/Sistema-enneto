import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared-service.service';

@Component({
  selector: 'app-odontograma-evolucion',
  templateUrl: './odontograma-evolucion.component.html',
  styleUrls: ['./odontograma-evolucion.component.scss']
})
export class OdontogramaEvolucionComponent implements OnInit{
  constructor(private route: ActivatedRoute, private sharedService:SharedService){}

  pacienteId='';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })

    this.sharedService.setPacienteId(this.pacienteId);
  }
}
