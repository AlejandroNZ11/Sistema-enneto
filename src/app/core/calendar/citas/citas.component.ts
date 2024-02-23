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
import { FormBuilder, FormGroup } from '@angular/forms';
import { citaMedica, citasCalendario, medicosCalendario } from 'src/app/shared/models/cita';
import { CitaService } from 'src/app/shared/services/cita.service';
import { UserLoggedService } from 'src/app/shared/services/user-logged.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MedicoService } from 'src/app/shared/services/medico.service';
import { EditarCitaComponent } from './editar-cita/editar-cita.component';
import { AgregarCitaComponent } from './agregar-cita/agregar-cita.component';
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
  citas!: citasCalendario[];
  form!: FormGroup;
  listEspecialidades!: Iespecialidad[];
  especialidadSeleccionada = 'todos';
  listPacientes!: PacienteList[];
  listPacientesFiltrados!: PacienteList[];
  pacienteleccionado!: string;
  listEstados!: ItipoCitado[];
  estadoSeleccionado = 'todos';
  listMedicos!: medicosCalendario[];
  medicosSeleccionados: { [key: string]: boolean } = {};
  isFormSubmitted = false;
  modalRef?: BsModalRef;
  inicio!: string;
  fin!: string;
  mostrarOpciones = false;
  @ViewChild('multiUserSearch') multiPacienteSearchInput !: ElementRef;
  constructor(public especialidadService: EspecialidadesService, public tipoCitadoService: TipoCitadoService, public pacienteService: PacienteService,
    public formBuilder: FormBuilder, public citaMedicaService: CitaService, public user: UserLoggedService, public modalService: BsModalService, private medicoService: MedicoService) {
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
      allDaySlot: false,
      height: 655,
      slotMinTime: '08:00:00',
      slotMaxTime: '21:00:00',
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
          this.modalRef.content.citaAgregada$.subscribe((citaAgregada: boolean) => {
            if (citaAgregada) this.obtenerCitasMedicas();
          });
        }
      }
    }
    this.especialidadService.obtenerListaEspecialidad().subscribe(data => { this.listEspecialidades = data })
    this.tipoCitadoService.obtenerListaTipoCitado().subscribe(data => { this.listEstados = data; })
    this.pacienteService.obtenerPacientesNombre().subscribe(data => { this.listPacientes = data; })
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
    this.modalRef.content.citaAgregada$.subscribe((citaAgregada: boolean) => {
      if (citaAgregada) this.obtenerCitasMedicas();
    });
  }
  filtrarCitas() {
    const medicosSeleccionadosIds = Object.keys(this.medicosSeleccionados).filter(id => this.medicosSeleccionados[id]);
    if (Array.isArray(this.citas)) {
      const citasFiltradas = this.citas.filter(cita => medicosSeleccionadosIds.includes(cita.medicoId.toString()));
      this.events = citasFiltradas;
    }
  }
  obtenerCitasMedicas() {
    this.citaMedicaService.obtenerCitasMedicasCalendario(this.inicio, this.fin, '', this.estadoSeleccionado, this.especialidadSeleccionada, this.pacienteleccionado).subscribe((data) => {
      this.citas = data.citas;
      this.listMedicos = data.medicos
      if (this.listMedicos) {
        this.listMedicos.forEach(medico => {
          this.medicosSeleccionados[medico.medicoId] = true;
        });
      }
      this.filtrarCitas();
      this.events = this.citas;
    })
  }
  buscarPacientes() {
    const searchInput = this.multiPacienteSearchInput.nativeElement.value
      ? this.multiPacienteSearchInput.nativeElement.value.toLowerCase()
      : '';
    this.mostrarOpciones = searchInput.length >= 3;
    if (this.mostrarOpciones) {
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
  lightenOrDarkenColor(hex: string) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    let result;
    if (brightness > 0.5) {
      result = "#000000"
    } else {
      result = "#ffffff";
    }
    return result;
  }
}

