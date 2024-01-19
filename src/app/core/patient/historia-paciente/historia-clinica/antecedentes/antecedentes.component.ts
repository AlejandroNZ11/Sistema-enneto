import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-antecedentes',
  templateUrl: 'antecedentes.component.html',
  styleUrls: ['./antecedentes.component.scss']
})

export class AntecedentesComponent implements OnInit {
  constructor(private sharedService:SharedService ,private route: ActivatedRoute ) { }

  pacienteId = "";

  ngOnInit() {


    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })

    this.sharedService.setPacienteId(this.pacienteId);
  }
}
