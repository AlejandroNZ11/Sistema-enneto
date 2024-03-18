import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-captura-odontograma',
  templateUrl: './captura-odontograma.component.html',
  styleUrls: ['./captura-odontograma.component.scss']
})
export class CapturaOdontogramaComponent {
  imgCapture:string='';

  constructor(public bsModalRef: BsModalRef){}

  descargarImagen() {
    const link = document.createElement('a');
    link.href = this.imgCapture;
    link.download = 'odontograma-capture'; // Cambia esto según lo que quieras como nombre de archivo
    link.click();
    this.bsModalRef.hide();
  }

}
