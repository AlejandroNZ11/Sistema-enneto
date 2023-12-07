import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { citaMedica } from 'src/app/shared/models/cita';
import { Iespecialidad } from 'src/app/shared/models/especialidades';
import { MedicoList } from 'src/app/shared/models/medico';
import { PacienteList } from 'src/app/shared/models/paciente';
import { ItipoCitado } from 'src/app/shared/models/tipoCitado';
import { CitaService } from 'src/app/shared/services/cita.service';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import { MedicoService } from 'src/app/shared/services/medico.service';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { TipoCitadoService } from 'src/app/shared/services/tipo-citado.service';
import { UserLoggedService } from 'src/app/shared/services/user-logged.service';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cita',
  templateUrl: './editar-cita.component.html',
  styleUrls: ['./editar-cita.component.scss']
})
export class EditarCitaComponent implements OnInit {
  citaNueva: citaMedica = new citaMedica();
  form!: FormGroup;
  listEspecialidadesCitas!: Iespecialidad[];
  especialidadSeleccionadaCita = '';
  citaId!: string;
  listPacientes!: PacienteList[];
  pacienteleccionado!: string;
  filteredPacientes!: PacienteList[];
  nombreBusqueda = '';
  listEstadosCitas!: ItipoCitado[];
  estadoSeleccionadoCita = '';
  listMedicos!: MedicoList[];
  sede = '';
  isFormSubmitted = false;
  modalRef?: BsModalRef;

  constructor(public especialidadService: EspecialidadesService, public tipoCitadoService: TipoCitadoService, public pacienteService: PacienteService, public bsModalRef: BsModalRef,
    public formBuilder: FormBuilder, public citaMedicaService: CitaService, public user: UserLoggedService, private modalService: BsModalService, private medicoService: MedicoService) { }
  ngOnInit(): void {
    this.inicializarFormulario();
    this.sede = this.user.selectedSucursal.nombre;
    this.especialidadService.obtenerListaEspecialidad().subscribe(data => { this.listEspecialidadesCitas = data })
    this.tipoCitadoService.obtenerListaTipoCitado().subscribe(data => { this.listEstadosCitas = data })
    this.pacienteService.obtenerPacientesNombre().subscribe(data => { this.listPacientes = data; })
    this.medicoService.obtenerMedicos(environment.clinicaId, 1, 100).subscribe(data => { this.listMedicos = data.data; })
  }
  inicializarFormulario() {
    this.form = this.formBuilder.group({
      especialidad: ['', [Validators.required, Validators.maxLength(40)]],
      medico: ['', [Validators.required, Validators.maxLength(40),]],
      fecha: [{ value: this.citaNueva.fecha, disabled: true }, [Validators.required, Validators.maxLength(10)]],
      horaInicio: ['', [Validators.required, Validators.maxLength(10)]],
      horaFin: ['', [Validators.required, Validators.maxLength(10)]],
      paciente: ['', [Validators.required, Validators.maxLength(100)]],
      tipoCitado: ['', [Validators.required, Validators.maxLength(40)]],
      sede: [{ value: this.user.selectedSucursal.nombre, disabled: true }, [Validators.required, Validators.maxLength(10)]],
      estado: ['', [Validators.required, Validators.maxLength(100)]],
      motivoConsulta: ['', [Validators.required, Validators.maxLength(100)]],
      observacion: ['', [Validators.maxLength(100)]],
    })
  }
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
  markAllFieldsAsTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  cerrar() { this.bsModalRef.hide() }
  guardarCita() {
    this.citaNueva.sedeId = this.user.selectedSucursal.id.toString();
    this.citaNueva.fecha = new Date().toISOString().split('T')[0]
    console.log(this.citaNueva);
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.markAllFieldsAsTouched();
      return;
    }
    console.log(this.citaNueva);
    this.citaMedicaService.crearCitaMedica(this.citaNueva).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.form.reset();
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}
