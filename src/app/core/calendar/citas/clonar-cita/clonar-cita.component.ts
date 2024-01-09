import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IcitaMedica, citaMedica } from 'src/app/shared/models/cita';
import { CitaService } from 'src/app/shared/services/cita.service';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-clonar-cita',
  templateUrl: './clonar-cita.component.html',
  styleUrls: ['./clonar-cita.component.scss']
})
export class ClonarCitaComponent implements OnInit {
  @Output() modalClosed = new EventEmitter<void>();
  constructor(public bsModalRef: BsModalRef, public formBuilder: FormBuilder, public citaMedicaService: CitaService,
    private modalService: BsModalService, public pacienteService: PacienteService) { }
  citaSeleccionada!: IcitaMedica;
  citasCreadas!: citaMedica[];
  citaId!: string;
  form!: FormGroup;
  paciente!: string;
  modalRef?: BsModalRef;
  isLoading = false;
  ngOnInit(): void {
    this.isLoading = true;
    this.citaMedicaService.obtenerCitaMedica(this.citaId).pipe(
      finalize(() => this.isLoading = false))
      .subscribe(data => {
        this.citaSeleccionada = data;
        this.pacienteService.obtenerPaciente(data.pacienteId).subscribe(data => this.paciente = data.nombres + ' ' + data.apellidos)
        this.citaSeleccionada.fecha = data.fecha.split("T")[0];
        this.citaSeleccionada.horaInicio = data.horaInicio.split("T")[1];
        this.citaSeleccionada.horaFin = data.horaFin.split("T")[1];
      })
  }
  agregarCita() {
    if (!this.citasCreadas) {
      this.citasCreadas = [];
    }
    if (this.citaSeleccionada) {
      const fechaSeleccionada = new Date(this.citaSeleccionada.fecha);
      fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1);
      this.citasCreadas.push({
        clinicaId: this.citaSeleccionada.clinicaId,
        usuarioId: this.citaSeleccionada.usuarioId,
        pacienteId: this.citaSeleccionada.pacienteId,
        medicoId: this.citaSeleccionada.medicoId,
        especialidadId: this.citaSeleccionada.especialidadId,
        sedeId: this.citaSeleccionada.sedeId,
        motivoConsulta: this.citaSeleccionada.motivoConsulta,
        tipoCitadoId: this.citaSeleccionada.tipoCitadoId,
        observacion: this.citaSeleccionada.observacion,
        estado: this.citaSeleccionada.estado,
        fecha: fechaSeleccionada.toISOString().split("T")[0],
        horaInicio: this.citaSeleccionada.horaInicio,
        horaFin: this.citaSeleccionada.horaFin
      });
    }

  }
  cerrar() {
    this.bsModalRef.hide()
  }
  eliminar(index: number) {
    this.citasCreadas.splice(index, 1);
  }
  clonarCitas() {
    if (this.citasCreadas.length === 0) {
      Swal.fire('Error', 'Clone una nueva fecha', 'error');
      return;
    }
    for (const cita of this.citasCreadas) {
      cita.fecha = new Date(cita.fecha).toISOString().split('T')[0];
      const fechaInicioLocal = new Date(cita.fecha + 'T' + cita.horaInicio);
      const fechaFinLocal = new Date(cita.fecha + 'T' + cita.horaFin);
      fechaInicioLocal.setMinutes(fechaInicioLocal.getMinutes() - fechaInicioLocal.getTimezoneOffset());
      fechaFinLocal.setMinutes(fechaFinLocal.getMinutes() - fechaFinLocal.getTimezoneOffset());
      cita.horaInicio = fechaInicioLocal.toISOString().split('.')[0];
      cita.horaFin = fechaFinLocal.toISOString().split('.')[0];
      this.citaMedicaService.crearCitaMedica(cita).subscribe(
        (response) => {
          if (response.isSuccess) {
            Swal.fire(response.message, '', 'success');
          } else {
            console.error(response.message);
          }
        },
        (error) => {
          console.error(error);
        });
    }
    this.bsModalRef.hide();
  }
}
