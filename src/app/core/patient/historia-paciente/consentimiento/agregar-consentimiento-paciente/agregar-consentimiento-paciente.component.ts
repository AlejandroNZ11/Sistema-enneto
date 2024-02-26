import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-consentimiento-paciente',
  templateUrl: './agregar-consentimiento-paciente.component.html',
  styleUrls: ['./agregar-consentimiento-paciente.component.scss']
})
export class AgregarConsentimientoPacienteComponent {

  consentimientoPacienteAgregado$: Subject<boolean> = new Subject<boolean>();


}
