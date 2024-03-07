import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
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
import Swal from 'sweetalert2';
import { ClonarCitaComponent } from '../clonar-cita/clonar-cita.component';
import { Subject, finalize } from 'rxjs';
import { DOCUMENT } from '@angular/common';
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
  isLoading = false;
  whatsappMessage = '';
  numero = '';
  public routes = routes;
  protected estados =
    [{ name: "Nuevo", value: 0 },
    { name: "Reingreso", value: 1 },
    { name: "Continuador", value: 2 }]
  citaAgregada$: Subject<boolean> = new Subject<boolean>();
  constructor(public especialidadService: EspecialidadesService, public tipoCitadoService: TipoCitadoService, public pacienteService: PacienteService, public bsModalRef: BsModalRef,
    public formBuilder: FormBuilder, public citaMedicaService: CitaService, public user: UserLoggedService, private modalService: BsModalService, private medicoService: MedicoService,
    public sedeService: SedeService, private router: Router) { }
  ngOnInit(): void {
    this.isLoading = true;
    this.sede = this.user.selectedSucursal.nombre;
    this.especialidadService.obtenerListaEspecialidad().subscribe(data => { this.listEspecialidadesCitas = data })
    this.tipoCitadoService.obtenerListaTipoCitado().subscribe(data => { this.listEstadosCitas = data })
    this.citaMedicaService.obtenerCitaMedica(this.citaId).subscribe(data => {
      this.citaEditar = data;
      this.sedeService.obtenerSede(data.sedeId).subscribe(data => this.sede = data.nombre);
      this.pacienteseleccionado = data.pacienteId;
      this.citaEditar.horaInicio = data.horaInicio.split("T")[1];
      this.citaEditar.horaFin = data.horaFin.split("T")[1];
      this.inicializarFormulario();
      this.pacienteService.obtenerPaciente(data.pacienteId).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(data => {
        this.pacienteseleccionado = data.nombres + ' ' + data.apellidos,
          this.numero = data.celular
        this.whatsappMessage = ` Hola ${this.pacienteseleccionado} somos *ENNETO DENTAL*, te escribimos para recordar tu cita el dia *${this.citaEditar.fecha.split("T")[0]}*  a las *${this.citaEditar.horaInicio}* MOTIVO DE LA CONSULTA: *${this.citaEditar.motivoConsulta}* . en la Sede ${this.sede}  . Para confirmar tu reserva, escribe *CONFIRMO*, para cancelarla *CANCELAR* y si desea reprogramar una cita escribe *REPROGRAMAR*.`
      })
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
  cerrar() { this.citaAgregada$.next(false); this.bsModalRef.hide() }
  actualizarMedicos() {
    this.medicoService.listaMedicos(this.citaEditar.especialidadId).subscribe(data => {
      this.listMedicos = data;
    })
  }
  irHistoria() {
    this.bsModalRef.hide();
    this.router.navigate([`/paciente/historia-paciente/filiacion/${this.citaEditar.pacienteId}`]);
  }
  clonar() {
    const initialState = {
      citaId: this.citaEditar.citaMedicaId,
    };
    const modalOptions = {
      ignoreBackdropClick: true,
      initialState: { ...initialState } as Partial<ClonarCitaComponent>,
    };
    this.modalRef = this.modalService.show(ClonarCitaComponent, modalOptions);
  }
  #document = inject(DOCUMENT);
  enviarMensaje() {
    const url = `https://api.whatsapp.com/send/?phone=51${this.numero}&text=${encodeURI(this.whatsappMessage)}`;
    const anchor = this.#document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.click();
    anchor.remove();
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
      else {
        Swal.fire('La hora de fin debe ser mayor que la de inicio', '', 'error');
      }
    }
  }

}
