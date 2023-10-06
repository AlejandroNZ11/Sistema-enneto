import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output() confirmacion = new EventEmitter<boolean>();
  eliminar(){
    this.confirmacion.emit(true);
  }
}
