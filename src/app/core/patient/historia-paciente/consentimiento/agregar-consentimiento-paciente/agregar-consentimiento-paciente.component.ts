import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { pacienteConsentimiento } from 'src/app/shared/models/pacienteConsentimiento';
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


export class AgregarConsentimientoPacienteComponent implements AfterViewInit {

  form!: FormGroup;
  isFormSubmitted = false;
  consentimientoPacienteAgregado$: Subject<boolean> = new Subject<boolean>();
  pacienteConsentimiento: pacienteConsentimiento = new pacienteConsentimiento();


  constructor(public fb: FormBuilder){
    this.form = this.fb.group({
      medicoId: ['', Validators.required],
      fecha: ['', Validators.required],
      hora:['', Validators.required],
      nombreApoderado: ['', [Validators.required, Validators.maxLength(100)]],
      documentoApoderado:['',[Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern('^[0-9]+$')]],
      direccionApoderado:['',[Validators.required, Validators.maxLength(100)]],
      tipoConsentimientoId:['',Validators.required],
      pacienteId:['',Validators.required],


      terminoBusquedaMenorEdad: [''],
      terminoBusquedaMedico:['']
    });
  }

  agregarConsentimiento(){
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.isTouched()
      console.log("error");
      return;
    }

    const canvas = document.getElementById("canvasId") as HTMLCanvasElement;
    this.isFormSubmitted = true;
    this.pacienteConsentimiento.medicoId = this.form.get("medicoId")?.value;
    this.pacienteConsentimiento.fecha = this.form.get("fecha")?.value;
    this.pacienteConsentimiento.hora = this.form.get("hora")?.value;
    this.pacienteConsentimiento.nombreApoderado= this.form.get("nombreApoderado")?.value;
    this.pacienteConsentimiento.documentoApoderado= this.form.get("documentoApoderado")?.value;
    this.pacienteConsentimiento.direccionApoderado= this.form.get("direccionApoderado")?.value;
    this.pacienteConsentimiento.tipoConsentimientoId= this.form.get("tipoConsentimientoId")?.value;
    this.pacienteConsentimiento.pacienteId= this.form.get("pacienteId")?.value;
    this.pacienteConsentimiento.firma =  canvas.toDataURL("image/png");

    console.log(this.pacienteConsentimiento);

  }






  get medicosFiltrados(): IMenorEdad[] {
    return this.medicos.filter(nombre =>
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

}
