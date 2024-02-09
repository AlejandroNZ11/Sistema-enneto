import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { DataAlergias, Ialergias } from 'src/app/shared/models/alergia';
import { updatePacienteAlergia } from 'src/app/shared/models/paciente-alergia';
import { AlergiasService } from 'src/app/shared/services/alergias.service';
import { PacienteAlergiaService } from 'src/app/shared/services/paciente-alergia.service';

@Component({
  selector: 'app-editar-alergia-paciente',
  templateUrl: './editar-alergia-paciente.component.html',
  styleUrls: ['./editar-alergia-paciente.component.scss']
})
export class EditarAlergiaPacienteComponent implements OnInit{
  pacienteAlergiaEditado$: Subject<boolean> = new Subject<boolean>();
  form!: FormGroup;
  constructor(public bsModalRef: BsModalRef, public alergiaService: AlergiasService,public fb: FormBuilder, public pacienteAlergiaService:PacienteAlergiaService ){}
  ListAlergias: Array<Ialergias> = [];
  pacienteAlergiaId?: string;
  alergiaId?:string;
  observacion?: string;

  pacienteAlergiaClass:updatePacienteAlergia = new updatePacienteAlergia();

  ngOnInit(): void {
    this.obtenerListaAlergias();
   this.pacienteAlergiaId

   this.pacienteAlergiaClass.pacienteAlergiaId = this.pacienteAlergiaId;
   this.pacienteAlergiaClass.observacion = this.observacion;
   this.pacienteAlergiaClass.alergiaId=this.alergiaId;

   this.pacienteAlergiaService.actualizarPacienteAlergia(this.pacienteAlergiaClass);
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
