import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { SharedService } from '../../../services/shared-service.service';
import { OdontogramaService } from 'src/app/shared/services/odontograma.service';
import { hallazgoRequest } from 'src/app/shared/models/hallazgoOdontograma';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-hallazgo4',
  templateUrl: './agregar-hallazgo4.component.html',
  styleUrls: ['./agregar-hallazgo4.component.scss']
})
export class AgregarHallazgo4Component implements AfterViewInit, OnInit{

  hallazgoAgregado$: Subject<boolean> = new Subject<boolean>();
  hallazgo$: string='';
  numeroDiente$: string='';
  siglas$:string[]=[];
  hallazgoId$:number=0;

  hallazgoR:hallazgoRequest = new hallazgoRequest();


  dientesOclusales: string[] = ['18', '17', '16', '15', '14', '24', '25', '26', '27', '28', '38', '37', '36', '35', '34', '44', '45', '46', '47', '48']

  constructor(public bsModalRef: BsModalRef, public formBuilder: FormBuilder,private sharedService: SharedService,private odontogramaService:OdontogramaService){


  }
  ngOnInit(): void {

    this.sharedService.pacientID.subscribe((id)=>{
      this.pacienteId = id
    });

    this.form = this.formBuilder.group({
      hallazgoSigla:['', [Validators.required]],
      numeroDiente: [{ value: '', disabled: true },[Validators.required]],
    })

    this.form.patchValue({
      numeroDiente:this.numeroDiente$
    })

  }

  pacienteId = "";
  form!: FormGroup;
  isFormSubmitted = false;

  @ViewChild('myCanvasModal', { static: true })
  myCanvasModal!: ElementRef<HTMLCanvasElement>;
  dimensionesTrapezio: any;
  tamanhoDiente = 85; // Tamaño del diente
  posicionPadre: any;

  // Propiedades para controlar el estado de los checkboxes
  checkboxPrincipal: boolean = false;
  checkboxVestibular: boolean = false;
  checkboxPalatino: boolean = false;
  checkboxDistal: boolean = false;
  checkboxMesial: boolean = false;
  checkboxOclusal: boolean = false;

  checkVestibularBueno: boolean = false;
  checkVestibularMalo: boolean = false;

  checkPalatinoBueno: boolean = false;
  checkPalatinoMalo: boolean = false;

  checkDistalBueno: boolean = false;
  checkDistalMalo: boolean = false;

  checkMesialBueno: boolean = false;
  checkMesialMalo: boolean = false;

  checkOclusalBueno: boolean = false;
  checkOclusalMalo: boolean = false;


  especificacion:string='';
  hallazgoSeleccionado:string='';



  ngAfterViewInit(): void {

    const canvas = this.myCanvasModal.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {


      this.posicionPadre = {
        posicaoYInicialDente: 35,
        margemXEntreDentes: 8,
        margemYEntreDentes: 200,
        posicionRectangulo: 30,
      };

      const posicionX = this.definePosicaoXInicialDente(0);
      this.dibujarTrapezoide(context, posicionX + 10, this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente);
    }

  }

  markAllFieldsAsTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

agregarHallazgo(){
  if (this.form.invalid) {
    this.isFormSubmitted = true;
    console.log("agregar")
    this.markAllFieldsAsTouched();
    return;
  }


  let estadoRadioVestibular = "N/A";
  if (this.checkboxVestibular) {
    estadoRadioVestibular = this.checkVestibularBueno ? "Bueno" : "Malo";
  }
  let estadoRadioPalatino = "N/A";
  if (this.checkboxPalatino) {
    estadoRadioPalatino = this.checkPalatinoBueno ? "Bueno" : "Malo";
  }
  let estadoRadioDistal = "N/A";
  if (this.checkboxDistal) {
    estadoRadioDistal = this.checkDistalBueno ? "Bueno" : "Malo";
  }
  let estadoRadioMesial = "N/A";
  if (this.checkboxMesial) {
    estadoRadioMesial = this.checkMesialBueno ? "Bueno" : "Malo";
  }
  let estadoRadioOclusal = "N/A";
  if (this.checkboxOclusal) {
    estadoRadioOclusal = this.checkOclusalBueno ? "Bueno" : "Malo";
  }

  const data = {
    "Vestibular": { "Valor": this.checkboxVestibular,"Estado":estadoRadioVestibular },
    "Palatino": { "Valor": this.checkboxPalatino, "Estado":estadoRadioPalatino },
    "Distal": { "Valor": this.checkboxDistal, "Estado":estadoRadioDistal },
    "Mesial": { "Valor": this.checkboxMesial, "Estado":estadoRadioMesial },
    "Oclusal": { "Valor": this.checkboxOclusal, "Estado":estadoRadioOclusal }
  };


  this.hallazgoR.pacienteId = this.pacienteId;
  this.hallazgoR.tipo = this.hallazgo$;
  this.hallazgoR.halllazgoId = this.hallazgoId$
  this.hallazgoR.categoria = this.hallazgo$
  this.hallazgoR.marcas = JSON.stringify(data).toString();
  this.hallazgoR.numeroDiente = parseInt(this.numeroDiente$);
  this.hallazgoR.sigla = this.form.get('hallazgoSigla')?.value.substring(0,2);
  this.hallazgoR.especificacion = this.especificacion;


  console.log(this.hallazgoR);

  this.odontogramaService.agregarOdontogramaPaciente(this.hallazgoR).subscribe(
    (response)=>{
      if(response.isSuccess){
        Swal.fire(response.message, '', 'success');
        this.hallazgoAgregado$.next(true);
        this.bsModalRef.hide();
      }else{
        console.error(response.message);
      }
    },
    (error)=>{
      console.log(error);
    }
  )

}



  private definePosicaoXInicialDente(index: number): number {
    if (index === 0) return (index * this.tamanhoDiente) + (this.posicionPadre.margemXEntreDentes * index) + this.posicionPadre.margemXEntreDentes;
    else return (index * this.tamanhoDiente) + (2 * this.posicionPadre.margemXEntreDentes * index) + this.posicionPadre.margemXEntreDentes;
  }

  private dibujarTrapezoide(context: CanvasRenderingContext2D, x: number, y: number, tamanhoDiente: number, color?: string) {

    if (color) {
      context.fillStyle = color;
      context.strokeStyle = color;
    }
    else {
      context.fillStyle = 'black'
      context.strokeStyle = 'black';
    }


    this.dimensionesTrapezio = {
      baseMaior: tamanhoDiente,
      lateral: tamanhoDiente / 4,
      baseMenor: (tamanhoDiente / 4) * 3
    };

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
    context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
    context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
    context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
    context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
    context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
    context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
    context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
    context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
    context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
    context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
    context.closePath();
    context.stroke();
  }

  onCheckboxChange(lado: string) {

    switch (lado) {
      case 'checkboxVestibular':
        this.checkVestibularBueno = false;
        this.checkVestibularMalo = false;
        this.pintarTrapecio();
        break;
      case 'checkboxPalatino':
        this.checkPalatinoBueno = false;
        this.checkPalatinoMalo = false;
        this.pintarTrapecio();
        break;
      case 'checkboxDistal':
        this.checkDistalBueno = false;
        this.checkDistalMalo = false;
        this.pintarTrapecio();
        break;
      case 'checkboxMesial':
        this.checkMesialBueno = false;
        this.checkMesialMalo = false;
        this.pintarTrapecio();
        break;
      case 'checkboxOclusal':
        this.checkOclusalBueno = false;
        this.checkOclusalMalo = false;
        this.pintarTrapecio();
        break;

    }


  }

  // Función para manejar cambios en los checkboxes
  onCheckboxRadio(lado: string): void {

    switch (lado) {
      case 'checkVestibularEstado':
        this.checkVestibularBueno = true;
        this.checkVestibularMalo = false;

        if (this.checkVestibularBueno && this.checkboxVestibular) {
          this.pintarTrapecio();
        }
        break;
      case 'checkPalatinoEstado':
        this.checkPalatinoBueno = true;
        this.checkPalatinoMalo = false;

        if (this.checkPalatinoBueno && this.checkboxPalatino) {
          this.pintarTrapecio();
        }
        break;
      case 'checkDistalEstado':
        this.checkDistalBueno = true;
        this.checkDistalMalo = false;

        if (this.checkDistalBueno && this.checkboxDistal) {
          this.pintarTrapecio();
        }
        break;
      case 'checkMesialEstado':
        this.checkMesialBueno = true;
        this.checkMesialMalo = false;

        if (this.checkMesialBueno && this.checkboxMesial) {
          this.pintarTrapecio();
        }
        break;
      case 'checkOclusalEstado':
        this.checkOclusalBueno = true;
        this.checkOclusalMalo = false;

        if (this.checkOclusalBueno && this.checkboxOclusal) {
          this.pintarTrapecio();
        }
        break;
    }
  }

  // Función para manejar cambios en los checkboxes
  onCheckboxRadio2(lado: string): void {

    switch (lado) {
      case 'checkVestibularEstado':

        this.checkVestibularBueno = false;
        this.checkVestibularMalo = true;

        if (this.checkVestibularMalo && this.checkboxVestibular) {
          this.pintarTrapecio();
        }
        break;
      case 'checkPalatinoEstado':
        this.checkPalatinoBueno = false;
        this.checkPalatinoMalo = true;

        if (this.checkPalatinoMalo && this.checkboxPalatino) {
          this.pintarTrapecio();
        }
        break;
      case 'checkDistalEstado':
        this.checkDistalBueno = false;
        this.checkDistalMalo = true;

        if (this.checkDistalMalo && this.checkboxDistal) {
          this.pintarTrapecio();
        }
        break;
      case 'checkMesialEstado':
        this.checkMesialBueno = false;
        this.checkMesialMalo = true;

        if (this.checkMesialMalo && this.checkboxMesial) {
          this.pintarTrapecio();
        }
        break;
      case 'checkOclusalEstado':
        this.checkOclusalBueno = false;
        this.checkOclusalMalo = true;

        if (this.checkOclusalMalo && this.checkboxOclusal) {
          this.pintarTrapecio();
        }
        break;
    }
  }

  private pintarTrapezoide(context: CanvasRenderingContext2D, x: number, y: number, tamanhoDiente: number) {

    context.fillStyle = 'black'
    context.strokeStyle = 'black';



    this.dimensionesTrapezio = {
      baseMaior: tamanhoDiente,
      lateral: tamanhoDiente / 4,
      baseMenor: (tamanhoDiente / 4) * 3
    };

    //* LADO VESTIBULAR

    if (this.checkboxVestibular && this.checkVestibularBueno) {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#7f9fff'; // Establece el color de relleno como rojo
      context.fill(); // Rellena el primer cuadrilátero de color rojo
    }

    if (this.checkboxVestibular && this.checkVestibularMalo) {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#f48e8e'; // Establece el color de relleno como rojo
      context.fill(); // Rellena el primer cuadrilátero de color rojo
    }

    //* LADO PALATINO


    if (this.checkboxPalatino && this.checkPalatinoBueno) {
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#7f9fff'; // Establece el color de relleno como rojo
      context.fill(); // Rellena el primer cuadrilátero de color rojo
    }


    if (this.checkboxPalatino && this.checkPalatinoMalo) {
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#f48e8e'; // Establece el color de relleno como rojo
      context.fill(); // Rellena el primer cuadrilátero de color rojo
    }

    //* LADO DISTAL


    if (this.checkboxDistal && this.checkDistalBueno) {
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#7f9fff'; // Establece el color de relleno como rojo
      context.fill(); // Rellena el primer cuadrilátero de color rojo
    }

    if (this.checkboxDistal && this.checkDistalMalo) {
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#f48e8e'; // Establece el color de relleno como rojo
      context.fill(); // Rellena el primer cuadrilátero de color rojo
    }

    //* LADO MESIAL

    if (this.checkboxMesial && this.checkMesialBueno) {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#7f9fff'; // Establece el color de relleno como rojo
      context.fill(); // Rellena el primer cuadrilátero de color rojo
    }

    if (this.checkboxMesial && this.checkMesialMalo) {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#f48e8e'; // Establece el color de relleno como rojo
      context.fill(); // Rellena el primer cuadrilátero de color rojo
    }

    //* LADO OCLUSAL

    if (this.checkboxOclusal && this.checkOclusalBueno) {
      //* cuadrado - Oclusal
      context.beginPath();
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#7f9fff'; // Establece el color de relleno como rojo
      context.fill(); // Rellena el primer cuadrilátero de color rojo

    }

    if (this.checkboxOclusal && this.checkOclusalMalo) {
      //* cuadrado - Oclusal
      context.beginPath();
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#f48e8e'; // Establece el color de relleno como rojo
      context.fill(); // Rellena el primer cuadrilátero de color rojo

    }


    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
    context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
    context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
    context.closePath();
    context.stroke();




    context.beginPath();
    context.moveTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
    context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
    context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
    context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
    context.closePath();
    context.stroke();



    context.beginPath();
    context.moveTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
    context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
    context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
    context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
    context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
    context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
    context.closePath();
    context.stroke();
  }


  // Función para dibujar el trapecio con los lados seleccionados
  pintarTrapecio(): void {
    const canvas = this.myCanvasModal.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de redibujar

      this.posicionPadre = {
        posicaoYInicialDente: 35,
        margemXEntreDentes: 8,
        margemYEntreDentes: 200,
        posicionRectangulo: 30,
      };

      const posicionX = this.definePosicaoXInicialDente(0);
      this.pintarTrapezoide(context, posicionX + 10, this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente);
    }
  }

  cancelar() {
    this.hallazgoAgregado$.next(false);
    this.bsModalRef.hide()
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
