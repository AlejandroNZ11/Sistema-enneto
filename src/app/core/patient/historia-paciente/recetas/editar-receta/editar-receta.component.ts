import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Editor, NgxEditorComponent, Toolbar } from 'ngx-editor';
import { Subject } from 'rxjs';
import { DataConsentimiento, Iconsentimiento } from 'src/app/shared/models/consentimiento';
import { MedicoList } from 'src/app/shared/models/medico';
import { pacienteConsentimiento } from 'src/app/shared/models/pacienteConsentimiento';
import { ConsentimientoService } from 'src/app/shared/services/consentimiento.service';
import { MedicoService } from 'src/app/shared/services/medico.service';
import { PacienteConsentimientoService } from 'src/app/shared/services/pacienteConsentimiento.service';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { SharedService } from '../../services/shared-service.service';
import { Enfermedad } from 'src/app/shared/models/enfermedad';
import { EnfermedadService } from 'src/app/shared/services/enfermedad.service';
import { pacienteRecetaRequest } from 'src/app/shared/models/pacienteReceta';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { PacienteEditar } from '../../../../../shared/models/paciente';
import { IPacienteReceta } from '../../../../../shared/models/pacienteReceta';
interface IMenorEdad{
  id:number;
  nombre:string;
}
interface IMedico{
  id:number;
  nombre:string;
}
@Component({
  selector: 'app-editar-receta',
  templateUrl: './editar-receta.component.html',
  styleUrls: ['./editar-receta.component.scss'],
})


export class EditarRecetaComponent implements OnInit{
  pacienteId="";

  form!: FormGroup;
  isFormSubmitted = false;
  consentimientoPacienteAgregado$: Subject<boolean> = new Subject<boolean>();
  pacienteConsentimiento: pacienteConsentimiento = new pacienteConsentimiento();
  pacienteRecetaR:pacienteRecetaRequest = new pacienteRecetaRequest();
  editorReceta!: Editor;
  editorIndicacion!: Editor;
  pacienteSeleccionado$!:IPacienteReceta;
  edad$:string='';

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  listaMedicos:Array<MedicoList>=[];
  enfermedadList:Array<Enfermedad> = [];

  cantidad:number =8;


  @ViewChild(NgxEditorComponent) editorText?: NgxEditorComponent;
  consentimientoList:Iconsentimiento[]=[];


  ngOnInit(): void {
    this.enfermedadService.obtenerEnfermedadesList().subscribe(data => {this.enfermedadList = data;})
    this.editorReceta = new Editor();
    this.editorIndicacion= new Editor();
    this.consetimientoService.obtenerConsentimientos(environment.clinicaId,1,7).subscribe((data:DataConsentimiento)=>{
      this.consentimientoList = data.data;
    })

    this.medicoService.listaMedicos('e567ce10-7a58-4b8c-c350-08dc274d8014').subscribe(data=>{
      this.listaMedicos = data;
    })

    this.sharedService.pacientID.subscribe((id)=>{
      this.pacienteId = id
    });
    this.form.patchValue({
      medicoId:this.pacienteSeleccionado$.medicoId,
      fecha:this.pacienteSeleccionado$.fecha,
      hora:this.pacienteSeleccionado$.hora,
      diagnostico1: this.pacienteSeleccionado$.codigoEnfermedad01,
      diagnostico2: this.pacienteSeleccionado$.codigoEnfermedad02,
      cuerpoReceta:this.pacienteSeleccionado$.receta,
      cuerpoIndicacion: this.pacienteSeleccionado$.indicaciones,
    })

  }


  constructor(public bsModalRef: BsModalRef,public fb: FormBuilder, public consetimientoService:ConsentimientoService,  public medicoService: MedicoService,private pacienteCOnsentimientoService: PacienteConsentimientoService, public sharedService:SharedService, private enfermedadService: EnfermedadService){
    this.form = this.fb.group({
      medicoId: ['', Validators.required],
      fecha: [{ value:'', disabled: true }],
      hora:[{ value: this.currentTime, disabled: true }],
      diagnostico1:['',Validators.required],
      diagnostico2:['',Validators.required],
      cuerpoReceta:['',Validators.required],
      cuerpoIndicacion:['',Validators.required],

      terminoBusquedaMedico:[''],
      terminoBusquedaDiagnostico1: [''],
      terminoBusquedaDiagnostico2: [''],
    });
  }

  currentTime: string = '';
  // Define un temporizador para actualizar la hora cada segundo
  private timer: any;

  getCurrentTime(): void {
    // Obtiene la hora actual
    const now = new Date();
    // Formatea la hora, minuto y segundo
    const hour = this.padNumber(now.getHours());
    const minute = this.padNumber(now.getMinutes());
    const second = this.padNumber(now.getSeconds());
    // Retorna la hora formateada
    this.currentTime = `${hour}:${minute}:${second}`;
  }

  // Función para agregar un cero delante de los números menores a 10
  padNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  convertToTicks(fecha:Date){
    return ((fecha.getTime()*10000) + 621355968000000000)
  }


  convertToDateTime(fecha:any){
     // Convertir la cadena de fecha a un objeto de tipo Date
     const fechaDate = new Date(fecha);

     // Obtener la fecha en formato ISO 8601 sin la zona horaria (sin la parte de "GMT-0500")
     const fechaISO = fechaDate.toISOString().split("T")[0];

     // Combinar la fecha en formato ISO 8601 con la cadena de hora
     const fechaHoraISO = fechaISO + "T" + this.currentTime + ".000Z";

     // Crear un objeto de tipo Date a partir de la cadena en formato ISO 8601
     const date = new Date(fechaHoraISO);

     return date;
  }

  editarReceta(){


    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.isTouched()
      console.log("error");
      return;
    }


    this.isFormSubmitted = true;
    // this.pacienteConsentimiento.pacienteId = this.pacienteId;
    // this.pacienteConsentimiento.medicoId = this.form.get("medicoId")?.value;
    // this.pacienteConsentimiento.fecha = this.form.get("fecha")?.value;

    // const date = this.convertToDateTime(this.form.get("fecha")?.value);


    // this.pacienteConsentimiento.hora.ticks = this.convertToTicks(date);
    // this.pacienteConsentimiento.apoderadoNombre= this.form.get("nombreApoderado")?.value;
    // this.pacienteConsentimiento.apoderadoDocumento= this.form.get("documentoApoderado")?.value;
    // this.pacienteConsentimiento.apoderadoDireccion= this.form.get("direccionApoderado")?.value;
    // this.pacienteConsentimiento.tipoConsentimientoId= this.form.get("tipoConsentimientoId")?.value;
    // this.pacienteConsentimiento.pacienteRelacionadoId= this.form.get("pacienteRelacionadoId")?.value;

    this.pacienteRecetaR.pacienteId = this.pacienteId;
    this.pacienteRecetaR.medicoId =  this.form.get("medicoId")?.value;
    this.pacienteRecetaR.fecha = this.form.get("fecha")?.value;
    const date = this.convertToDateTime(this.form.get("fecha")?.value);

    this.pacienteRecetaR.hora = this.convertToTicks(date);
    this.pacienteRecetaR.codigoEnfermedad01 = this.form.get('diagnostico1')?.value;
    this.pacienteRecetaR.codigoEnfermedad02 = this.form.get('diagnostico2')?.value;
    this.pacienteRecetaR.receta = this.form.get('cuerpoReceta')?.value;
    this.pacienteRecetaR.indicaciones = this.form.get('cuerpoReceta')?.value;



    console.log(this.pacienteRecetaR);

    this.pacienteCOnsentimientoService.agregarPacienteConsentimiento(this.pacienteConsentimiento).subscribe((response) => {
      if (response.isSuccess) {
        Swal.fire({
          title: 'Actualizando...',
          allowOutsideClick: false,
        })
        Swal.showLoading();
        Swal.close();
        Swal.fire(response.message,'', 'success');
        this.consentimientoPacienteAgregado$.next(true);
      } else {
        console.error(response.message);
      }
    },
    (error) => {
      console.error(error);
    })

  }


  cancelar() {
    this.consentimientoPacienteAgregado$.next(false);
    this.bsModalRef.hide()
  }






  get medicosFiltrados(): MedicoList[] {
    return this.listaMedicos.filter(nombre =>
      nombre.nombre.toLowerCase().includes(this.form.get('terminoBusquedaMedico')?.value.toLowerCase())
    );
  }
  get enfermedadFiltradas1(): Enfermedad[] {
    return this.enfermedadList.filter(nombre =>
      nombre.descripcion.toLowerCase().includes(this.form.get('terminoBusquedaDiagnostico1')?.value.toLowerCase())
    );
  }
  get enfermedadFiltradas2(): Enfermedad[] {
    return this.enfermedadList.filter(nombre =>
      nombre.descripcion.toLowerCase().includes(this.form.get('terminoBusquedaDiagnostico2')?.value.toLowerCase())
    );
  }


  get menorDeEdadFiltrados(): IMenorEdad[] {
    return this.menorDeEdad.filter(nombre =>
      nombre.nombre.toLowerCase().includes(this.form.get('terminoBusquedaMenorEdad')?.value.toLowerCase())
    );
  }


  medicos:IMedico[] =[
    {id:1,nombre:'juan'},
    {id:2,nombre:'andres'},

  ]
  consentimiento:string[] =['consentimiento 1', 'consentimiento 2','aaaaaa']
  menorDeEdad:IMenorEdad[] =[
    {id:1,nombre:'juan carlos'},
    {id:2,nombre:'pepe'},
    {id:3,nombre:'luchito'},
    {id:4,nombre:'omar'},

  ]


  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
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
}
