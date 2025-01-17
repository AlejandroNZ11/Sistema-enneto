import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Editor, NgxEditorComponent, Toolbar } from 'ngx-editor';
import { Subject } from 'rxjs';
import { DataConsentimiento, Iconsentimiento } from 'src/app/shared/models/consentimiento';
import { MedicoList } from 'src/app/shared/models/medico';
import { IPacienteConsentimiento, pacienteConsentimiento, pacienteConsentimientoEditar } from 'src/app/shared/models/pacienteConsentimiento';
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
  selector: 'app-editar-consentimiento-paciente',
  templateUrl: './editar-consentimiento-paciente.component.html',
  styleUrls: ['./editar-consentimiento-paciente.component.scss']
})
export class EditarConsentimientoPacienteComponent implements AfterViewInit,OnInit {
  pacienteId="";

  form!: FormGroup;
  isFormSubmitted = false;
  consentimientoPacienteEditado$: Subject<boolean> = new Subject<boolean>();
  pacienteConsentimiento: pacienteConsentimientoEditar = new pacienteConsentimientoEditar();
  consentimientoSeleccionado!:IPacienteConsentimiento;
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
    console.log(this.consentimientoSeleccionado);
    this.editor = new Editor();
    this.consetimientoService.obtenerConsentimientos(environment.clinicaId,1,7).subscribe((data:DataConsentimiento)=>{
      this.consentimientoList = data.data;
    })

    this.medicoService.listaMedicos('e567ce10-7a58-4b8c-c350-08dc274d8014').subscribe(data=>{
      this.listaMedicos = data;
    })

    this.sharedService.pacientID.subscribe((id)=>{
      this.pacienteId = id
    })

    this.form.patchValue({
      medicoId: this.consentimientoSeleccionado.medicoId,
      fecha: this.consentimientoSeleccionado.fecha,
      hora: this.consentimientoSeleccionado.hora,
      nombreApoderado:this.consentimientoSeleccionado.apoderadoNombre,
      documentoApoderado:this.consentimientoSeleccionado.apoderadoDocumento,
      direccionApoderado:this.consentimientoSeleccionado.apoderadoDireccion,
      tipoConsentimientoId:this.consentimientoSeleccionado.consentimientoId,
      cuerpo:this.consentimientoSeleccionado.cuerpo,
      pacienteRelacionadoId: this.consentimientoSeleccionado.pacienteRelacionadoId,


    })
  }

  // ngOnDestroy(): void {
  //   this.editor.destroy();
  //   clearInterval(this.timer);
  // }





  constructor(public bsModalRef: BsModalRef,public fb: FormBuilder, public consetimientoService:ConsentimientoService,  public medicoService: MedicoService,private pacienteCOnsentimientoService: PacienteConsentimientoService, public sharedService:SharedService){
    this.form = this.fb.group({
      medicoId: ['', Validators.required],
      fecha: ['', Validators.required],
      hora:[{ value: '', disabled: true }],
      nombreApoderado: ['', [Validators.required, Validators.maxLength(100)]],
      documentoApoderado:['',[Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern('^[0-9]+$')]],
      direccionApoderado:['',[Validators.required, Validators.maxLength(100)]],
      tipoConsentimientoId:['',Validators.required],
      pacienteRelacionadoId:['',Validators.required],
      cuerpo:[''],

      terminoBusquedaMenorEdad: [''],
      terminoBusquedaMedico:['']
    });



    // this.timer = setInterval(() => {
    //   this.getCurrentTime();
    // }, 1000);
  }




  currentTime: string = '';
  cantidad:number =8;


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
  soloNumeros(event: Event) {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    input.value = currentValue.replace(/[^0-9]/g, '');
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

  base64Imagen ='';
  editarConsentimiento(){


    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.isTouched()
      console.log("error");
      return;
    }




    this.isFormSubmitted = true;
    this.pacienteConsentimiento.pacienteConsentimientoId = this.consentimientoSeleccionado.pacienteConsentimientoId
    this.pacienteConsentimiento.pacienteId = this.pacienteId;
    this.pacienteConsentimiento.medicoId = this.form.get("medicoId")?.value;
    this.pacienteConsentimiento.fecha = this.consentimientoSeleccionado.fecha;



    this.pacienteConsentimiento.hora = this.consentimientoSeleccionado.hora;
    this.pacienteConsentimiento.apoderadoNombre= this.form.get("nombreApoderado")?.value;
    this.pacienteConsentimiento.apoderadoDocumento= this.form.get("documentoApoderado")?.value;
    this.pacienteConsentimiento.apoderadoDireccion= this.form.get("direccionApoderado")?.value;
    this.pacienteConsentimiento.tipoConsentimientoId= this.form.get("tipoConsentimientoId")?.value;
    this.pacienteConsentimiento.pacienteRelacionadoId= this.form.get("pacienteRelacionadoId")?.value;
    this.pacienteConsentimiento.firma = this.base64Imagen;

    // const tempElement = document.createElement('div');
    // tempElement.innerHTML = this.form.get('cuerpo')?.value;

    // // Obtener el texto sin formato
    // const textoSinFormato = tempElement.textContent || tempElement.innerText;

    this.pacienteConsentimiento.cuerpo = this.form.get('cuerpo')?.value;

    const canvas = document.getElementById("canvasId") as HTMLCanvasElement;

    if(!this.isCanvasEmpty(canvas)){

      canvas.toBlob((blob) => {
        // Crea un nuevo archivo a partir del blob
        if(blob){
        const file = new File([blob], 'img.png', { type: 'image/png' });
        this.pacienteConsentimiento.firma = file.toString();

        this.pacienteCOnsentimientoService.editarPacienteConsentimiento(this.pacienteConsentimiento).subscribe((response) => {
          if (response.isSuccess) {
            Swal.fire({
              title: 'Actualizando...',
              allowOutsideClick: false,
            })
            Swal.showLoading();
            Swal.close();
            Swal.fire(response.message,'', 'success');
            this.consentimientoPacienteEditado$.next(true);
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

    }
    else{
      this.base64Imagen = this.consentimientoSeleccionado.firma;
    }






    console.log(this.pacienteConsentimiento);

    // this.pacienteCOnsentimientoService.agregarPacienteConsentimiento(this.pacienteConsentimiento).subscribe((response) => {
    //   if (response.isSuccess) {
    //     Swal.fire({
    //       title: 'Actualizando...',
    //       allowOutsideClick: false,
    //     })
    //     Swal.showLoading();
    //     Swal.close();
    //     Swal.fire(response.message,'', 'success');
    //     this.consentimientoPacienteEditado$.next(true);
    //   } else {
    //     console.error(response.message);
    //   }
    // },
    // (error) => {
    //   console.error(error);
    // })

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
    this.consentimientoPacienteEditado$.next(false);
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
