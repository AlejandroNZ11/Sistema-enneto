import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { OdontogramaService } from 'src/app/shared/services/odontograma.service';
import { SharedService } from '../../services/shared-service.service';
import { hallazgoRequest } from 'src/app/shared/models/hallazgoOdontograma';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-odontograma-hallazgos',
  templateUrl: './odontograma-hallazgos.component.html',
  styleUrls: ['./odontograma-hallazgos.component.scss']
})
export class OdontogramaHallazgosComponent implements OnInit{


  hallazgoAgregado$: Subject<boolean> = new Subject<boolean>();
  // hallazgo$?:string;
  numeroDiente$:string='';
  hallazgoTipo$:string='';
  hallazgoNombre$?:string;
  hallazgoId$:number=0;

  hallazgoR:hallazgoRequest = new hallazgoRequest();


  constructor(public bsModalRef: BsModalRef,private sharedService: SharedService, private odontogramaService:OdontogramaService, public formBuilder: FormBuilder){}


  pacienteId = "";
  form!: FormGroup;
  isFormSubmitted = false;

  ngOnInit(): void {
    this.sharedService.pacientID.subscribe((id)=>{
      this.pacienteId = id
    })

    this.form = this.formBuilder.group({

      hallazgoNombre: [{ value: '', disabled: true }, [Validators.required]],
      numeroDiente: [{ value: '', disabled: true },[Validators.required]],
      especificacion: ['', []],

    })

    this.form.patchValue({
      hallazgoNombre:this.hallazgoNombre$,
      numeroDiente:this.numeroDiente$,
    })
  }

  agregarHallazgo(){

    this.hallazgoR.pacienteId = this.pacienteId;
    this.hallazgoR.tipo = this.hallazgoTipo$;
    this.hallazgoR.hallazgoId = this.hallazgoId$;
    this.hallazgoR.categoria = this.hallazgoTipo$;
    this.hallazgoR.numeroDiente =  parseInt(this.numeroDiente$);
    this.hallazgoR.especificacion = this.form.get('especificacion')?.value;


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

  cancelar() {
    this.hallazgoAgregado$.next(false);
    this.bsModalRef.hide()
  }

}
