/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import { Iespecialidad } from 'src/app/shared/models/especialidades';
import { PacienteList } from 'src/app/shared/models/paciente';
import { ItipoCitado } from 'src/app/shared/models/tipoCitado';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import { TipoCitadoService } from 'src/app/shared/services/tipo-citado.service';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { Validators } from 'ngx-editor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IcitaMedicaCalendario, citaMedica } from 'src/app/shared/models/cita';
import Swal from 'sweetalert2';
import { CitaService } from 'src/app/shared/services/cita.service';
import { UserLoggedService } from 'src/app/shared/services/user-logged.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MedicoList } from 'src/app/shared/models/medico';
import { MedicoService } from 'src/app/shared/services/medico.service';
import { environment } from 'src/environments/environments';
import { EditarCitaComponent } from './editar-cita/editar-cita.component';
import { AgregarCitaComponent } from './agregar-cita/agregar-cita.component';
import { ModalAgregarPacienteComponent } from '../../patient/modal-agregar-paciente/modal-agregar-paciente.component';
declare var $: any;
@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {
  public routes = routes;
  options: any;
  events: any[] = [];
  citaNueva: citaMedica = new citaMedica();
  citas!: IcitaMedicaCalendario[];
  form!: FormGroup;
  listEspecialidades!: Iespecialidad[];
  especialidadSeleccionada = 'TODOS';
  listPacientes!: PacienteList[];
  listPacientesFiltrados!: PacienteList[];
  pacienteleccionado!: string;
  listEstados!: ItipoCitado[];
  estadoSeleccionado = 'TODOS';
  listMedicos!: MedicoList[];
  medicosSeleccionados: { [key: string]: boolean } = {};
  sede = '';
  isFormSubmitted = false;
  modalRef?: BsModalRef;
  inicio!: string;
  fin!: string;
  @ViewChild('multiUserSearch') multiPacienteSearchInput !: ElementRef;
  constructor(public especialidadService: EspecialidadesService, public tipoCitadoService: TipoCitadoService, public pacienteService: PacienteService,
    public formBuilder: FormBuilder, public citaMedicaService: CitaService, public user: UserLoggedService, public modalService: BsModalService, private medicoService: MedicoService) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }
  ngOnInit(): void {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next,today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay',
      },
      initialView: 'timeGridWeek',
      editable: false,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      locale: esLocale,
      eventClick: this.handleDateClick.bind(this),
      datesSet: (info: any) => {
        this.inicio = new Date(info.start).toISOString().split('T')[0]
        this.fin = new Date(info.end).toISOString().split('T')[0]
        this.obtenerCitasMedicas()
      },
      select: (info: any) => {
        if (info.startStr && info.endStr) {
          const initialState = {
            fechaInicio: info.startStr,
            fechaFin: info.endStr
          };
          const modalOptions = {
            class: 'modal-lg',
            ignoreBackdropClick: true,
            initialState: { ...initialState } as Partial<AgregarCitaComponent>,
          };
          this.modalRef = this.modalService.show(AgregarCitaComponent, modalOptions);
          this.modalRef.onHidden?.subscribe(() => { this.obtenerCitasMedicas() });
        }
      }
    }
    this.especialidadService.obtenerListaEspecialidad().subscribe(data => { this.listEspecialidades = data })
    this.tipoCitadoService.obtenerListaTipoCitado().subscribe(data => { this.listEstados = data; })
    this.pacienteService.obtenerPacientesNombre().subscribe(data => { this.listPacientes = data; })
    this.medicoService.listaMedicos(this.especialidadSeleccionada).subscribe(data => {
      this.listMedicos = data; this.listMedicos.forEach(medico => {
        this.medicosSeleccionados[medico.medicoId] = true;
      });
      this.filtrarCitas();
    })
    this.events = this.citas;
  }
  actualizarMedicos() {
    this.medicoService.listaMedicos(this.especialidadSeleccionada).subscribe(data => {
      this.listMedicos = data; 
      this.listMedicos.forEach(medico => {
        this.medicosSeleccionados[medico.medicoId] = true;
      });
      this.filtrarCitas();
    })
    this.events = this.citas;
  }
  handleDateClick(arg: any) {
    const initialState = {
      citaId: arg.event.id
    };
    const modalOptions = {
      class: 'modal-lg',
      ignoreBackdropClick: true,
      initialState: Object.assign({}, initialState) as Partial<EditarCitaComponent>,
    };
    this.modalRef = this.modalService.show(EditarCitaComponent, modalOptions);
    this.modalRef.onHidden?.subscribe(() => { this.obtenerCitasMedicas() });
  }
  filtrarCitas() {
    const medicosSeleccionadosIds = Object.keys(this.medicosSeleccionados).filter(id => this.medicosSeleccionados[id]);
    if (Array.isArray(this.citas)) {
      const citasFiltradas = this.citas.filter(cita => medicosSeleccionadosIds.includes(cita.medicoId.toString()));
      this.events = citasFiltradas;
    }
  }
  obtenerCitasMedicas() {
    this.citaMedicaService.obtenerCitasMedicasCalendario(this.inicio, this.fin).subscribe((data) => {
      this.citas = data;
      this.filtrarCitas();
      this.events = this.citas;
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
}

