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
interface IMenorEdad{
  id:number;
  nombre:string;
}
interface IMedico{
  id:number;
  nombre:string;
}
@Component({
  selector: 'app-agregar-consentimiento-paciente',
  templateUrl: './agregar-consentimiento-paciente.component.html',
  styleUrls: ['./agregar-consentimiento-paciente.component.scss'],
})


export class AgregarConsentimientoPacienteComponent implements AfterViewInit,OnInit,OnDestroy {

  form!: FormGroup;
  isFormSubmitted = false;
  consentimientoPacienteAgregado$: Subject<boolean> = new Subject<boolean>();
  pacienteConsentimiento: pacienteConsentimiento = new pacienteConsentimiento();
  editor!: Editor;
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


  @ViewChild(NgxEditorComponent) editorText?: NgxEditorComponent;
  consentimientoList:Iconsentimiento[]=[];


  ngOnInit(): void {
    this.editor = new Editor();
    this.consetimientoService.obtenerConsentimientos(environment.clinicaId,1,7).subscribe((data:DataConsentimiento)=>{
      this.consentimientoList = data.data;
    })
    this.medicoService.listaMedicos('e567ce10-7a58-4b8c-c350-08dc274d8014').subscribe(data=>{
      this.listaMedicos = data;
    })
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    clearInterval(this.timer);
  }





  constructor(public bsModalRef: BsModalRef,public fb: FormBuilder, public consetimientoService:ConsentimientoService,  public medicoService: MedicoService,private pacienteCOnsentimientoService: PacienteConsentimientoService){
    this.form = this.fb.group({
      medicoId: ['', Validators.required],
      fecha: ['', Validators.required],
      hora:[{ value: this.currentTime, disabled: true }],
      nombreApoderado: ['', [Validators.required, Validators.maxLength(100)]],
      documentoApoderado:['',[Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern('^[0-9]+$')]],
      direccionApoderado:['',[Validators.required, Validators.maxLength(100)]],
      tipoConsentimientoId:['',Validators.required],
      pacienteId:['',Validators.required],
      cuerpo:[''],

      terminoBusquedaMenorEdad: [''],
      terminoBusquedaMedico:['']
    });



    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
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


  agregarConsentimiento(){
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.isTouched()
      console.log("error");
      return;
    }

    const canvas = document.getElementById("canvasId") as HTMLCanvasElement;


    if(this.isCanvasEmpty(canvas)){
      Swal.showLoading();
      Swal.close();
      Swal.fire('Debe firmar el consentimiento','', 'warning');
      return;
    }else{
      this.pacienteConsentimiento.firma =  canvas.toDataURL("image/png");
    }

    this.isFormSubmitted = true;
    this.pacienteConsentimiento.medicoId = this.form.get("medicoId")?.value;
    this.pacienteConsentimiento.fecha = this.form.get("fecha")?.value;
    this.pacienteConsentimiento.hora.ticks = parseInt(this.currentTime);
    this.pacienteConsentimiento.nombreApoderado= this.form.get("nombreApoderado")?.value;
    this.pacienteConsentimiento.documentoApoderado= this.form.get("documentoApoderado")?.value;
    this.pacienteConsentimiento.direccionApoderado= this.form.get("direccionApoderado")?.value;
    this.pacienteConsentimiento.tipoConsentimientoId= this.form.get("tipoConsentimientoId")?.value;
    this.pacienteConsentimiento.pacienteId= this.form.get("pacienteId")?.value;

    // const tempElement = document.createElement('div');
    // tempElement.innerHTML = this.form.get('cuerpo')?.value;

    // // Obtener el texto sin formato
    // const textoSinFormato = tempElement.textContent || tempElement.innerText;

    this.pacienteConsentimiento.cuerpo = this.form.get('cuerpo')?.value;






    console.log(this.pacienteConsentimiento);

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

  isCanvasEmpty(canvas: HTMLCanvasElement): boolean {
    const context = canvas.getContext('2d');
    let imageData:any;
    if(context){
     imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
    }
    // Verificar si todos los píxeles son transparentes
    return !imageData.some((value:any) => value !== 0);
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


  ngAfterViewInit(): void {
    const $canvas = document.getElementById("canvasId");
    const contexto = ($canvas as HTMLCanvasElement).getContext("2d");
    if(contexto && $canvas){
      let haComenzadoDibujo = false;
      let xAnterior = 0;
      let yAnterior = 0;
      let xActual = 0;
      let yActual = 0;

      const GROSOR = 2; // Grosor del pincel
      const COLOR_PINCEL = "black"; // Color del pincel

      $canvas.addEventListener("mousedown", (evento: MouseEvent) => {
        // En este evento solo se ha iniciado el clic, así que dibujamos un punto
        xAnterior = xActual;
        yAnterior = yActual;
        xActual = obtenerXReal(evento.clientX);
        yActual = obtenerYReal(evento.clientY);
        contexto.beginPath();
        contexto.fillStyle = COLOR_PINCEL;
        contexto.fillRect(xActual, yActual, GROSOR, GROSOR);
        contexto.closePath();
        // Y establecemos la bandera
        haComenzadoDibujo = true;
      });

      $canvas.addEventListener("mousemove", (evento: MouseEvent) => {
        if (!haComenzadoDibujo) {
          return;
        }
        // El mouse se está moviendo y el usuario está presionando el botón, así que dibujamos todo

        xAnterior = xActual;
        yAnterior = yActual;
        xActual = obtenerXReal(evento.clientX);
        yActual = obtenerYReal(evento.clientY);
        contexto.beginPath();
        contexto.moveTo(xAnterior, yAnterior);
        contexto.lineTo(xActual, yActual);
        contexto.strokeStyle = COLOR_PINCEL;
        contexto.lineWidth = GROSOR;
        contexto.stroke();
        contexto.closePath();
      });

      ["mouseup", "mouseout"].forEach(nombreDeEvento => {
        $canvas.addEventListener(nombreDeEvento, () => {
            haComenzadoDibujo = false;
        });
      });

      function obtenerXReal(x: number): number {
        return x - $canvas!.getBoundingClientRect().left;
      }

      function obtenerYReal(y: number): number {
        return y - $canvas!.getBoundingClientRect().top;
      }
    }
  }

  public limpiarCanvas() {
    // Colocar color blanco en fondo de canvas
    const $canvas = document.getElementById("canvasId");
    const contexto = ($canvas as HTMLCanvasElement).getContext("2d");
    const COLOR_FONDO = "white";
    if(contexto && $canvas  instanceof HTMLCanvasElement){
      contexto.fillStyle = COLOR_FONDO;
      contexto.fillRect(0, 0, $canvas!.width, $canvas!.height);
    }


  };

  public guardarFirma(){
    const canvas = document.getElementById("canvasId") as HTMLCanvasElement;
    const base64Firma = canvas.toDataURL("image/png");

    console.log(base64Firma);
  }

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
