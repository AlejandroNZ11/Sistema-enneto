import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historia-paciente',
  templateUrl: 'historia-paciente.component.html'
})

export class HistoriaPacienteComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  pacienteId = "";

  ngOnInit() {


  }
}
