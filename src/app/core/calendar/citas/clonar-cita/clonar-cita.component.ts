import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IcitaMedica, citaMedica } from 'src/app/shared/models/cita';
import { CitaService } from 'src/app/shared/services/cita.service';
import { PacienteService } from 'src/app/shared/services/paciente.service';

@Component({
  selector: 'app-clonar-cita',
  templateUrl: './clonar-cita.component.html',
  styleUrls: ['./clonar-cita.component.scss']
})
export class ClonarCitaComponent implements OnInit {
  constructor(public bsModalRef: BsModalRef, public formBuilder: FormBuilder, public citaMedicaService: CitaService, private modalService: BsModalService, public pacienteService: PacienteService) { }
  citaSeleccionada!: IcitaMedica;
  citasCreadas!: citaMedica[];
  citaId!: string;
  form!: FormGroup;
  paciente!: string;
  modalRef?: BsModalRef;
  ngOnInit(): void {
    this.citaMedicaService.obtenerCitaMedica(this.citaId).subscribe(data => {
      this.citaSeleccionada = data;
      this.pacienteService.obtenerPaciente(data.pacienteId).subscribe(data => this.paciente = data.nombres + ' ' + data.apellidos)
      this.citaSeleccionada.fecha = data.fecha.split("T")[0];
      this.citaSeleccionada.horaInicio = data.horaInicio.split("T")[1];
      this.citaSeleccionada.horaFin = data.horaFin.split("T")[1];
      this.inicializarFormulario();
    })
  }
  inicializarFormulario() {
    this.form = this.formBuilder.group({
      fecha: [{ disabled: true }, [Validators.required, Validators.maxLength(15)]],
      horaInicio: [{ disabled: true }, [Validators.required, Validators.maxLength(10)]],
      horaFin: [{ disabled: true }, [Validators.required, Validators.maxLength(10)]],
      paciente: [{ disabled: true }, [Validators.required, Validators.maxLength(100)]],
    })
  }
  agregarCita() {
    console.log(this.citaSeleccionada);
    if (!this.citasCreadas) {
      this.citasCreadas = [];
    }
    if (this.citaSeleccionada) {
      this.citasCreadas.push({
        clinicaId: this.citaSeleccionada.clinicaId,
        usuarioId: this.citaSeleccionada.usuarioId,
        pacienteId: this.citaSeleccionada.pacienteId,
        medicoId: this.citaSeleccionada.medicoId,
        especialidadId: this.citaSeleccionada.especialidadId,
        sedeId: this.citaSeleccionada.sedeId,
        motivoConsulta: this.citaSeleccionada.motivoConsulta,
        tipoCitadoId: '',
        observacion: this.citaSeleccionada.observacion,
        estado: this.citaSeleccionada.estado,
        fecha: this.citaSeleccionada.fecha,
        horaInicio: this.citaSeleccionada.horaInicio,
        horaFin: this.citaSeleccionada.horaFin
      });
      console.log(this.citasCreadas);
    }

  }
  cerrar() { this.bsModalRef.hide() }
}
