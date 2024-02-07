/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ModalAgregarPacienteComponent } from 'src/app/core/patient/modal-agregar-paciente/modal-agregar-paciente.component';
import { citaMedica } from 'src/app/shared/models/cita';
import { Iespecialidad } from 'src/app/shared/models/especialidades';
import { MedicoList } from 'src/app/shared/models/medico';
import { PacienteList } from 'src/app/shared/models/paciente';
import { ItipoCitado } from 'src/app/shared/models/tipoCitado';
import { routes } from 'src/app/shared/routes/routes';
import { CitaService } from 'src/app/shared/services/cita.service';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import { MedicoService } from 'src/app/shared/services/medico.service';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { TipoCitadoService } from 'src/app/shared/services/tipo-citado.service';
import { UserLoggedService } from 'src/app/shared/services/user-logged.service';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-cita',
  templateUrl: './agregar-cita.component.html',
  styleUrls: ['./agregar-cita.component.scss']
})
export class AgregarCitaComponent implements OnInit {
  public routes = routes;
  citaNueva: citaMedica = new citaMedica();
  form!: FormGroup;
  listEspecialidadesCitas!: Iespecialidad[];
  listPacientes!: PacienteList[];
  listPacientesFiltrados!: PacienteList[];
  pacienteleccionado!: string;
  nombreBusqueda = '';
  listEstadosCitas!: ItipoCitado[];
  estadoSeleccionadoCita = '';
  listMedicos!: MedicoList[];
  sede = '';
  isFormSubmitted = false;
  fechaInicio!: string;
  fechaFin!: string;
  horaInicio!: string;
  horaFin!: string;
  modalRef?: BsModalRef;
  citaAgregada$: Subject<boolean> = new Subject<boolean>();
  @ViewChild('multiUserSearch') multiPacienteSearchInput !: ElementRef;
  constructor(public especialidadService: EspecialidadesService, public tipoCitadoService: TipoCitadoService, public pacienteService: PacienteService, public bsModalRef: BsModalRef,
    public formBuilder: FormBuilder, public citaMedicaService: CitaService, public user: UserLoggedService, private modalService: BsModalService, private medicoService: MedicoService) { }
  ngOnInit(): void {
    this.citaNueva.especialidadId = 'TODOS'
    this.inicializarFechas();
    this.inicializarFormulario();
    this.sede = this.user.selectedSucursal.nombre;
    this.especialidadService.obtenerListaEspecialidad().subscribe(data => { this.listEspecialidadesCitas = data })
    this.tipoCitadoService.obtenerListaTipoCitado().subscribe(data => { this.listEstadosCitas = data })
    this.pacienteService.obtenerPacientesNombre().subscribe(data => { this.listPacientes = data; })
  }
  inicializarFechas() {
    const fechaCita = new Date(this.fechaInicio);
    const fechaFormato = `${fechaCita.getDate().toString().padStart(2, '0')}/${(fechaCita.getMonth() + 1).toString().padStart(2, '0')}/${fechaCita.getFullYear()}`;
    this.citaNueva.fecha = fechaFormato;
    const fechaIn = new Date(this.fechaInicio);
    this.horaInicio = fechaIn.toLocaleTimeString('en-US', { hour12: false });
    const fechaFin = new Date(this.fechaFin);
    this.horaFin = fechaFin.toLocaleTimeString('en-US', { hour12: false });
  }
  inicializarFormulario() {
    this.form = this.formBuilder.group({
      especialidad: ['', [Validators.required, Validators.maxLength(40)]],
      medico: ['', [Validators.required, Validators.maxLength(40),]],
      fecha: [{ value: this.citaNueva.fecha, disabled: true }, [Validators.required, Validators.maxLength(10)]],
      horaInicio: [{ value: this.citaNueva.horaInicio }, [Validators.required, Validators.maxLength(10)]],
      horaFin: [{ value: this.citaNueva.horaFin }, [Validators.required, Validators.maxLength(10)]],
      paciente: ['', [Validators.required, Validators.maxLength(100)]],
      tipoCitado: ['', [Validators.required, Validators.maxLength(40)]],
      sede: [{ value: this.user.selectedSucursal.nombre, disabled: true }, [Validators.required, Validators.maxLength(10)]],
      estado: ['', [Validators.required, Validators.maxLength(100)]],
      motivoConsulta: ['', [Validators.required, Validators.maxLength(100)]],
      observacion: ['', [Validators.maxLength(100)]],
    })
  }
  buscarPacientes() {
    const searchInput = this.multiPacienteSearchInput.nativeElement.value
      ? this.multiPacienteSearchInput.nativeElement.value.toLowerCase()
      : '';
    if (!this.listPacientesFiltrados) {
      this.listPacientesFiltrados = [...this.listPacientes];
    }
    this.listPacientes = this.listPacientesFiltrados.filter((paciente) => {
      const nombres = paciente.nombres.toLowerCase();
      const apellidos = paciente.apellidos.toLowerCase();
      if (!searchInput) {
        return true;
      }
      return nombres.includes(searchInput) || apellidos.includes(searchInput);
    });
  }
  registrarPaciente() {
    const initialState = {};
    const modalOptions = {
      class: 'modal-lg',
      ignoreBackdropClick: true,
      initialState: { ...initialState } as Partial<ModalAgregarPacienteComponent>,
    };
    this.modalRef = this.modalService.show(ModalAgregarPacienteComponent, modalOptions);
    this.modalRef.onHidden?.subscribe(() => { this.pacienteService.obtenerPacientesNombre().subscribe(data => { this.listPacientes = data; }) });
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
  actualizarMedicos() {
    this.medicoService.listaMedicos(this.citaNueva.especialidadId).subscribe(data => {
      this.listMedicos = data;
    })
  }
  cerrar() { this.citaAgregada$.next(false); this.bsModalRef.hide() }
  guardarCita() {
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.markAllFieldsAsTouched();
      return;
    }
    this.citaNueva.fecha = new Date(this.fechaInicio).toISOString().split('T')[0]
    const fechaInicioLocal = new Date(this.citaNueva.fecha + 'T' + this.horaInicio);
    const fechaFinLocal = new Date(this.citaNueva.fecha + 'T' + this.horaFin);
    fechaInicioLocal.setMinutes(fechaInicioLocal.getMinutes() - fechaInicioLocal.getTimezoneOffset());
    fechaFinLocal.setMinutes(fechaFinLocal.getMinutes() - fechaFinLocal.getTimezoneOffset());
    this.citaNueva.horaInicio = fechaInicioLocal.toISOString().split('.')[0];
    this.citaNueva.horaFin = fechaFinLocal.toISOString().split('.')[0];
    this.citaNueva.sedeId = this.user.selectedSucursal.id.toString();
    this.citaMedicaService.crearCitaMedica(this.citaNueva).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.form.reset();
          this.citaAgregada$.next(true);
          this.bsModalRef.hide();
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}
