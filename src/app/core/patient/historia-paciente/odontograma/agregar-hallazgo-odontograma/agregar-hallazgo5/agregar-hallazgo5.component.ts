import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-hallazgo5',
  templateUrl: './agregar-hallazgo5.component.html',
  styleUrls: ['./agregar-hallazgo5.component.scss']
})
export class AgregarHallazgo5Component implements AfterViewInit {

  hallazgoAgregado$: Subject<boolean> = new Subject<boolean>();
  hallazgo$?:string;
  numeroDiente$?:string;

  dientesOclusales:string[] =['18','17','16','15','14','24','25','26','27','28','38','37','36','35','34','44','45','46','47','48']


  constructor(public bsModalRef: BsModalRef){}

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
      context.save();
      context.lineWidth = 3;

      context.fillStyle = 'red'; // Establece el color de relleno como rojo
      context.strokeStyle = 'red';
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.closePath();
      context.stroke();

      context.restore();

    }else{
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.closePath();
      context.stroke();
    }

    if (this.checkboxPalatino) {
      context.save();

      context.lineWidth = 3;

      context.fillStyle = 'red'; // Establece el color de relleno como rojo
      context.strokeStyle = 'red';
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.closePath();
      context.stroke();
      context.restore();

    }else{
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.closePath();
      context.stroke();
    }

    if (this.checkboxDistal) {
      context.save();
      context.lineWidth = 3;

      context.fillStyle = 'red'; // Establece el color de relleno como rojo
      context.strokeStyle = 'red';
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
      context.restore();

    }else{
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
    }

    if (this.checkboxMesial) {
      context.save();
      context.lineWidth = 3;

      context.fillStyle = 'red'; // Establece el color de relleno como rojo
      context.strokeStyle = 'red';
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
      context.restore();

    }else{
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
    }

    if (this.checkboxOclusal) {
      //* cuadrado - Oclusal
      context.save();
      context.lineWidth = 3;

      context.fillStyle = 'red'; // Establece el color de relleno como rojo
      context.strokeStyle = 'red';
      context.beginPath();
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.closePath();
      context.stroke();
      context.restore();

    }else{
      context.beginPath();
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.closePath();
      context.stroke();
    }














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
