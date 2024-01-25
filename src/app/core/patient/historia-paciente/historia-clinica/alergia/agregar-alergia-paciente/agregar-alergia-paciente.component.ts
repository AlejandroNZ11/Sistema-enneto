import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataAlergias, Ialergias } from 'src/app/shared/models/alergia';
import { AlergiasService } from 'src/app/shared/services/alergias.service';
import { environment as env } from 'src/environments/environments';
@Component({
  selector: 'app-agregar-alergia-paciente',
  templateUrl: './agregar-alergia-paciente.component.html',
  styleUrls: ['./agregar-alergia-paciente.component.scss']
})
export class AgregarAlergiaPacienteComponent implements OnInit{
  constructor(public bsModalRef: BsModalRef, public alergiaService: AlergiasService ){}

  ListAlergias?: Ialergias[];
  ngOnInit(): void {
    this.obtenerListaAlergias();
    console.log(env.clinicaId)
  }

  cancelar() {
    this.bsModalRef.hide()
  }

  private obtenerListaAlergias(): void {

    this.alergiaService.obtenerListaAlergias().subscribe((datas: Ialergias[]) => {

      console.log(datas)
      this.ListAlergias = datas;
      console.log(this.ListAlergias)
    });

  }



}
