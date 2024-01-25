import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataAlergias, Ialergias } from 'src/app/shared/models/alergia';
import { AlergiasService } from 'src/app/shared/services/alergias.service';

@Component({
  selector: 'app-editar-alergia-paciente',
  templateUrl: './editar-alergia-paciente.component.html',
  styleUrls: ['./editar-alergia-paciente.component.scss']
})
export class EditarAlergiaPacienteComponent implements OnInit{

  constructor(public bsModalRef: BsModalRef, public alergiaService: AlergiasService){}
  ListAlergias: Array<Ialergias> = [];
  alergiaSeleccionada?: string;


  ngOnInit(): void {
    this.obtenerListaAlergias();
   this.alergiaSeleccionada
  }


  cancelar() {
    this.bsModalRef.hide()
  }


  private obtenerListaAlergias(): void {
    this.ListAlergias = [];

    this.alergiaService.obtenerListaAlergias().subscribe((data: Ialergias[]) => {

      this.ListAlergias = data;
      console.log(this.ListAlergias)
    });

  }

}
