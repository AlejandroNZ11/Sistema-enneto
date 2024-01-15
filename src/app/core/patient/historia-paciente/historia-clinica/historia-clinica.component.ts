import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared-service.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {


  constructor(private route: ActivatedRoute, private sharedService: SharedService ){}

    activeTab: string = 'antecedentes';
    pacienteId = "";



    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.pacienteId = params['pacienteId'];
      })
      console.log(this.pacienteId)

      this.sharedService.setPacienteId(this.pacienteId);
    }


}
