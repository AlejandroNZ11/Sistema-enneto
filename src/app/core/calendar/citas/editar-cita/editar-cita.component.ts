import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IcitaMedica } from 'src/app/shared/models/cita';
import { Iespecialidad } from 'src/app/shared/models/especialidades';
import { MedicoList } from 'src/app/shared/models/medico';
import { PacienteList } from 'src/app/shared/models/paciente';
import { ItipoCitado } from 'src/app/shared/models/tipoCitado';
import { routes } from 'src/app/shared/routes/routes';
import { CitaService } from 'src/app/shared/services/cita.service';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import { MedicoService } from 'src/app/shared/services/medico.service';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { SedeService } from 'src/app/shared/services/sede.service';
import { TipoCitadoService } from 'src/app/shared/services/tipo-citado.service';
import { UserLoggedService } from 'src/app/shared/services/user-logged.service';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { ClonarCitaComponent } from '../clonar-cita/clonar-cita.component';

@Component({
  selector: 'app-editar-cita',
  templateUrl: './editar-cita.component.html',
  styleUrls: ['./editar-cita.component.scss']
})
export class EditarCitaComponent implements OnInit {
  citaEditar!: IcitaMedica;
  form!: FormGroup;
  listEspecialidadesCitas!: Iespecialidad[];
  especialidadSeleccionadaCita = '';
  citaId!: string;
  pacienteseleccionado!: string;
  filteredPacientes!: PacienteList[];
  nombreBusqueda = '';
  listEstadosCitas!: ItipoCitado[];
  estadoSeleccionadoCita = '';
  listMedicos!: MedicoList[];
  sede = '';
  isFormSubmitted = false;
  modalRef?: BsModalRef;
  public routes = routes;

  constructor(public especialidadService: EspecialidadesService, public tipoCitadoService: TipoCitadoService, public pacienteService: PacienteService, public bsModalRef: BsModalRef,
    public formBuilder: FormBuilder, public citaMedicaService: CitaService, public user: UserLoggedService, private modalService: BsModalService, private medicoService: MedicoService,
    public sedeService: SedeService, private router: Router) { }
  ngOnInit(): void {
    this.sede = this.user.selectedSucursal.nombre;
    this.especialidadService.obtenerListaEspecialidad().subscribe(data => { this.listEspecialidadesCitas = data })
    this.tipoCitadoService.obtenerListaTipoCitado().subscribe(data => { this.listEstadosCitas = data })
    this.medicoService.obtenerMedicos(environment.clinicaId, 1, 100).subscribe(data => { this.listMedicos = data.data; })
    this.citaMedicaService.obtenerCitaMedica(this.citaId).subscribe(data => {
      this.citaEditar = data;
      this.sedeService.obtenerSede(data.sedeId).subscribe(data => this.sede = data.nombre);
      this.pacienteseleccionado = data.pacienteId;
      this.pacienteService.obtenerPaciente(data.pacienteId).subscribe(data => this.pacienteseleccionado = data.nombres + ' ' + data.apellidos)
      this.citaEditar.horaInicio = data.horaInicio.split("T")[1];
      this.citaEditar.horaFin = data.horaFin.split("T")[1];
      this.inicializarFormulario();
    })
  }
  inicializarFormulario() {
    this.form = this.formBuilder.group({
      especialidad: ['', [Validators.required, Validators.maxLength(40)]],
      medico: ['', [Validators.required, Validators.maxLength(40),]],
      fecha: ['', [Validators.maxLength(100)]],
      horaInicio: ['', [Validators.required, Validators.maxLength(100)]],
      horaFin: ['', [Validators.required, Validators.maxLength(100)]],
      tipoCitado: ['', [Validators.required, Validators.maxLength(40)]],
      sede: [{ value: this.sede, disabled: true }, [Validators.required, Validators.maxLength(10)]],
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
  irHistoria() {
    this.bsModalRef.hide();
    this.router.navigate([`/paciente/historia-paciente/${this.citaEditar.pacienteId}`]);
  }
  clonar() {
    if (this.bsModalRef) {
      this.bsModalRef.hide();
      const onHideCallback = () => {
        const initialState = {
          citaId: this.citaEditar.citaMedicaId,
        };
        const modalOptions = {
          class: 'modal-md',
          ignoreBackdropClick: true,
          initialState: { ...initialState } as Partial<ClonarCitaComponent>,
        };
        this.modalRef = this.modalService.show(ClonarCitaComponent, modalOptions);
      };
      if (this.bsModalRef.onHidden) {
        this.bsModalRef.onHidden.subscribe(onHideCallback);
      }
    }
  }
  actualizar() {
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.markAllFieldsAsTouched();
      return;
    }
    if (this.form.valid) {
      const [horaInicio, minutoInicio] = this.citaEditar.horaInicio.split(":");
      const [horaFin, minutoFin] = this.citaEditar.horaFin.split(":");
      const totalInicio = parseInt(horaInicio) * 60 + parseInt(minutoInicio);
      const totalFin = parseInt(horaFin) * 60 + parseInt(minutoFin);
      if (totalInicio < totalFin) {
        this.citaEditar.fecha = new Date(this.citaEditar.fecha).toISOString().split('T')[0]
        const fechaInicioLocal = new Date(this.citaEditar.fecha + 'T' + this.citaEditar.horaInicio);
        const fechaFinLocal = new Date(this.citaEditar.fecha + 'T' + this.citaEditar.horaFin);
        fechaInicioLocal.setMinutes(fechaInicioLocal.getMinutes() - fechaInicioLocal.getTimezoneOffset());
        fechaFinLocal.setMinutes(fechaFinLocal.getMinutes() - fechaFinLocal.getTimezoneOffset());
        this.citaEditar.horaInicio = fechaInicioLocal.toISOString().split('.')[0];
        this.citaEditar.horaFin = fechaFinLocal.toISOString().split('.')[0];
        this.citaMedicaService.actualizarPaciente(this.citaEditar, this.citaEditar.citaMedicaId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire(response.message, '', 'success');
              this.form.reset();
              this.bsModalRef.hide();
            } else {
              console.error(response.message);
            }
          },
          (error) => {
            console.error(error);
          });
      }
      else {
        Swal.fire('La hora de fin debe ser mayor que la de inicio', '', 'error');
      }
    }
  }

}
