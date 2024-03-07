import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from '../../services/shared-service.service';
import { OdontogramaHallazgosComponent } from '../odontograma-hallazgos/odontograma-hallazgos.component';
import { Subject } from 'rxjs';
import { AgregarHallazgo2Component } from '../agregar-hallazgo2/agregar-hallazgo2.component';
import { AgregarHallazgo3Component } from '../agregar-hallazgo3/agregar-hallazgo3.component';
import { OdontogramaService } from 'src/app/shared/services/odontograma.service';
import { IodontogramaPaciente } from 'src/app/shared/models/odontrograma';
import { EditarHallazgo1Component } from '../lista-hallazgos/editar-hallazgo1/editar-hallazgo1.component';
import { AgregarHallazgo4Component } from '../agregar-hallazgo-odontograma/agregar-hallazgo4/agregar-hallazgo4.component';
import { AgregarHallazgo5Component } from '../agregar-hallazgo-odontograma/agregar-hallazgo5/agregar-hallazgo5.component';
import { AgregarHallazgo6Component } from '../agregar-hallazgo-odontograma/agregar-hallazgo6/agregar-hallazgo6.component';
import { environment } from 'src/environments/environments';
import { IHallazgo, THallazgo } from 'src/app/shared/models/hallazgoOdontograma';
import { AgregarHallazgo7Component } from '../agregar-hallazgo-odontograma/agregar-hallazgo7/agregar-hallazgo7.component';
import Swal from 'sweetalert2';

interface Producto {
  nombre: string;
}

@Component({
  selector: 'app-odontograma-inicial',
  templateUrl: './odontograma-inicial.component.html',
  styleUrls: ['./odontograma-inicial.component.scss']
})

export class OdontogramaInicialComponent implements OnInit{


    constructor(private modalService: BsModalService,private route: ActivatedRoute, public sharedService:SharedService, private odontogramaService: OdontogramaService){
      // this.calcularTamanhoDiente(); // Calcular el tamaño inicial del diente al inicializar el componente

    }

    // calcularTamanhoDiente(): void {
    //   const screenWidth = window.innerWidth;
    //   const baseDiente = 30;
    //   const screenWidthForBaseDiente = 1000;
    //   this.tamanhoDiente = (screenWidth / screenWidthForBaseDiente) * baseDiente;
    // }

    // @HostListener('window:resize', ['$event'])
    // onResize(event: any): void {
    //   this.calcularTamanhoDiente(); // Recalcular el tamaño del diente cuando cambia el tamaño de la ventana
    // }

    productos: Producto[] = [
      { nombre: 'Producto 1' },
      { nombre: 'Producto 2' },
      { nombre: 'Producto 3' },
      // Agregar más productos...
    ];

    hallazgosList: THallazgo[]=[
      {id:1,nombre:'Caries Dental', tipo:'caries',siglas:['MB - Mancha Blanca','CE - Lesión de caries a nivel del esmalte']},
      {id:8,nombre:'Protesis Removible', tipo:'protesis'},
      {id:7,nombre:'Protesis Total', tipo:'protesis'},
      {id:4,nombre:'Protesis Fija', tipo:'protesis'},
      {id:5,nombre:'Aparato Orto. Fijo', tipo:'protesis'},
      {id:6,nombre:'Aparato Orto. Removible', tipo:'protesis'},
      {id:2,nombre:'Exodoncia', tipo:'fijo'},
      {id:20,nombre:'Fusión', tipo:'fijo'},
      {id:21,nombre:'Geminasión', tipo:'fijo'},
      {id:22,nombre:'Pieza Dentaria en Clavija', tipo:'fijo'},
      {id:23,nombre:'Pieza Dentaria Extruida', tipo:'fijo'},
      {id:24,nombre:'Pieza Dentaria Intruida', tipo:'fijo'},
      {id:25,nombre:'Pieza Dentaria', tipo:'fijo'},
      {id:26,nombre:'Implante Dental', tipo:'fijo estado'},
      {id:27,nombre:'Defectos del desarrollo del Esmalte', tipo:'fijo estado',siglas:['HP - Hipoplasia','CE - Hipo Mineralización','O - Opacidades del Esmalte','D - Decoloración del Esmalte','FL - Fluorosis']},



      {id:3,nombre:'Corona', tipo:'fijo estado',siglas:['CM - Corona Metálica','CF - Corona Fenestrada']},
      {id:3,nombre:'Corona Temporal', tipo:'fijo estado'},
      // {id:22,nombre:'Espigo Muñon', tipo:'fijo'},
      // {id:222,nombre:'Impactacion', tipo:'fijo'},
      {id:12,nombre:'Sellantes', tipo:'sellantes'},
      {id:13,nombre:'Restauracion Temporal', tipo:'restauracion temporal'},
      {id:14,nombre:'Restauracion Definitiva', tipo:'restauracion definitiva',siglas:['AM -Amalgama Dental','R - Resina']},
    ]

    changeVariable(hallazgo:THallazgo) {
      console.log(hallazgo)
      this.sharedService.setVariable(hallazgo);
    }
    pestanas: { nombre: string; hallazgos: THallazgo[] }[] = [];

    agruparHallazgosPorPestanas() {
      const rangos = [
        { nombre: 'A-I', letras: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'] },
        { nombre: 'L-P', letras: ['L', 'M', 'N', 'O', 'P'] },
        { nombre: 'R-T', letras: ['R', 'S', 'T'] }
      ];

      rangos.forEach(rango => {
        const hallazgosEnPestana = this.hallazgosList.filter(hallazgo =>
          rango.letras.some(letra => hallazgo.nombre.startsWith(letra))
        ).sort((a, b) => a.nombre.localeCompare(b.nombre));
        this.pestanas.push({ nombre: rango.nombre, hallazgos: hallazgosEnPestana });
      });
    }


    terminoBusqueda: string = '';

    hallazgoLista:IHallazgo[]=[];

    // get hallazgosFiltrados():IHallazgo[]{
    //   return this.hallazgoLista.filter(hallazgo =>
    //     hallazgo.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()));
    // }

  get hallazgosFiltrados(): THallazgo[] {
    return this.hallazgosList.filter(producto =>
      producto.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    );
  }



    pacienteId='';
    bsModalRef?: BsModalRef;

    modalRef!: BsModalRef;
    numeroDiente: string = '';

    odotogramaPacienteList:IodontogramaPaciente[]=[];
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.pacienteId = params['pacienteId'];
      })
      this.sharedService.setPacienteId(this.pacienteId);

      // Hallazgos:
      this.odontogramaService.obtenerHallazgos(environment.clinicaId,1,20).subscribe((data)=>{
        this.hallazgoLista = data.data;
      })

      this.agruparHallazgosPorPestanas();
    }

    agregarHallazgo(numeroDiente:string, hallazgo:THallazgo){

      // Limpiar la búsqueda:
      this.terminoBusqueda='';

      if(hallazgo.tipo==='fijo'){
        // this.modalRef.hide();
        const initialState ={
        numeroDiente$:numeroDiente,
        hallazgoTipo$:hallazgo.tipo,
        hallazgoNombre$:hallazgo.nombre,
        hallazgoId$:hallazgo.id

        }

        this.bsModalRef = this.modalService.show(OdontogramaHallazgosComponent, { initialState});

        const hallazgoAgregado$ = new Subject<boolean>();

        this.bsModalRef.content.hallazgoAgregado$ = hallazgoAgregado$;
        hallazgoAgregado$.subscribe((hallazgoAgregado:boolean)=>{
          if(hallazgoAgregado){
            this.draw();
          }
        });
        this.bsModalRef.onHidden?.subscribe(()=>{
          hallazgoAgregado$.unsubscribe();
        })
      }else if(hallazgo.tipo==='caries'){
        // this.modalRef.hide();
        const initialState ={
        numeroDiente$:numeroDiente,
        hallazgo$:hallazgo.tipo,
        hallazgoId$:hallazgo.id,
        siglas$:hallazgo.siglas,
        }


        this.bsModalRef = this.modalService.show(AgregarHallazgo2Component, { initialState});

        const hallazgoAgregado$ = new Subject<boolean>();

        this.bsModalRef.content.hallazgoAgregado$ = hallazgoAgregado$;
        hallazgoAgregado$.subscribe((hallazgoAgregado:boolean)=>{
          if(hallazgoAgregado){
            this.draw();
          }
        });
        this.bsModalRef.onHidden?.subscribe(()=>{
          hallazgoAgregado$.unsubscribe();
        })
      }
      else if(hallazgo.tipo==='protesis'){
        // this.modalRef.hide();
        const initialState ={
        numeroDiente$:numeroDiente,
        hallazgoNombre$:hallazgo.nombre,
        hallazgoId$:hallazgo.id,
        hallazgoTipo$:hallazgo.tipo

        }


        this.bsModalRef = this.modalService.show(AgregarHallazgo3Component, { initialState});

        const hallazgoAgregado$ = new Subject<boolean>();

        this.bsModalRef.content.hallazgoAgregado$ = hallazgoAgregado$;
        hallazgoAgregado$.subscribe((hallazgoAgregado:boolean)=>{
          if(hallazgoAgregado){
            this.draw();

          }
        });
        this.bsModalRef.onHidden?.subscribe(()=>{
          hallazgoAgregado$.unsubscribe();
        })
      }
      else if(hallazgo.tipo==='restauracion definitiva'){
        // this.modalRef.hide();
        const initialState ={
        numeroDiente$:numeroDiente,
        hallazgo$:hallazgo.tipo,
        siglas$:hallazgo.siglas,
        hallazgoId$:hallazgo.id,
        }


        this.bsModalRef = this.modalService.show(AgregarHallazgo4Component, { initialState});

        const hallazgoAgregado$ = new Subject<boolean>();

        this.bsModalRef.content.hallazgoAgregado$ = hallazgoAgregado$;
        hallazgoAgregado$.subscribe((hallazgoAgregado:boolean)=>{
          if(hallazgoAgregado){
            this.draw();
          }
        });
        this.bsModalRef.onHidden?.subscribe(()=>{
          hallazgoAgregado$.unsubscribe();
        })
      }
      else if(hallazgo.tipo==='restauracion temporal'){
        // this.modalRef.hide();
        const initialState ={
        numeroDiente$:numeroDiente,
        hallazgoTipo$:hallazgo.tipo,
        hallazgoNombre$:hallazgo.nombre,
        hallazgoId$:hallazgo.id
        }


        this.bsModalRef = this.modalService.show(AgregarHallazgo5Component, { initialState});

        const hallazgoAgregado$ = new Subject<boolean>();

        this.bsModalRef.content.hallazgoAgregado$ = hallazgoAgregado$;
        hallazgoAgregado$.subscribe((hallazgoAgregado:boolean)=>{
          if(hallazgoAgregado){
            this.draw();

          }
        });
        this.bsModalRef.onHidden?.subscribe(()=>{
          hallazgoAgregado$.unsubscribe();
        })
      }
      else if(hallazgo.tipo==='sellantes'){
        // this.modalRef.hide();
        const initialState ={
        numeroDiente$:numeroDiente,
        hallazgoTipo$:hallazgo.tipo,
        hallazgoNombre$:hallazgo.nombre,
        hallazgoId$:hallazgo.id,
        }


        this.bsModalRef = this.modalService.show(AgregarHallazgo6Component, { initialState});

        const hallazgoAgregado$ = new Subject<boolean>();

        this.bsModalRef.content.hallazgoAgregado$ = hallazgoAgregado$;
        hallazgoAgregado$.subscribe((hallazgoAgregado:boolean)=>{
          if(hallazgoAgregado){
            this.draw();

          }
        });
        this.bsModalRef.onHidden?.subscribe(()=>{
          hallazgoAgregado$.unsubscribe();
        })
      }
      else if(hallazgo.tipo==='fijo estado'){
        // this.modalRef.hide();
        const initialState ={
        numeroDiente$:numeroDiente,
        hallazgo$:hallazgo.tipo,
        hallazgoId$:hallazgo.id,
        hallazgoNombre$:hallazgo.nombre,
        siglas$:hallazgo.siglas,
        }

        this.bsModalRef = this.modalService.show(AgregarHallazgo7Component, { initialState});

        const hallazgoAgregado$ = new Subject<boolean>();

        this.bsModalRef.content.hallazgoAgregado$ = hallazgoAgregado$;
        hallazgoAgregado$.subscribe((hallazgoAgregado:boolean)=>{
          if(hallazgoAgregado){
            this.draw();

          }
        });
        this.bsModalRef.onHidden?.subscribe(()=>{
          hallazgoAgregado$.unsubscribe();
        })
      }

    }



    @ViewChild('myModal') myModal!: TemplateRef<any>;
    @ViewChild('listModal') listModal!: TemplateRef<any>;



    obtenerNombresTrue(marcasS:string): string{

      if(marcasS===''){
        return '';
      }

      const marcas = JSON.parse(marcasS);
      const nombresTrue: string[] = [];

      for (const marca in marcas) {
          if (marcas.hasOwnProperty(marca) && marcas[marca].Valor) {
              nombresTrue.push(marca);
          }
      }

      return nombresTrue.join('<br>');
    }

    cargarListaHallazgos(numeroDiente:number){

      let odontogramaList:any[]=[];
      this.odontogramaService.obtenerOdontogramaPacienteListAPI(this.pacienteId).subscribe((data)=>{
        odontogramaList = data

      })

      for (let index = 0; index < odontogramaList.length; index++) {
        if(odontogramaList[index].numeroDiente===numeroDiente){

          // Agregar el OdontogramaPaciente actual a la lista
        this.odontogramaPacienteList$.push(odontogramaList[index]);

        }


      }

      if(this.odontogramaPacienteList$.length<0){
       this.modalRef?.hide();

      return;
      }
    }

    eliminarHallazgoPaciente(pacienteOdontogramaId:string, data:any){
      Swal.fire({
        title: '¿Estas seguro que deseas eliminar?',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if(result.isConfirmed){
          this.odontogramaService.eliminarHallazgoPaciente(pacienteOdontogramaId).subscribe(
            (response) => {
              if (response.isSuccess) {
                Swal.fire(response.message, '', 'success');
                const index = this.odontogramaPacienteList$.indexOf(data);
                if (index !== -1) {
                    this.odontogramaPacienteList$.splice(index, 1);

                     // Verificar si la lista está vacía después de eliminar
                      if (this.odontogramaPacienteList$.length === 0) {
                        // Cerrar el modal si la lista está vacía
                        this.modalRef?.hide();
                    }
                }




                // Limpiar el canvas
                const canvas = this.myCanvas.nativeElement;
                const context = canvas.getContext('2d');
              if(context){
                console.log("canvas limpiado")
                context.clearRect(0, 0, canvas.width, canvas.height);
              }
              this.limpiarOdontograma();

              } else {
                console.error(response.message);
              }
            },
            (error) => {
              console.error(error);
            });
        }else{
          return;
        }
      })
    }

    abrirListaHallazgo(){
      this.modalRef.hide();
      this.modalRef = this.modalService.show(this.myModal,  { backdrop: false});

    }

    toggleSelection() {
      const currentSelection = this.sharedService.getVariable();
      if (currentSelection) {
        this.sharedService.resetVariable();
      } else {
        return;
      }
    }

    odontogramaPacienteList$: IodontogramaPaciente[] = [];

    openModal(numeroDiente:string) {

      const hallazgo = this.sharedService.getVariable();

        if(hallazgo){
        this.agregarHallazgo(numeroDiente, hallazgo);

        // this.sharedService.resetVariable();
      // console.log("ejecute")
      // this.modalRef = this.modalService.show(this.myModal,  { backdrop: false});
        }
        else{
          this.numeroDiente = numeroDiente;
          this.odontogramaPacienteList$= [];

          for (let index = 0; index < this.odotogramaPacienteList.length; index++) {
            if(this.odotogramaPacienteList[index].numeroDiente===parseInt(numeroDiente)){
              console.log(this.odotogramaPacienteList[index]);

              // Agregar el OdontogramaPaciente actual a la lista
          this.odontogramaPacienteList$.push(this.odotogramaPacienteList[index]);

            }
          }

          if(this.odontogramaPacienteList$.length>0){
            console.log(this.odontogramaPacienteList$.length)
            this.modalRef = this.modalService.show(this.listModal, {class:'modal-lg'});
            return;
          }
        }






    }

    @ViewChild('myCanvas', { static: true })
    myCanvas!: ElementRef<HTMLCanvasElement>;


  tamanhoDiente: number = 50; // Tamaño del diente
  canvasWidth: number = 1085;
  canvasHeight: number = 650;


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustCanvasSize();
     // Limpiar el canvas
     const canvas = this.myCanvas.nativeElement;
     const context = canvas.getContext('2d');
   if(context){
     console.log("canvas limpiado")
     context.clearRect(0, 0, canvas.width, canvas.height);
   }
   this.limpiarOdontograma();

  }

  adjustCanvasSize() {
    const canvas = this.myCanvas.nativeElement;
    this.canvasWidth = canvas.offsetWidth; // o canvas.clientWidth

    if (this.canvasWidth >= 1000) {
      this.tamanhoDiente = 50;
    } else {
      // Ajustar el tamaño del diente en relación con el nuevo tamaño del canvas
      this.tamanhoDiente = this.canvasWidth * 0.04; // Por ejemplo, el tamaño del diente es el 4% del ancho del canvas
    }


  }

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

    private draw(){
      const canvas = this.myCanvas.nativeElement;
      const context = canvas.getContext('2d');


      if (context) {
        this.tamanhoColumna = canvas.width / 16;
        this.posicionPadre = {
          posicaoYInicialDente: 220,
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
          posicaoYInicialDente: 480,
          margemXEntreDentes: 8,
          margemYEntreDentes: 200,
          posicionRectangulo:280,

        };

        this.posicionNumerosSuperior ={
          posicaoYNumeros:480
        }
        this.posicionNumerosInferior ={
          posicaoYNumeros:1750
        }

        this.drawCanvasOdontograma(context,canvas);
    }
    }

    private limpiarOdontograma(){
      const canvas = this.myCanvas.nativeElement;
      const context = canvas.getContext('2d');


      if (context) {
        this.drawCanvasBase(context,canvas);


        for(let index =0; index<16; index++){
          const posicionX = this.definePosicaoXInicialDente(index);

        }
        this.drawCanvasOdontograma(context,canvas);

    }
    }

    private drawOdontograma(){
      const canvas = this.myCanvas.nativeElement;
      const context = canvas.getContext('2d');


      if (context) {
        this.drawCanvasBase(context,canvas);

        for(let index =0; index<16; index++){
          const posicionX = this.definePosicaoXInicialDente(index);

        }

        this.drawCanvasOdontograma(context,canvas);


        this.clickEvent(canvas);
        this.hoverEventSuperior(canvas,context);
    }
    }


    drawCanvasOdontograma(context:CanvasRenderingContext2D, canvas:HTMLCanvasElement){

      this.odontogramaService.obtenerOdontogramaPacienteListAPI(this.pacienteId).subscribe((data)=>{
        this.odotogramaPacienteList = data
        console.log(this.odotogramaPacienteList)


      //* Dibujar data del odontograma del paciente:
      for (let index = 0; index < this.odotogramaPacienteList.length; index++) {

        const numeroDienteSuperior = this.numeroDientes.superior.indexOf(this.odotogramaPacienteList[index].numeroDiente.toString());

        const numeroDienteInferior = this.numeroDientes.inferior.indexOf(this.odotogramaPacienteList[index].numeroDiente.toString());

        const numeroDienteFinalSuperior = this.numeroDientes.superior.indexOf(this.odotogramaPacienteList[index].dienteFinal.toString());

        const numeroDienteFinalInferior = this.numeroDientes.inferior.indexOf(this.odotogramaPacienteList[index].dienteFinal.toString());

        const posicionXSuperior = this.definePosicaoXInicialDente(numeroDienteSuperior);
        const posicionXFinalSuperior = this.definePosicaoXInicialDente(numeroDienteFinalSuperior);

        const posicionXInferior = this.definePosicaoXInicialDente(numeroDienteInferior);
        const posicionXFinalInferior = this.definePosicaoXInicialDente(numeroDienteFinalInferior);




        if(numeroDienteSuperior!=-1){
          if(this.odotogramaPacienteList[index].hallazgoId=== 1 || this.odotogramaPacienteList[index].hallazgoId=== 1){
            this.marcarTrapezoide(context, posicionXSuperior + 10, this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index]);
          this.textoRectanguloParameters(this.posicionPadre,posicionXSuperior, index,context);

          }
          else if(this.odotogramaPacienteList[index].hallazgoId===2){
            this.dibujarHallazgo(context, posicionXSuperior + 10, this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index],canvas);
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===3){
            this.marcarBordeTrapezoide(context, posicionXSuperior + 10, this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente,  this.odotogramaPacienteList[index]);

          this.textoRectanguloParameters(this.posicionPadre,posicionXSuperior, index,context);

          }
          else if(this.odotogramaPacienteList[index].hallazgoId===5){
            this.dibujarAparatoFijo(context,posicionXSuperior +30,posicionXFinalSuperior +30,this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index])
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===6){
            this.dibujarAparatoRemovible(context,posicionXSuperior +30,posicionXFinalSuperior +30,this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index],numeroDienteSuperior, numeroDienteFinalSuperior)
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===7){
            this.dibujarProtesisTotal(context,posicionXSuperior +30,posicionXFinalSuperior +30,this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index])
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===8){
            this.dibujarProtesisRemovible(context,posicionXSuperior +30,posicionXFinalSuperior +30,this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index])
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===23){
            this.piezaDentariaIntruida(context,posicionXSuperior +34,this.posicionPadre.posicaoYInicialDente, 90)
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===24){
            this.piezaDentariaExtruida(context,posicionXSuperior +34,this.posicionPadre.posicaoYInicialDente, -90)
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===21){
            this.dibujarCirculoSinRelleno(context,posicionXSuperior +34,this.posicionPadre.posicaoYInicialDente, 15)
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===20){
            this.dibujarFusión(context,posicionXSuperior +34,this.posicionPadre.posicaoYInicialDente,67,34, 15)
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===22){
            this.dibujarTriangulo(context,posicionXSuperior +34,this.posicionPadre.posicaoYInicialDente,40)
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===25){
            this.dibujarPiezaDentaria(context,posicionXSuperior +34,this.posicionPadre.posicaoYInicialDente,13,'S')
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===14){
            this.dibujarRestauracionDefinitiva(context, posicionXSuperior + 10, this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index])


          this.textoRectanguloParameters(this.posicionPadre,posicionXSuperior, index,context);
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===12){
            this.dibujarSellantes(context, posicionXSuperior + 10, this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index])
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===13){
            this.dibujarRestauracionTemporal(context, posicionXSuperior + 10, this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index])
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===26){
            this.textoRectanguloParameters(this.posicionPadre,posicionXSuperior, index,context);

          }
          // else if(this.odotogramaPacienteList[index].sigla!=""){

          // }
        }else if(numeroDienteInferior!=-1){

          if(this.odotogramaPacienteList[index].hallazgoId=== 1 || this.odotogramaPacienteList[index].hallazgoId=== 1){
            this.marcarTrapezoide(context, posicionXInferior + 10, this.posicionPadre2.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index]);
            this.textoRectanguloParameters(this.posicionPadre2,posicionXInferior, index,context);

          }
          else if(this.odotogramaPacienteList[index].hallazgoId===2){
            this.dibujarHallazgo(context, posicionXInferior + 10, this.posicionPadre2.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index],canvas);
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===3){
            this.marcarBordeTrapezoide(context, posicionXInferior + 10, this.posicionPadre2.posicaoYInicialDente, this.tamanhoDiente,  this.odotogramaPacienteList[index]);
            this.textoRectanguloParameters(this.posicionPadre2,posicionXInferior, index,context);

          }
          else if(this.odotogramaPacienteList[index].hallazgoId===5){
            this.dibujarAparatoFijo(context,posicionXInferior +30,posicionXFinalInferior +30,this.posicionPadre2.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index])
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===6){
            this.dibujarAparatoRemovible(context,posicionXInferior +30,posicionXFinalInferior +30,this.posicionPadre2.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index],numeroDienteInferior,numeroDienteFinalInferior)
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===7){
            this.dibujarProtesisTotal(context,posicionXInferior +30,posicionXFinalInferior +30,this.posicionPadre2.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index])
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===8){
            this.dibujarProtesisRemovible(context,posicionXInferior +30,posicionXFinalInferior +30,this.posicionPadre2.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index])
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===24){
            this.piezaDentariaIntruida(context,posicionXInferior +34,this.posicionPadre2.posicaoYInicialDente, 90)
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===23){
            this.piezaDentariaExtruida(context,posicionXInferior +34,this.posicionPadre2.posicaoYInicialDente, -90)
          }

          else if(this.odotogramaPacienteList[index].hallazgoId===21){
            this.dibujarCirculoSinRelleno(context,posicionXInferior +34,this.posicionPadre2.posicaoYInicialDente, 15)
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===20){
            this.dibujarFusión(context,posicionXInferior +34,this.posicionPadre2.posicaoYInicialDente,67,34, 15)
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===22){
            this.dibujarTriangulo(context,posicionXInferior +34,this.posicionPadre2.posicaoYInicialDente,40)
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===25){
            this.dibujarPiezaDentaria(context,posicionXInferior +34,this.posicionPadre2.posicaoYInicialDente,13,'S')
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===14){
            this.dibujarRestauracionDefinitiva(context, posicionXInferior + 10, this.posicionPadre2.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index]);

            this.textoRectanguloParameters(this.posicionPadre2,posicionXInferior, index,context);

          }
          else if(this.odotogramaPacienteList[index].hallazgoId===12){
            this.dibujarSellantes(context, posicionXInferior + 10, this.posicionPadre2.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index])
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===13){
            this.dibujarRestauracionTemporal(context, posicionXInferior + 10, this.posicionPadre2.posicaoYInicialDente, this.tamanhoDiente,this.odotogramaPacienteList[index])
          }
          else if(this.odotogramaPacienteList[index].hallazgoId===27){
            this.textoRectanguloParameters(this.posicionPadre2,posicionXInferior, index,context);

          }
        }
      }
      })
    }

    textoRectanguloParameters(posicionPadre:any,posicionX:number,index:number,context:CanvasRenderingContext2D){
      this.textoRectangulo({
        position: {
            x: posicionX + 3,
            y: (posicionPadre.margemYEntreDentes / 5) + this.tamanhoDiente + posicionPadre.posicionRectangulo
        },
        primeiroOuUltimoDente: index === 0 || index === 15,
        altura: this.tamanhoDiente / 1.8,
        largura: index === 15 ? this.tamanhoDiente + posicionPadre.margemXEntreDentes : this.tamanhoDiente + 2 * posicionPadre.margemXEntreDentes
    },
    context, this.odotogramaPacienteList[index].sigla,posicionPadre);
    }

    drawCanvasBase(context:CanvasRenderingContext2D, canvas:HTMLCanvasElement){
      this.tamanhoColumna = canvas.width / 16;
        this.posicionPadre = {
          posicaoYInicialDente: 220,
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
          posicaoYInicialDente: 480,
          margemXEntreDentes: 8,
          margemYEntreDentes: 200,
          posicionRectangulo:280,

        };

        this.posicionNumerosSuperior ={
          posicaoYNumeros:480
        }
        this.posicionNumerosInferior ={
          posicaoYNumeros:1750
        }

        //* Superior

        for (let index = 0; index < 16; index++) {
          const posicionX = this.definePosicaoXInicialDente(index);

          this.dibujarTrapezoide(context, posicionX + 10, this.posicionPadre.posicaoYInicialDente, this.tamanhoDiente);



          this.dibujarImagenDienteSuperior(`/assets/img/odontogramaTest/dientes/tooth-${this.numeroDientes.superior[index]}.png`, context, canvas, posicionX+ 10);

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


          this.dibujarImagenDienteInferior(`/assets/img/odontogramaTest/dientes/tooth-${this.numeroDientes.inferior[index]}.png`, context, canvas, posicionX+ 10);


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
    }



    ngAfterViewInit(): void {
     this.drawOdontograma();
  }

  protesisFija(){

  }

  private dibujarRestauracionTemporal(context: CanvasRenderingContext2D, x: number, y: number, tamanhoDiente: number, pacienteOdontograma: IodontogramaPaciente){
    this.dimensionesTrapezio = {
      baseMaior: tamanhoDiente,
      lateral: tamanhoDiente / 4,
      baseMenor: (tamanhoDiente / 4) * 3
    };
    let marcas = JSON.parse(pacienteOdontograma.marcas);


    if (marcas.Vestibular && marcas.Vestibular.Valor) {
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
    }
    if(marcas.Palatino && marcas.Palatino.Valor){
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
    }
    if(marcas.Distal && marcas.Distal.Valor){
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
    }
    if(marcas.Mesial && marcas.Mesial.Valor){
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
    }
    if(marcas.Oclusal && marcas.Oclusal.Valor){
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
    }

  }

  private dibujarSellantes(context: CanvasRenderingContext2D, x: number, y: number, tamanhoDiente: number, pacienteOdontograma: IodontogramaPaciente){

    this.dimensionesTrapezio = {
      baseMaior: tamanhoDiente,
      lateral: tamanhoDiente / 4,
      baseMenor: (tamanhoDiente / 4) * 3
    };


    let marcas = JSON.parse(pacienteOdontograma.marcas);

     if (marcas.Vestibular && marcas.Vestibular.Valor) {
      if(marcas.Vestibular.Estado==="Bueno"){
        context.save();
        context.lineWidth = 3;
        context.fillStyle = 'blue'; // Establece el color de relleno como rojo
        context.strokeStyle = 'blue';
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
        context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
        context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
        context.closePath();
        context.stroke();
        context.restore();
      }
      else if(marcas.Vestibular.Estado==="Malo"){
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
      }
      else{

      }

  }

  if (marcas.Palatino && marcas.Palatino.Valor) {
    if(marcas.Palatino.Estado==="Bueno"){
      context.save();
      context.lineWidth = 3;
      context.fillStyle = 'blue'; // Establece el color de relleno como rojo
      context.strokeStyle = 'blue';
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.closePath();
      context.stroke();
      context.restore();
    }
    else if(marcas.Palatino.Estado==="Malo"){
      context.save();
      context.lineWidth = 3;
      context.fillStyle = 'red'; // Establece el color de relleno como rojo
      context.strokeStyle = 'red';
      context.beginPath();
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.closePath();
      context.stroke();
      context.restore();
    }

  }

  if (marcas.Distal && marcas.Distal.Valor) {

    if(marcas.Distal.Estado==="Bueno"){
      context.save();
      context.lineWidth = 3;
      context.fillStyle = 'blue'; // Establece el color de relleno como rojo
      context.strokeStyle = 'blue';
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
      context.restore();
    }
    else if(marcas.Distal.Estado==="Malo"){
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
    }


  }

  if (marcas.Mesial && marcas.Mesial.Valor) {

    if(marcas.Mesial.Estado==="Bueno"){
      context.save();
      context.lineWidth = 3;
      context.fillStyle = 'blue'; // Establece el color de relleno como rojo
      context.strokeStyle = 'blue';
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
      context.restore();
    }
    else if(marcas.Mesial.Estado==="Malo"){
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
    }

  }

  if (marcas.Oclusal && marcas.Oclusal.Valor) {
        //* cuadrado - Oclusal
    if(marcas.Oclusal.Estado==="Bueno"){
      context.save();
      context.lineWidth = 3;
      context.fillStyle = 'blue'; // Establece el color de relleno como rojo
      context.strokeStyle = 'blue';
      context.beginPath();
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.closePath();
      context.stroke();
      context.restore();
    }
    else if(marcas.Oclusal.Estado==="Malo"){
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
    }


  }

  }

  private dibujarRestauracionDefinitiva(context: CanvasRenderingContext2D, x: number, y: number, tamanhoDiente: number, pacienteOdontograma: IodontogramaPaciente){


    this.dimensionesTrapezio = {
      baseMaior: tamanhoDiente,
      lateral: tamanhoDiente / 4,
      baseMenor: (tamanhoDiente / 4) * 3
    };


    let marcas = JSON.parse(pacienteOdontograma.marcas);

     if (marcas.Vestibular && marcas.Vestibular.Valor) {
      if(marcas.Vestibular.Estado==="Bueno"){
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
        context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
        context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
        context.closePath();
        context.stroke();
        context.fillStyle = '#7f9fff';
        context.fill();
      }
      else if(marcas.Vestibular.Estado==="Malo"){
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
        context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
        context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
        context.closePath();
        context.stroke();
        context.fillStyle = '#f48e8e';
        context.fill();
      }
      else{

      }

  }

  if (marcas.Palatino && marcas.Palatino.Valor) {
    if(marcas.Palatino.Estado==="Bueno"){
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#7f9fff';
      context.fill();
    }
    else if(marcas.Palatino.Estado==="Malo"){
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#f48e8e';
      context.fill();
    }

  }

  if (marcas.Distal && marcas.Distal.Valor) {

    if(marcas.Distal.Estado==="Bueno"){
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#7f9fff';
      context.fill();
    }
    else if(marcas.Distal.Estado==="Malo"){
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#f48e8e';
      context.fill();
    }


  }

  if (marcas.Mesial && marcas.Mesial.Valor) {

    if(marcas.Mesial.Estado==="Bueno"){
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#7f9fff';
      context.fill();
    }
    else if(marcas.Mesial.Estado==="Malo"){
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#f48e8e';
      context.fill();
    }

  }

  if (marcas.Oclusal && marcas.Oclusal.Valor) {
        //* cuadrado - Oclusal
    if(marcas.Oclusal.Estado==="Bueno"){
      context.beginPath();
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#7f9fff';
      context.fill();
    }
    else if(marcas.Oclusal.Estado==="Malo"){
      context.beginPath();
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#f48e8e';
      context.fill();
    }


  }

  }

  private dibujarPiezaDentaria(context: CanvasRenderingContext2D, x: number, y: number, radio: number,texto:string): void {
    context.save();
    // Establecer estilo de la flecha
    context.strokeStyle = "blue";

    context.lineWidth = 2;
    context.beginPath(); // Inicia la ruta de dibujo
    context.arc(x+35, y-30, radio, 0, Math.PI * 2); // Dibuja un arco completo (un círculo completo)
    context.stroke(); // Dibuja el contorno del círculo sin rellenarlo
    context.closePath(); // Cierra la ruta de dibujo


    // Calcula las coordenadas para colocar el texto
    const angulo = -Math.PI / 4; // Angulo donde quieres colocar el texto (en radianes)
    const textoX = x+35
    const textoY = y-30

    // Dibuja el texto centrado en las coordenadas calculadas
    context.fillStyle = "blue";
    context.font = "bold 18px Arial"; // Establece el tamaño y tipo de fuente
    context.textAlign = "center"; // Centra el texto horizontalmente
    context.textBaseline = "middle"; // Centra el texto verticalmente
    context.fillText(texto, textoX, textoY);

    context.restore();

}

  private dibujarTriangulo(context: CanvasRenderingContext2D, x: number, y: number, lado: number): void {
    context.save();
    // Establecer estilo del triángulo
    context.strokeStyle = "blue";
    context.lineWidth = 2;
    context.beginPath(); // Inicia la ruta de dibujo
    context.moveTo(x, (y-50) - lado); // Mueve el lápiz al vértice superior (en lugar del inferior)
    context.lineTo(x + lado / 1.5, y-50); // Dibuja línea al vértice inferior derecho
    context.lineTo(x - lado / 1.5, y-50);
    context.closePath(); // Cierra el triángulo
    context.stroke(); // Dibuja el contorno del triángulo
    context.restore();
}




  private dibujarCirculoSinRelleno(context: CanvasRenderingContext2D, x: number, y: number, radio: number): void {

    context.save();
    // Establecer estilo de la flecha
    context.strokeStyle = "blue";

    context.lineWidth = 2;
    context.beginPath(); // Inicia la ruta de dibujo
    context.arc(x, y-65, radio, 0, Math.PI * 2); // Dibuja un arco completo (un círculo completo)
    context.stroke(); // Dibuja el contorno del círculo sin rellenarlo
    context.closePath(); // Cierra la ruta de dibujo
    context.restore();

  }

  private dibujarFusión(context: CanvasRenderingContext2D, x: number, y: number, radio: number, radioX: number, radioY: number): void {

    context.save();
    // Establecer estilo de la flecha
    context.strokeStyle = "blue";

    context.lineWidth = 2;
    context.beginPath(); // Inicia la ruta de dibujo
    context.ellipse(x+10, y-65, radioX, radioY, 0, 0, Math.PI * 2); // Dibuja una elipse con los radios dados
    context.stroke(); // Dibuja el contorno del círculo sin rellenarlo
    context.closePath(); // Cierra la ruta de dibujo

    context.beginPath(); // Inicia la ruta de dibujo
    context.ellipse(x+60, y-65, radioX, radioY, 0, 0, Math.PI * 2); // Dibuja una elipse con los radios dados
    context.stroke(); // Dibuja el contorno del círculo sin rellenarlo
    context.closePath(); // Cierra la ruta de dibujo
    context.restore();

  }


  private piezaDentariaExtruida(context: CanvasRenderingContext2D, startX: number, startY: number, angle: number) {
    // Longitud de la flecha

    context.save();

    // Mover el origen del sistema de coordenadas al punto de inicio de la flecha
    context.translate(startX, startY-33);
    // Rotar el sistema de coordenadas según el ángulo especificado
    context.rotate(angle * Math.PI / 180); // Convertir el ángulo a radianes antes de rotar

    // Establecer estilo de la flecha
    context.strokeStyle = "blue";

    context.lineWidth = 2;
    context.beginPath();

    // Dibujar la flecha
    context.moveTo(0, 0);
    context.lineTo(length, 0);
    context.lineTo(length - 10, -5);
    context.moveTo(length, 0);
    context.lineTo(length - 10, 5);

    // Dibujar la parte inferior de la flecha
    context.lineTo(length - 10, 2);
    context.lineTo(length - 30, 2);
    context.lineTo(length - 30, -2);
    context.lineTo(length - 10, -2);
    context.lineTo(length - 10, -5);

    // Dibujar la flecha
    context.stroke();
    context.fillStyle = "blue";
    context.fill();

    // Finalizar el trazado
    context.closePath();
    context.restore();
}

  private piezaDentariaIntruida(context: CanvasRenderingContext2D, startX: number, startY: number, angle: number) {
    // Longitud de la flecha

    context.save();

    // Mover el origen del sistema de coordenadas al punto de inicio de la flecha
    context.translate(startX, startY-7);
    // Rotar el sistema de coordenadas según el ángulo especificado
    context.rotate(angle * Math.PI / 180); // Convertir el ángulo a radianes antes de rotar

    // Establecer estilo de la flecha
    context.strokeStyle = "blue";

    context.lineWidth = 2;
    context.beginPath();

    // Dibujar la flecha
    context.moveTo(0, 0);
    context.lineTo(length, 0);
    context.lineTo(length - 10, -5);
    context.moveTo(length, 0);
    context.lineTo(length - 10, 5);

    // Dibujar la parte inferior de la flecha
    context.lineTo(length - 10, 2);
    context.lineTo(length - 30, 2);
    context.lineTo(length - 30, -2);
    context.lineTo(length - 10, -2);
    context.lineTo(length - 10, -5);

    // Dibujar la flecha
    context.stroke();
    context.fillStyle = "blue";
    context.fill();

    // Finalizar el trazado
    context.closePath();
    context.restore();
}

  private dibujarProtesisRemovible(context: CanvasRenderingContext2D, xInicial:number, xFinal:number,y: number, tamanhoDiente: number, pacienteOdontograma: IodontogramaPaciente){
    context.save();
    context.strokeStyle = "blue";
     context.fillStyle = "blue";
     context.lineWidth = 4;
    context.beginPath();
    context.moveTo(xInicial -20, y-30);
    context.lineTo(xFinal +25, y -30);

    context.moveTo(xInicial -20, y-20);
    context.lineTo(xFinal +25, y -20);
    context.stroke();
    context.restore();
  }

  private dibujarProtesisTotal(context: CanvasRenderingContext2D, xInicial:number, xFinal:number,y: number, tamanhoDiente: number, pacienteOdontograma: IodontogramaPaciente){
    context.save();
    context.strokeStyle = "blue";
     context.fillStyle = "blue";
     context.lineWidth = 4;
    context.beginPath();
    context.moveTo(xInicial -20, y+20);
    context.lineTo(xFinal +25, y +20);

    context.moveTo(xInicial -20, y+30);
    context.lineTo(xFinal +25, y +30);
    context.stroke();
    context.restore();
  }

  private dibujarAparatoFijo( context: CanvasRenderingContext2D, xInicial:number, xFinal:number,y: number, tamanhoDiente: number, pacienteOdontograma: IodontogramaPaciente){
     // Dibuja el rectángulo al principio
     tamanhoDiente = 10;
     context.save();
     context.strokeStyle = "blue";
     context.fillStyle = "blue";
     context.lineWidth = 3;
     context.beginPath();


    context.strokeRect(xInicial-5, y - 30, tamanhoDiente, tamanhoDiente);
    context.strokeRect(xInicial-5 + tamanhoDiente, y - 30, tamanhoDiente, tamanhoDiente);
    context.strokeRect(xInicial-5, (y - 30) + tamanhoDiente, tamanhoDiente, tamanhoDiente);
    context.strokeRect((xInicial-5) + tamanhoDiente, (y - 30) + tamanhoDiente, tamanhoDiente, tamanhoDiente);



    context.beginPath();
    context.moveTo(xInicial , y -20);
    context.lineTo(xFinal , y-20 );
    context.stroke();


     // Dibuja el rectángulo al final
     context.beginPath();

     context.strokeRect(xFinal-5, y - 30, tamanhoDiente, tamanhoDiente);
     context.strokeRect(xFinal-5 + tamanhoDiente, y - 30, tamanhoDiente, tamanhoDiente);
     context.strokeRect(xFinal-5, (y - 30) + tamanhoDiente, tamanhoDiente, tamanhoDiente);
     context.strokeRect((xFinal-5) + tamanhoDiente, (y - 30) + tamanhoDiente, tamanhoDiente, tamanhoDiente);
    // Rectangulo blue
    //  context.rect(xFinal - 5, y - 28, 10, 22);
    //  context.fill();
     context.restore();
  }

  private dibujarAparatoRemovible( context: CanvasRenderingContext2D, xInicial:number, xFinal:number,y: number, tamanhoDiente: number, pacienteOdontograma: IodontogramaPaciente, numeroDiente:number,numeroDienteFinal:number ){

     // Dibuja el rectángulo al principio
    const cantidadZigZags=Math.abs(numeroDienteFinal-numeroDiente) * 4;
     context.save();
     context.strokeStyle = "blue";
     context.fillStyle = "blue";
     context.lineWidth = 4;
     const deltaX = (xFinal - xInicial) / cantidadZigZags;
    const deltaY = (y - y) / cantidadZigZags;

    context.beginPath();
    context.moveTo(xInicial, y-15);

    for (let i = 0; i < cantidadZigZags; i++) {
        if (i % 2 === 0) {
            context.lineTo(xInicial + deltaX * (i + 1), (y-23) + deltaY * (i + 1) - 10); // Ajusta la altura del zigzag
        } else {
            context.lineTo(xInicial + deltaX * (i + 1), (y-23) + deltaY* (i + 1) + 10); // Ajusta la altura del zigzag
        }
    }

    context.stroke();
     context.restore();
  }

  private dibujarImagenDienteSuperior(src: string, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement,x:number) {
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
  private dibujarImagenDienteInferior(src: string, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement,x:number) {
    let imagen = new Image();
    imagen.src = src;
    imagen.onload = () => {
      const valoresBase = {
        x: (canvas.width * 24) / this.tamanhoTelaReferencia,
        y: (canvas.width * 980) / this.tamanhoTelaReferencia,
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


  clickEvent(canvas:HTMLCanvasElement){
    canvas.addEventListener('click', (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Verificar si el clic está dentro de algún cuadro
      for (let i = 0; i < 16; i++) {
        const posicionX = this.definePosicaoXInicialDente(i)+10;
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
        const posicionX = this.definePosicaoXInicialDente(i)+10;
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
        if (x+10 > posicionX+10 && x < (posicionX+10) + this.tamanhoDiente &&
            y > posicionY && y < posicionY + this.tamanhoDiente) {

          canvas.style.cursor = 'pointer'; // Cambiar el cursor
          this.dibujarTrapezoide(context, posicionX +10, posicionY, this.tamanhoDiente, 'orange');
        // Cambiar el color a amarillo
          hovered = true;
          break;
        }

        // Fila Inferior
        if (x+10 > posicionX+10 && x < (posicionX+10) + this.tamanhoDiente &&
          y > posicionY2 && y < posicionY2 + this.tamanhoDiente) {
        // El mouse está sobre el cuadro i
        canvas.style.cursor = 'pointer'; // Cambiar el cursor
        this.dibujarTrapezoide(context, posicionX +10, posicionY2, this.tamanhoDiente, 'orange'); // Cambiar el color a amarillo
        hovered = true;
        break;
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
      context.font = 'bold 16px Arial'; // Tamaño y fuente de los números


        const posicionX = this.definePosicaoXInicialDente(index);
        const posicionY = (this.posicionNumerosSuperior.posicaoYNumeros / 5) + this.tamanhoDiente
        const numero = this.numeroDientes.superior[index]; // Ejemplo de número, podrías definirlos como desees

        context.fillText(numero, posicionX + 26, posicionY + 20); // Dibuja el número en la posición deseada
    }

    private dibujarNumerosInferior(context: CanvasRenderingContext2D,index:number) {
      context.fillStyle = 'black'; // Color de los números
      context.font = 'bold 16px Arial'; // Tamaño y fuente de los números

        const posicionX = this.definePosicaoXInicialDente(index);
        const posicionY = (this.posicionNumerosInferior.posicaoYNumeros / 5) + this.tamanhoDiente
        const numero = this.numeroDientes.inferior[index]; // Ejemplo de número, podrías definirlos como desees

        context.fillText(numero, posicionX + 26, posicionY + 20); // Dibuja el número en la posición deseada
    }

    private dibujarImagen(svgUrl: string, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, x: number,y:any) {
      // Crear una nueva instancia de XMLHttpRequest
      const xhr = new XMLHttpRequest();

      // Abrir una solicitud para cargar el archivo SVG
      xhr.open('GET', svgUrl);

      // Configurar el manejo de la carga del archivo SVG
      xhr.onload = () => {
        if (xhr.status === 200) {
          // Convertir la respuesta en un documento XML
          const parser = new DOMParser();
          const svgDocument = parser.parseFromString(xhr.responseText, 'image/svg+xml');

          // Crear una nueva instancia de Image a partir del contenido SVG
          const img = new Image();
          img.src = 'data:image/svg+xml,' + encodeURIComponent(xhr.responseText);

          // Esperar a que la imagen se cargue
          img.onload = () => {
            // Dibujar la imagen en el canvas
            context.drawImage(img, x, (y - 10));
          };

          img.onerror = (error) => {
            console.error('Error loading SVG:', error);
          };
        } else {
          console.error('Failed to load SVG:', xhr.statusText);
        }
      };
      xhr.onerror = (error) => {
        console.error('Error loading SVG:', error);
      };
      // Enviar la solicitud para cargar el archivo SVG
      xhr.send();
    }

    private definePosicaoXInicialDente(index: number): number {
      if (index === 0) return (index * this.tamanhoDiente) + (this.posicionPadre.margemXEntreDentes * index) + this.posicionPadre.margemXEntreDentes;
      else return (index * this.tamanhoDiente) + (2 * this.posicionPadre.margemXEntreDentes * index) + this.posicionPadre.margemXEntreDentes;
    }

    private dibujarRectangulo( cuadrado:any, context:CanvasRenderingContext2D){
      let tamanhoFuente = (20 * (cuadrado.primeiroOuUltimoDente ? cuadrado.largura + this.posicionPadre.margemXEntreDentes : cuadrado.largura)) / 118.4375
      context.font = `${tamanhoFuente}px arial`
      context.strokeStyle = 'white';
      context.fillStyle = '#dbdada';

      // Dibujar el relleno del rectángulo con el color especificado
      context.fillRect(cuadrado.position.x, cuadrado.position.y, cuadrado.largura, cuadrado.altura);

      context.strokeRect(cuadrado.position.x, cuadrado.position.y, cuadrado.largura, cuadrado.altura)


    return tamanhoFuente
    }

    private textoRectangulo(cuadrado:any, context:CanvasRenderingContext2D, sigla:string, posicionPadre:any){

      let tamanhoFuente = (20 * (cuadrado.primeiroOuUltimoDente ? cuadrado.largura + posicionPadre.margemXEntreDentes : cuadrado.largura)) / 118.4375
      context.font = `${tamanhoFuente}px arial`
         // Escribir texto dentro del rectángulo
         context.fillStyle = 'red'; // Color del texto
         const texto = sigla; // El texto que quieres escribir
         const textoX = cuadrado.position.x + 10; // Posición X del texto (ajustar según sea necesario)
         const textoY = cuadrado.position.y + cuadrado.altura / 2; // Posición Y del texto (ajustar según sea necesario)
         context.fillText(texto, textoX, textoY);
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

    marcarBordeTrapezoide(context: CanvasRenderingContext2D, x: number, y: number, tamanhoDiente: number,pacienteOdontograma: IodontogramaPaciente){

      this.dimensionesTrapezio = {
        baseMaior: tamanhoDiente,
        lateral: tamanhoDiente / 4,
        baseMenor: (tamanhoDiente / 4) * 3
      };

      if(pacienteOdontograma?.estado===0){
        context.save();
        context.lineWidth = 5;
        // Coloreado corona
        context.fillStyle='red'
        context.strokeStyle = 'red';
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
        context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
        context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
        context.moveTo(x, y);
        context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
        context.closePath();
        context.stroke();
        context.restore();
      }
      else if(pacienteOdontograma?.estado===1){
        context.save();
        context.lineWidth = 5;
        // Coloreado corona
        context.fillStyle='blue'
        context.strokeStyle = 'blue';
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
        context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
        context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
        context.moveTo(x, y);
        context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
        context.closePath();
        context.stroke();
        context.restore();
      }


    }

    private marcarTrapezoide(context: CanvasRenderingContext2D, x: number, y: number, tamanhoDiente: number, pacienteOdontograma: IodontogramaPaciente){

      this.dimensionesTrapezio = {
        baseMaior: tamanhoDiente,
        lateral: tamanhoDiente / 4,
        baseMenor: (tamanhoDiente / 4) * 3
      };


      let marcas = JSON.parse(pacienteOdontograma.marcas);

       if (marcas.Vestibular && marcas.Vestibular.Valor) {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#f48e8e';
      context.fill();
    }

    if (marcas.Palatino && marcas.Palatino.Valor) {
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#f48e8e';
      context.fill();
    }

    if (marcas.Distal && marcas.Distal.Valor) {
      context.beginPath();
      context.moveTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.baseMaior + x, this.dimensionesTrapezio.baseMaior + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#f48e8e';
      context.fill();
    }

    if (marcas.Mesial && marcas.Mesial.Valor) {
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(x, this.dimensionesTrapezio.baseMaior + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#f48e8e';
      context.fill();
    }

    if (marcas.Oclusal && marcas.Oclusal.Valor) {
      //* cuadrado - Oclusal
      context.beginPath();
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.lateral + y);
      context.lineTo(this.dimensionesTrapezio.baseMenor + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.baseMenor + y);
      context.lineTo(this.dimensionesTrapezio.lateral + x, this.dimensionesTrapezio.lateral + y);
      context.closePath();
      context.stroke();
      context.fillStyle = '#f48e8e';
      context.fill();
    }
    }

    private dibujarHallazgo(context: CanvasRenderingContext2D, x: number, y: number, tamanhoDiente: number, pacienteOdontograma: IodontogramaPaciente, canvas:HTMLCanvasElement){

      let hallazgo = pacienteOdontograma.hallazgoId

      if(hallazgo === 2){
        this.dibujarImagen('assets/img/odontogramaTest/exodoncia.svg', context, canvas, x,y);

      }
      // if(hallazgo === "Corona"){
      //   this.dibujarImagen('assets/img/odontogramaTest/corona.svg', context, canvas, x);

      // }
    }
  }



