import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Validators } from 'ngx-editor';
import { IodontogramaPaciente } from 'src/app/shared/models/odontrograma';
import { OdontogramaHallazgosComponent } from '../../odontograma-hallazgos/odontograma-hallazgos.component';
import { AgregarHallazgo2Component } from '../../agregar-hallazgo2/agregar-hallazgo2.component';
import { AgregarHallazgo3Component } from '../../agregar-hallazgo3/agregar-hallazgo3.component';
import { Subject } from 'rxjs';
import { AgregarHallazgo4Component } from '../../agregar-hallazgo-odontograma/agregar-hallazgo4/agregar-hallazgo4.component';
import { AgregarHallazgo5Component } from '../../agregar-hallazgo-odontograma/agregar-hallazgo5/agregar-hallazgo5.component';
import Swal from 'sweetalert2';
import { OdontogramaService } from 'src/app/shared/services/odontograma.service';
import { AgregarHallazgo6Component } from '../../agregar-hallazgo-odontograma/agregar-hallazgo6/agregar-hallazgo6.component';
import { AgregarHallazgo7Component } from '../../agregar-hallazgo-odontograma/agregar-hallazgo7/agregar-hallazgo7.component';


interface THallazgo{
  id:number;
  nombre:string;
  tipo:string;
  siglas?:string[];
}

@Component({
  selector: 'app-editar-hallazgo1',
  templateUrl: './editar-hallazgo1.component.html',
  styleUrls: ['./editar-hallazgo1.component.scss']
})
export class EditarHallazgo1Component implements OnInit {
  numeroDiente$:string='';

  constructor(public bsModalRef: BsModalRef,public formBuilder: FormBuilder, private modalService:BsModalService, private odontogramaService:OdontogramaService){}

  categoria$?:string;
  diagnostico$?:string;
  form!: FormGroup;
  modalRef!: BsModalRef;


  hallazgoEliminado$:  Subject<boolean> = new Subject<boolean>();


  odontogramaPacienteList$:IodontogramaPaciente[]=[];

  hallazgosList: THallazgo[]=[
    {id:1,nombre:'Caries Dental', tipo:'caries',siglas:['MB - Mancha Blanca','CE - Lesión de caries a nivel del esmalte']},
    {id:2,nombre:'Protesis Removible', tipo:'aparato'},
    {id:3,nombre:'Protesis Total', tipo:'aparato'},
    {id:4,nombre:'Protesis Fija', tipo:'aparato'},
    {id:5,nombre:'Aparato Orto. Fijo', tipo:'aparato'},
    {id:6,nombre:'Aparato Orto. Removible', tipo:'aparato'},
    {id:7,nombre:'Exodoncia', tipo:'fijo'},
    {id:8,nombre:'Corona', tipo:'fijo estado',siglas:['CM - Corona Metálica','CF - Corona Fenestrada']},
    {id:9,nombre:'Corona Temporal', tipo:'fijo estado'},
    {id:10,nombre:'Espigo Muñon', tipo:'fijo'},
    {id:11,nombre:'Impactacion', tipo:'fijo'},
    {id:12,nombre:'Sellantes', tipo:'sellantes'},
    {id:13,nombre:'Restauracion Temporal', tipo:'restauracion temporal'},
    {id:14,nombre:'Restauracion Definitiva', tipo:'restauracion definitiva',siglas:['AM -Amalgama Dental','R - Resina']},



  ]

  terminoBusqueda: string = '';

get hallazgosFiltrados(): THallazgo[] {
  return this.hallazgosList.filter(producto =>
    producto.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
  );
}

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

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      categoria: [0, Validators.required],
      diagnostico: ['', [Validators.required, Validators.maxLength(150)]],
      numeroDiente:['', [Validators.required, Validators.maxLength(10)]],

    })


    this.form.patchValue({
      categoria: this.categoria$,
      diagnostico: this.diagnostico$,
      numeroDiente:this.numeroDiente$,
    })
  }

  @ViewChild('myModal') myModal!: TemplateRef<any>;


  agregarHallazgoModal(){
    this.modalRef = this.modalService.show(this.myModal);
    this.bsModalRef.hide()

  }

  agregarHallazgo(numeroDiente:string, hallazgo:THallazgo){

    // Limpiar la búsqueda:
    this.terminoBusqueda='';

    if(hallazgo.tipo==='fijo'){
      this.modalRef.hide();
      const initialState ={
      numeroDiente$:numeroDiente,
      hallazgo$:hallazgo.tipo
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
    }else if(hallazgo.tipo==='caries'){
      this.modalRef.hide();
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
          // this.drawOdontograma();

        }
      });
      this.bsModalRef.onHidden?.subscribe(()=>{
        hallazgoAgregado$.unsubscribe();
      })
    }
    else if(hallazgo.tipo==='aparato'){
      this.modalRef.hide();
      const initialState ={
      numeroDiente$:numeroDiente,
      hallazgo$:hallazgo.tipo
      }


      this.bsModalRef = this.modalService.show(AgregarHallazgo3Component, { initialState});

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
    else if(hallazgo.tipo==='restauracion definitiva'){
      this.modalRef.hide();
      const initialState ={
      numeroDiente$:numeroDiente,
      hallazgo$:hallazgo.tipo,
      siglas$:hallazgo.siglas,
      }


      this.bsModalRef = this.modalService.show(AgregarHallazgo4Component, { initialState});

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
    else if(hallazgo.tipo==='restauracion temporal'){
      this.modalRef.hide();
      const initialState ={
      numeroDiente$:numeroDiente,
      hallazgo$:hallazgo.tipo
      }


      this.bsModalRef = this.modalService.show(AgregarHallazgo5Component, { initialState});

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
    else if(hallazgo.tipo==='sellantes'){
      this.modalRef.hide();
      const initialState ={
      numeroDiente$:numeroDiente,
      hallazgo$:hallazgo.tipo
      }


      this.bsModalRef = this.modalService.show(AgregarHallazgo6Component, { initialState});

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
    else if(hallazgo.tipo==='fijo estado'){
      this.modalRef.hide();
      const initialState ={
      numeroDiente$:numeroDiente,
      hallazgo$:hallazgo.tipo,
      siglas$:hallazgo.siglas,
      }

      this.bsModalRef = this.modalService.show(AgregarHallazgo7Component, { initialState});

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


  eliminarHallazgoPaciente(pacienteOdontogramaId:string){
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
              this.hallazgoEliminado$.next(true);
              this.bsModalRef.hide()
              return;
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



}
