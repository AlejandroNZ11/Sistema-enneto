import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Enfermedad } from 'src/app/shared/models/enfermedad';
import { EnfermedadService } from 'src/app/shared/services/enfermedad.service';

@Component({
  selector: 'app-editar-diagnostico-paciente',
  templateUrl: './editar-diagnostico-paciente.component.html',
  styleUrls: ['./editar-diagnostico-paciente.component.scss']
})
export class EditarDiagnosticoPacienteComponent implements OnInit{

  form!: FormGroup;
  enfermedadList:Array<Enfermedad> = [];
  constructor(public bsModalRef: BsModalRef, public fb: FormBuilder , public enfermedadService:EnfermedadService){

    this.form = this.fb.group({
      fecha: ['', Validators.required],
      enfermedadId: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.enfermedadService.obtenerEnfermedadesList().subscribe(data => {this.enfermedadList = data;})
  }
  listaDiagnosticos: Array<any> = [];

  enfermedadSeleccionada?: string;



  cancelar() {
    this.bsModalRef.hide()
  }


}
