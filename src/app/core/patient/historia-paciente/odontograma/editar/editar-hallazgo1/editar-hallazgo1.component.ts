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

@Component({
  selector: 'app-editar-hallazgo1',
  templateUrl: './editar-hallazgo1.component.html',
  styleUrls: ['./editar-hallazgo1.component.scss']
})
export class EditarHallazgo1Component implements OnInit {
  numeroDiente$:string='';

  constructor(public formBuilder: FormBuilder, private modalService:BsModalService){}

  categoria$?:string;
  diagnostico$?:string;
  form!: FormGroup;
  modalRef!: BsModalRef;
  bsModalRef?: BsModalRef;



  odontogramaPacienteList$:IodontogramaPaciente[]=[];

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
    this.modalRef = this.modalService.show(this.myModal,  { backdrop: false});

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
    }else if(hallazgo==='caries'){
      this.modalRef.hide();
      const initialState ={
      numeroDiente$:numeroDiente,
      hallazgo$:hallazgo
      }


      this.bsModalRef = this.modalService.show(AgregarHallazgo2Component, { initialState});

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
    else if(hallazgo==='puente'){
      this.modalRef.hide();
      const initialState ={
      numeroDiente$:numeroDiente,
      hallazgo$:hallazgo
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
    else if(hallazgo==='Restauracion Definitiva'){
      this.modalRef.hide();
      const initialState ={
      numeroDiente$:numeroDiente,
      hallazgo$:hallazgo
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

  }



}
