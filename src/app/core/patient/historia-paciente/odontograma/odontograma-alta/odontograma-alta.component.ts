import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared-service.service';

@Component({
  selector: 'app-odontograma-alta',
  templateUrl: './odontograma-alta.component.html',
  styleUrls: ['./odontograma-alta.component.scss']
})
export class OdontogramaAltaComponent implements OnInit{

  constructor(private route: ActivatedRoute, private sharedService:SharedService){}

  pacienteId='';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })

    this.sharedService.setPacienteId(this.pacienteId);
  }

}
