import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.scss']
})
export class OdontogramaComponent implements AfterViewInit {

  @ViewChild('myCanvas', { static: true })
  myCanvas!: ElementRef<HTMLCanvasElement>;


  tamanhoDente = 50; // Tamaño del diente
  tamanhoColuna = 0;
  posicoesPadrao: any;
  tamanhoTelaReferencia = 1895
  alturaTelaReferencia = 872
  valoresBase:any;
  imagenes: { src: string, x: number, y: number, largura: number, altura: number }[] = [];
  ngAfterViewInit(): void {
    const canvas = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');

    // if(canvas && context){
    //    // Dibujar la primera imagen
    //    this.dibujarImagen('/assets/img/18.png', context, canvas);


    // }


    if (context) {
      this.tamanhoColuna = canvas.width / 16;
      this.posicoesPadrao = {
        posicaoYInicialDente: 180,
        margemXEntreDentes: 8,
        margemYEntreDentes: 200
      };

      for (let index = 0; index < 16; index++) {
        const posicaoX = this.definePosicaoXInicialDente(index);
        this.dibujarTrapezoide(context, posicaoX, this.posicoesPadrao.posicaoYInicialDente, this.tamanhoDente);

        this.dibujarImagen('/assets/img/18.png', context, canvas, posicaoX);
      }

      for (let index = 0; index < 16; index++) {
        const posicaoX = this.definePosicaoXInicialDente(index);
        this.dibujarTrapezoide(context, posicaoX, this.posicoesPadrao.posicaoYInicialDente, this.tamanhoDente);
      }
    }
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
    if (index === 0) return (index * this.tamanhoDente) + (this.posicoesPadrao.margemXEntreDentes * index) + this.posicoesPadrao.margemXEntreDentes;
    else return (index * this.tamanhoDente) + (2 * this.posicoesPadrao.margemXEntreDentes * index) + this.posicoesPadrao.margemXEntreDentes;
  }

  private dibujarTrapezoide(context: CanvasRenderingContext2D, x: number, y: number, tamanhoDiente: number) {
    const dimensoesTrapezio = {
      baseMaior: tamanhoDiente,
      lateral: tamanhoDiente / 4,
      baseMenor: (tamanhoDiente / 4) * 3
    };

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(dimensoesTrapezio.baseMaior + x, y);
    context.lineTo(dimensoesTrapezio.baseMenor + x, dimensoesTrapezio.lateral + y);
    context.lineTo(dimensoesTrapezio.lateral + x, dimensoesTrapezio.lateral + y);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(dimensoesTrapezio.baseMenor + x, dimensoesTrapezio.lateral + y);
    context.lineTo(dimensoesTrapezio.baseMaior + x, y);
    context.lineTo(dimensoesTrapezio.baseMaior + x, dimensoesTrapezio.baseMaior + y);
    context.lineTo(dimensoesTrapezio.baseMenor + x, dimensoesTrapezio.baseMenor + y);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(dimensoesTrapezio.lateral + x, dimensoesTrapezio.baseMenor + y);
    context.lineTo(dimensoesTrapezio.baseMenor + x, dimensoesTrapezio.baseMenor + y);
    context.lineTo(dimensoesTrapezio.baseMaior + x, dimensoesTrapezio.baseMaior + y);
    context.lineTo(x, dimensoesTrapezio.baseMaior + y);
    context.closePath();
    context.stroke();

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(dimensoesTrapezio.lateral + x, dimensoesTrapezio.lateral + y);
    context.lineTo(dimensoesTrapezio.lateral + x, dimensoesTrapezio.baseMenor + y);
    context.lineTo(x, dimensoesTrapezio.baseMaior + y);
    context.closePath();
    context.stroke();
  }
}
