import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-agregar-galeria-imagenes',
  templateUrl: './agregar-galeria-imagenes.component.html',
  styleUrls: ['./agregar-galeria-imagenes.component.scss']
})
export class AgregarGaleriaImagenesComponent {


  constructor(public bsModalRef: BsModalRef){}


  cancelar() {
    // this.consentimientoPacienteAgregado$.next(false);
    this.bsModalRef.hide()
  }

}
