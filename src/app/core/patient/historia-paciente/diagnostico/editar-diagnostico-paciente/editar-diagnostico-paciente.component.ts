import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-editar-diagnostico-paciente',
  templateUrl: './editar-diagnostico-paciente.component.html',
  styleUrls: ['./editar-diagnostico-paciente.component.scss']
})
export class EditarDiagnosticoPacienteComponent {
  constructor(public bsModalRef: BsModalRef){}
  listaDiagnosticos: Array<any> = [];

  diagnosticoSeleccionado?: string;

  cancelar() {
    this.bsModalRef.hide()
  }


}
