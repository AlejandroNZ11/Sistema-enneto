import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from '../../services/shared-service.service';
import { OdontogramaHallazgosComponent } from '../odontograma-hallazgos/odontograma-hallazgos.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-odontograma-inicial',
  templateUrl: './odontograma-inicial.component.html',
  styleUrls: ['./odontograma-inicial.component.scss']
})
export class OdontogramaInicialComponent implements OnInit{


    constructor(private modalService: BsModalService,private route: ActivatedRoute, private sharedService:SharedService){}
    pacienteId='';
    bsModalRef?: BsModalRef;

    modalRef!: BsModalRef;
    numeroDiente: string = '';
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.pacienteId = params['pacienteId'];
      })
      this.sharedService.setPacienteId(this.pacienteId);
    }


    agregarHallazgo(numeroDiente:string, hallazgo:string){

      if(hallazgo==='fijo'){
        this.modalRef.hide();
        const initialState ={
        numeroDiente$:numeroDiente,
        hallazgo$:hallazgo
        }


        this.bsModalRef = this.modalService.show(OdontogramaHallazgosComponent, { initialState});

        const hallazgoAgregado$ = new Subject<boolean>();

        this.bsModalRef.content.hallazgoAgregado$ = hallazgoAgregado$;
        hallazgoAgregado$.subscribe((pacienteAlergiaEditado:boolean)=>{
          if(pacienteAlergiaEditado){
            console.log("Traer data odontograma paciente")
          }
        });
        this.bsModalRef.onHidden?.subscribe(()=>{
          hallazgoAgregado$.unsubscribe();
        })
      }else{
        this.modalRef.hide();
        const initialState ={
        numeroDiente$:numeroDiente,
        hallazgo$:hallazgo
        }


        this.bsModalRef = this.modalService.show(OdontogramaHallazgosComponent, { initialState});

        const hallazgoAgregado$ = new Subject<boolean>();

        this.bsModalRef.content.hallazgoAgregado$ = hallazgoAgregado$;
        hallazgoAgregado$.subscribe((pacienteAlergiaEditado:boolean)=>{
          if(pacienteAlergiaEditado){
            console.log("Traer data odontograma paciente")
          }
        });
        this.bsModalRef.onHidden?.subscribe(()=>{
          hallazgoAgregado$.unsubscribe();
        })
      }

    }



    @ViewChild('myModal') myModal!: TemplateRef<any>;

    openModal(numeroDiente:string) {
      this.numeroDiente = numeroDiente;
      this.modalRef = this.modalService.show(this.myModal,  { backdrop: false});
    }

    @ViewChild('myCanvas', { static: true })
    myCanvas!: ElementRef<HTMLCanvasElement>;

    // @ViewChild('myCanvas2', { static: true })
    // myCanvas2!: ElementRef<HTMLCanvasElement>;

    // @ViewChild('myCanvas3', { static: true })
    // myCanvas3!: ElementRef<HTMLCanvasElement>;


    tamanhoDiente = 50; // Tamaño del diente
    tamanhoColumna = 0;
    posicionPadre: any;
    posicionPadreRight:any;
    posicionPadre2: any;
    posicionNumerosSuperior:any;
    posicionNumerosInferior:any;
  // Lista para almacenar los vértices de cada trapezoide
  trapezoidsVertices: { x: number[], y: number[] }[] = [];
    tamanhoTelaReferencia = 1895
    alturaTelaReferencia = 872
    valoresBase:any;

    dimensionesTrapezio:any;



    numeroDientes = {
      superior: ['18', '17', '16', '15', '14', '13', '12', '11', '21', '22', '23', '24', '25', '26', '27', '28'],
      inferior: ['48', '47', '46', '45', '44', '43', '42', '41', '31', '32', '33', '34', '35', '36', '37', '38']
  }
    imagenes: { src: string, x: number, y: number, largura: number, altura: number }[] = [];
    ngAfterViewInit(): void {
      const canvas = this.myCanvas.nativeElement;
      const context = canvas.getContext('2d');

      // const canvas2 = this.myCanvas2.nativeElement;
      // const context2 = canvas2.getContext('2d');


      // const canvas3 = this.myCanvas3.nativeElement;
      // const context3 = canvas3.getContext('2d');


      // if(canvas && context){
      //    // Dibujar la primera imagen
      //    this.dibujarImagen('/assets/img/18.png', context, canvas);


      // }

      if (context) {
        this.tamanhoColumna = canvas.width / 16;
        this.posicionPadre = {
          posicaoYInicialDente: 210,
          margemXEntreDentes: 8,
          margemYEntreDentes: 200,
          posicionRectangulo:30,
        };
        this.posicionPadreRight = {
          posicaoYInicialDente: 190,
          margemXEntreDentes: 8,
          margemYEntreDentes: 200,
          posicionRectangulo:30,
        }

        this.posicionPadre2 = {
          posicaoYInicialDente: 420,
          margemXEntreDentes: 8,
          margemYEntreDentes: 200,
          posicionRectangulo:230,

        };

        this.posicionNumerosSuperior ={
          posicaoYNumeros:480
        }
        this.posicionNumerosInferior ={
          posicaoYNumeros:1480
        }

        //* Superior

        for (let index = 0; index < 16; index++) {
          const posicionX = this.definePosicaoXInicialDente(index);
          this.dibujarTrapezoide(context, posicionX + 10, this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente);

          // this.dibujarImagen('/assets/img/18.png', context, canvas, posicionX);

          this.dibujarNumerosSuperior(context,index);

          this.dibujarRectangulo({
            position: {
                x: posicionX + 3,
                y: (this.posicionPadre.margemYEntreDentes / 5) + this.tamanhoDiente + this.posicionPadre.posicionRectangulo
            },
            primeiroOuUltimoDente: index === 0 || index === 15,
            altura: this.tamanhoDiente / 1.8,
            largura: index === 15 ? this.tamanhoDiente + this.posicionPadre.margemXEntreDentes : this.tamanhoDiente + 2 * this.posicionPadre.margemXEntreDentes
        },
        context)
        }
        //* Inferior


        for (let index = 0; index < 16; index++) {
          const posicionX = this.definePosicaoXInicialDente(index);
          this.dibujarTrapezoide(context, posicionX + 10, this.posicionPadre2.posicaoYInicialDente, this.tamanhoDiente);


          this.dibujarNumerosInferior(context,index);

          this.dibujarRectangulo({
            position: {
                x: posicionX + 3,
                y: (this.posicionPadre2.margemYEntreDentes / 5) + this.tamanhoDiente + this.posicionPadre2.posicionRectangulo
            },
            primeiroOuUltimoDente: index === 0 || index === 15,
            altura: this.tamanhoDiente / 1.8,
            largura: index === 15 ? this.tamanhoDiente + this.posicionPadre2.margemXEntreDentes : this.tamanhoDiente + 2 * this.posicionPadre2.margemXEntreDentes
        },
        context)

        }

        for(let index =0; index<16; index++){
          const posicionX = this.definePosicaoXInicialDente(index);

        }


        this.clickEvent(canvas);
        this.hoverEventSuperior(canvas,context);



    }
  }


  clickEvent(canvas:HTMLCanvasElement){
    canvas.addEventListener('click', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Verificar si el clic está dentro de algún cuadro
      for (let i = 0; i < 16; i++) {
        const posicionX = this.definePosicaoXInicialDente(i);
        const posicionY = this.posicionPadre.posicaoYInicialDente;

        if (x > posicionX && x < posicionX + this.tamanhoDiente &&
            y > posicionY && y < posicionY + this.tamanhoDiente) {
          // El clic está dentro del cuadro i
          // alert(`Clic en el diente ${this.numeroDientes.superior[i]}`);
          this.openModal(this.numeroDientes.superior[i]);
          break; // Terminar la iteración una vez que se haya encontrado el cuadro
        }
      }

       // Verificar si el clic está dentro de algún cuadro
       for (let i = 0; i < 16; i++) {
        const posicionX = this.definePosicaoXInicialDente(i);
        const posicionY = this.posicionPadre2.posicaoYInicialDente;

        if (x > posicionX && x < posicionX + this.tamanhoDiente &&
            y > posicionY && y < posicionY + this.tamanhoDiente) {
          // El clic está dentro del cuadro i
          // alert(`Clic en el diente ${this.numeroDientes.inferior[i]}`);
          this.openModal(this.numeroDientes.inferior[i]);
          break; // Terminar la iteración una vez que se haya encontrado el cuadro
        }
      }
    });
  }

  hoverEventSuperior(canvas:HTMLCanvasElement, context:CanvasRenderingContext2D){
    canvas.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      let hovered = false;
      let posicionX: number=0;
    let posicionY: number=0;
    let posicionY2: number=0;



      // Verificar si el mouse está sobre algún cuadro,
      for (let i = 0; i < 16; i++) {
        posicionX = this.definePosicaoXInicialDente(i);
        posicionY = this.posicionPadre.posicaoYInicialDente;

        posicionY2 = this.posicionPadre2.posicaoYInicialDente;

        // Fila Superior
        if (x > posicionX && x < posicionX + this.tamanhoDiente &&
            y > posicionY && y < posicionY + this.tamanhoDiente) {
          // El mouse está sobre el cuadro i
          canvas.style.cursor = 'pointer'; // Cambiar el cursor
          this.dibujarTrapezoide(context, posicionX +10, posicionY, this.tamanhoDiente, 'orange');
        // Cambiar el color a amarillo
          hovered = true;
          break; // Terminar la iteración una vez que se haya encontrado el cuadro
        }

        // Fila Inferior
        if (x > posicionX && x < posicionX + this.tamanhoDiente &&
          y > posicionY2 && y < posicionY2 + this.tamanhoDiente) {
        // El mouse está sobre el cuadro i
        canvas.style.cursor = 'pointer'; // Cambiar el cursor
        this.dibujarTrapezoide(context, posicionX +10, posicionY2, this.tamanhoDiente, 'orange'); // Cambiar el color a amarillo
        hovered = true;
        break; // Terminar la iteración una vez que se haya encontrado el cuadro
      }

        if (!hovered) {
          canvas.style.cursor = 'default'; // Restaurar el cursor predeterminado
          // Dibujar los cuadros nuevamente para restaurar su color original
          this.dibujarTrapezoide(context, posicionX +10, posicionY, this.tamanhoDiente);
          this.dibujarTrapezoide(context, posicionX +10, posicionY2, this.tamanhoDiente);
        }
      }
    });
  }


    // resizeCanvas(){
    //   const canvas = this.myCanvas.nativeElement;
    //   const canvas2 = this.myCanvas2.nativeElement;
    //   const canvas3 = this.myCanvas3.nativeElement;


    //   canvas.width = canvas2.width = canvas3.width = window.innerWidth - 25
    //   const altura = (canvas.width* this.alturaTelaReferencia)/ this.tamanhoTelaReferencia
    //   canvas.height = canvas2.height = canvas3.height = altura

    //   this.valoresBase = {
    //     x: (canvas.width * 24) / this.tamanhoTelaReferencia,
    //     y: (canvas.width * 20) / this.tamanhoTelaReferencia,
    //     largura: (canvas.width * 70) / this.tamanhoTelaReferencia,
    //     altura: (canvas.width * 150) / this.tamanhoTelaReferencia
    // }

    // this.posicionPadre.margemXEntreDentes = (canvas.width * 8) / this.tamanhoTelaReferencia
    // this.posicionPadre.margemYEntreDentes = (canvas.width * 200) / this.tamanhoTelaReferencia
    // this.posicionPadre.posicaoYInicialDente = (canvas.width * 180) / this.tamanhoTelaReferencia

    //       tamanhoColuna = canvas.width / 16
    //       tamanhoDente = this.tamanhoColumna - (2 *   this.posicionPadre.margemXEntreDentes)

    // }







    private dibujarNumerosSuperior(context: CanvasRenderingContext2D,index:number) {
      context.fillStyle = 'black'; // Color de los números
      context.font = '16px Arial'; // Tamaño y fuente de los números


        const posicionX = this.definePosicaoXInicialDente(index);
        const posicionY = (this.posicionNumerosSuperior.posicaoYNumeros / 5) + this.tamanhoDiente
        const numero = this.numeroDientes.superior[index]; // Ejemplo de número, podrías definirlos como desees

        context.fillText(numero, posicionX + 26, posicionY + 20); // Dibuja el número en la posición deseada

    }


    private dibujarNumerosInferior(context: CanvasRenderingContext2D,index:number) {
      context.fillStyle = 'black'; // Color de los números
      context.font = '16px Arial'; // Tamaño y fuente de los números


        const posicionX = this.definePosicaoXInicialDente(index);
        const posicionY = (this.posicionNumerosInferior.posicaoYNumeros / 5) + this.tamanhoDiente
        const numero = this.numeroDientes.inferior[index]; // Ejemplo de número, podrías definirlos como desees

        context.fillText(numero, posicionX + 26, posicionY + 20); // Dibuja el número en la posición deseada

    }


    private dibujarImagen(src: string, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement,x:number) {
      let imagen = new Image();
      imagen.src = src;
      imagen.onload = () => {
        const valoresBase = {
          x: (canvas.width * 24) / this.tamanhoTelaReferencia,
          y: (canvas.width * 20) / this.tamanhoTelaReferencia,
          largura: (canvas.width * 70) / this.tamanhoTelaReferencia,
          altura: (canvas.width * 150) / this.tamanhoTelaReferencia
        };

        context.drawImage(imagen, x, valoresBase.y, valoresBase.largura, valoresBase.altura);

        // Guardar la información de la imagen para futuras referencias
        this.imagenes.push({
          src: src,
          x: valoresBase.x,
          y: valoresBase.y,
          largura: valoresBase.largura,
          altura: valoresBase.altura
        });
      };

      imagen.onerror = (error) => {
        console.error('Error loading image:', error);
      };
    }

    private definePosicaoXInicialDente(index: number): number {
      if (index === 0) return (index * this.tamanhoDiente) + (this.posicionPadre.margemXEntreDentes * index) + this.posicionPadre.margemXEntreDentes;
      else return (index * this.tamanhoDiente) + (2 * this.posicionPadre.margemXEntreDentes * index) + this.posicionPadre.margemXEntreDentes;
    }

    private dibujarRectangulo( cuadrado:any, context:CanvasRenderingContext2D){
      let tamanhoFuente = (40 * (cuadrado.primeiroOuUltimoDente ? cuadrado.largura + this.posicionPadre.margemXEntreDentes : cuadrado.largura)) / 118.4375
      context.font = `${tamanhoFuente}px arial`
      context.strokeStyle = 'white';

      context.fillStyle = '#dbdada';

      // Dibujar el relleno del rectángulo con el color especificado
      context.fillRect(cuadrado.position.x, cuadrado.position.y, cuadrado.largura, cuadrado.altura);

      context.strokeRect(cuadrado.position.x, cuadrado.position.y, cuadrado.largura, cuadrado.altura)


    return tamanhoFuente
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



  }



