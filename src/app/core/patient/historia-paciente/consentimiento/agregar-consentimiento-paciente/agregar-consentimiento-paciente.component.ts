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
  pacienteId="";

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

  cantidad:number =8;


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

    this.sharedService.pacientID.subscribe((id)=>{
      this.pacienteId = id
    });





  }



  ngOnDestroy(): void {
    this.editor.destroy();
    clearInterval(this.timer);
  }





  constructor(public bsModalRef: BsModalRef,public fb: FormBuilder, public consetimientoService:ConsentimientoService,  public medicoService: MedicoService,private pacienteCOnsentimientoService: PacienteConsentimientoService, public sharedService:SharedService){
    this.form = this.fb.group({
      medicoId: ['', Validators.required],
      fecha: ['', Validators.required],
      hora:[{ value: this.currentTime, disabled: true }],
      nombreApoderado: ['', [Validators.required, Validators.maxLength(100)]],
      documentoApoderado:['',[Validators.required, Validators.maxLength(this.cantidad), Validators.minLength(this.cantidad), Validators.pattern('^[0-9]+$')]],
      direccionApoderado:['',[Validators.required, Validators.maxLength(100)]],
      tipoConsentimientoId:['',Validators.required],
      pacienteRelacionadoId:['',Validators.required],
      cuerpo:[''],

      terminoBusquedaMenorEdad: [''],
      terminoBusquedaMedico:['']
    });







    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }

  soloNumeros(event: Event) {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    input.value = currentValue.replace(/[^0-9]/g, '');
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
    // return ((fecha.getTime()*10000) + 621355968000000000)
    const hourTicks = fecha.getHours() * 3600000; // 1 hora en ticks
    const minuteTicks = fecha.getMinutes() * 60000; // 1 minuto en ticks
    const secondTicks = fecha.getSeconds() * 1000; // 1 segundo en ticks
    return hourTicks + minuteTicks + secondTicks;
  }


  convertToDateTime(fechaOriginal:Date){
     // Obtener los componentes de la fecha
     const year: number = fechaOriginal.getFullYear(); // Año
     const month: number = fechaOriginal.getMonth() + 1; // Mes (se suma 1 porque los meses van de 0 a 11)
     const day: number = fechaOriginal.getDate(); // Día
     const hours: number = fechaOriginal.getHours(); // Horas
     const minutes: number = fechaOriginal.getMinutes(); // Minutos
     const seconds: number = fechaOriginal.getSeconds(); // Segundos

     // Formatear la fecha en el formato deseado
     const fechaFormateada: string = `${year}-${
       month < 10 ? '0' + month : month
     }-${
       day < 10 ? '0' + day : day
     }T${
       hours < 10 ? '0' + hours : hours
     }:${
       minutes < 10 ? '0' + minutes : minutes
     }:${
       seconds < 10 ? '0' + seconds : seconds
     }.000Z`;

     return fechaFormateada;
  }

  myconvertToTicks(hour: number, minute: number, second: number): number {
    // Convertir la hora, minutos y segundos a milisegundos
    const totalMilliseconds = (hour * 3600 + minute * 60 + second) * 1000;
    // Calcular los "ticks" equivalentes (10000 ticks por milisegundo)
    return totalMilliseconds * 10000;
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
}

binaryString:string ='';

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
    }

    const formData = new FormData();

    formData.append('PacienteId', this.pacienteId);
    formData.append('ConsentimientoId', this.form.get('tipoConsentimientoId')?.value);
    formData.append('MedicoId', this.form.get("medicoId")?.value);
    formData.append('Cuerpo', this.form.get('cuerpo')?.value);
    // const fechaOriginal = this.convertToDateTime();
    const fechaOriginal: Date = new Date(this.form.get("fecha")?.value);

      const fecha = this.convertToDateTime(fechaOriginal);
    formData.append('Fecha', fecha.toString());


    const hora = this.currentTime;
    const [hour, minute, second] = hora.split(':').map(Number);
    const horaTicks = this.myconvertToTicks(hour, minute, second);

    formData.append('Hora', horaTicks.toString());
    formData.append('ApoderadoNombre', this.form.get("nombreApoderado")?.value);
    formData.append('ApoderadoDocumento', this.form.get("documentoApoderado")?.value);
    formData.append('ApoderadoDireccion', this.form.get("direccionApoderado")?.value);
    formData.append('PacienteRelacionadoId',this.form.get("pacienteRelacionadoId")?.value);


    canvas.toBlob((blob) => {
      // Crea un nuevo archivo a partir del blob
      if(blob){
      const file = new File([blob], 'img.png', { type: 'image/png' });
      formData.append('Firma', file);
      formData.append('Estado', '0');


      this.pacienteCOnsentimientoService.agregarPacienteConsentimiento(formData).subscribe((response) => {
        if (response.isSuccess) {
          Swal.fire({
            title: 'Actualizando...',
            allowOutsideClick: false,
          })
          Swal.showLoading();
          Swal.close();
          Swal.fire(response.message,'', 'success');
          this.consentimientoPacienteAgregado$.next(true);
          this.bsModalRef.hide();
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      })

      }

    }, 'image/png');

    this.isFormSubmitted = true;
    this.pacienteConsentimiento.pacienteId = this.pacienteId;
    this.pacienteConsentimiento.medicoId = this.form.get("medicoId")?.value;
    this.pacienteConsentimiento.fecha = this.form.get("fecha")?.value;

    // const date = this.convertToDateTime(this.form.get("fecha")?.value);


    // this.pacienteConsentimiento.hora.ticks = this.convertToTicks(date);
    this.pacienteConsentimiento.apoderadoNombre= this.form.get("nombreApoderado")?.value;
    this.pacienteConsentimiento.apoderadoDocumento= this.form.get("documentoApoderado")?.value;
    this.pacienteConsentimiento.apoderadoDireccion= this.form.get("direccionApoderado")?.value;
    this.pacienteConsentimiento.tipoConsentimientoId= this.form.get("tipoConsentimientoId")?.value;
    this.pacienteConsentimiento.pacienteRelacionadoId= this.form.get("pacienteRelacionadoId")?.value;

    // const tempElement = document.createElement('div');
    // tempElement.innerHTML = this.form.get('cuerpo')?.value;

    // // Obtener el texto sin formato
    // const textoSinFormato = tempElement.textContent || tempElement.innerText;

    this.pacienteConsentimiento.cuerpo = this.form.get('cuerpo')?.value;





    // console.log(this.pacienteConsentimiento);


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
   // Obtener el canvas y el contexto 2D
   const canvas = document.getElementById("canvasId") as HTMLCanvasElement;
   const contexto = canvas.getContext("2d");

   // Limpiar el canvas
   if (contexto) {
       contexto.clearRect(0, 0, canvas.width, canvas.height);
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
