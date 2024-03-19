import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { IHallazgo, hallazgoRequest, siglasHallazgo } from 'src/app/shared/models/hallazgoOdontograma';
import { SharedService } from '../../services/shared-service.service';
import { OdontogramaService } from 'src/app/shared/services/odontograma.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-agregar-hallazgo2',
  templateUrl: './agregar-hallazgo2.component.html',
  styleUrls: ['./agregar-hallazgo2.component.scss']
})
export class AgregarHallazgo2Component implements AfterViewInit,OnInit {

  constructor(public bsModalRef: BsModalRef,private sharedService: SharedService, private odontogramaService:OdontogramaService, public formBuilder: FormBuilder){}
  pacienteId = "";
  form!: FormGroup;
  isFormSubmitted = false;
  siglaSeleccionada$!:siglasHallazgo;
  hallazgoSeleccionado$!: IHallazgo;
  tipoHallazgo:string='';



  ngOnInit(): void {
     this.sharedService.pacientID.subscribe((id)=>{
      this.pacienteId = id
    })

    this.form = this.formBuilder.group({

      hallazgoNombre: [{ value: '', disabled: true }, [Validators.required]],
      hallazgoSigla:[{ value: '', disabled: true }, [Validators.required]],
      numeroDiente: [{ value: '', disabled: true },[Validators.required]],
      checkboxVestibular: ['', []],
      checkboxPalatino: ['', []],
      checkboxDistal: ['', []],
      checkboxMesial: ['', []],
      checkboxOclusal: ['', []],
      especificacion: ['', []],



    })

    this.form.patchValue({
      numeroDiente:this.numeroDiente$,
      hallazgoNombre: this.hallazgoSeleccionado$.nombre,
      hallazgoSigla:this.siglaSeleccionada$.sigla
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






  hallazgoAgregado$: Subject<boolean> = new Subject<boolean>();
  hallazgoId$:number=0;
  hallazgo$:string='';
  numeroDiente$:string='';
  siglas$:string[]=[];

  especificacion:string='';

  hallazgoR:hallazgoRequest = new hallazgoRequest();

  dientesOclusales:string[] =['18','17','16','15','14','24','25','26','27','28','38','37','36','35','34','44','45','46','47','48']

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

    const data = {
      "Vestibular": { "Valor": this.checkboxVestibular },
      "Palatino": { "Valor": this.checkboxPalatino },
      "Distal": { "Valor": this.checkboxDistal },
      "Mesial": { "Valor": this.checkboxMesial },
      "Oclusal": { "Valor": this.checkboxOclusal }
    };


    this.hallazgoR.pacienteId = this.pacienteId;
    this.hallazgoR.tipo = this.tipoHallazgo;
    this.hallazgoR.hallazgos.push(this.hallazgoSeleccionado$.hallazgoId);
    this.hallazgoR.categoria = this.hallazgoSeleccionado$.tipo
    this.hallazgoR.marcas = JSON.stringify(data).toString();
    this.hallazgoR.numeroDiente = parseInt(this.numeroDiente$);
    this.hallazgoR.sigla = this.siglaSeleccionada$.sigla;
    this.hallazgoR.especificacion = this.especificacion;

    console.log(this.hallazgoR);
    Swal.fire('Procesando')
          Swal.showLoading()

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



  @ViewChild('myCanvasModal', { static: true })
  myCanvasModal!: ElementRef<HTMLCanvasElement>;
  dimensionesTrapezio:any;
  tamanhoDiente = 85; // Tamaño del diente
  posicionPadre: any;

   // Propiedades para controlar el estado de los checkboxes
   checkboxPrincipal: boolean = false;
   checkboxVestibular: boolean = false;
   checkboxPalatino: boolean = false;
   checkboxDistal: boolean = false;
   checkboxMesial: boolean = false;
   checkboxOclusal: boolean = false;


  ngAfterViewInit(): void {
    const canvas = this.myCanvasModal.nativeElement;
    const context = canvas.getContext('2d');
    if(context){


      this.posicionPadre = {
        posicaoYInicialDente: 35,
        margemXEntreDentes: 8,
        margemYEntreDentes: 200,
        posicionRectangulo:30,
      };

      const posicionX = this.definePosicaoXInicialDente(0);
      this.dibujarTrapezoide(context, posicionX + 10, this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente);
    }


  }


  private definePosicaoXInicialDente(index: number): number {
    if (index === 0) return (index * this.tamanhoDiente) + (this.posicionPadre.margemXEntreDentes * index) + this.posicionPadre.margemXEntreDentes;
    else return (index * this.tamanhoDiente) + (2 * this.posicionPadre.margemXEntreDentes * index) + this.posicionPadre.margemXEntreDentes;
  }

  private dibujarTrapezoide(context: CanvasRenderingContext2D, x: number, y: number, tamanhoDiente: number, color?:string) {

    if(color){
      context.fillStyle = color;
      context.strokeStyle = color;
    }
    else{
      context.fillStyle='black'
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



  // Función para manejar cambios en los checkboxes
  onCheckboxChange(): void {
    //  // Lógica para marcar o desmarcar todos los checkboxes secundarios
    //  if (this.checkboxPrincipal) {
    //   this.checkboxVestibular = true;
    //   this.checkboxPalatino = true;
    //   this.checkboxDistal = true;
    //   this.checkboxMesial = true;
    //   this.checkboxOclusal = true;
    //   this.pintarTrapecio();
    // } else {
    //   this.checkboxVestibular = false;
    //   this.checkboxPalatino = false;
    //   this.checkboxDistal = false;
    //   this.checkboxMesial = false;
    //   this.checkboxOclusal = false;
    //   this.pintarTrapecio();
    // }
    this.pintarTrapecio();



  }

  private pintarTrapezoide(context: CanvasRenderingContext2D, x: number, y: number, tamanhoDiente: number) {

      context.fillStyle='black'
      context.strokeStyle = 'black';



    this.dimensionesTrapezio = {
      baseMaior: tamanhoDiente,
      lateral: tamanhoDiente / 4,
      baseMenor: (tamanhoDiente / 4) * 3
    };

    if (this.checkboxVestibular) {
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

    if (this.checkboxPalatino) {
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

    if (this.checkboxDistal) {
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

    if (this.checkboxMesial) {
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

    if (this.checkboxOclusal) {
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
    if(context){
      context.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de redibujar

      this.posicionPadre = {
        posicaoYInicialDente: 35,
        margemXEntreDentes: 8,
        margemYEntreDentes: 200,
        posicionRectangulo:30,
      };

      const posicionX = this.definePosicaoXInicialDente(0);
      this.pintarTrapezoide(context, posicionX + 10, this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente);
    }
  }

  cancelar() {
    this.hallazgoAgregado$.next(false);
    this.bsModalRef.hide()
  }

}
