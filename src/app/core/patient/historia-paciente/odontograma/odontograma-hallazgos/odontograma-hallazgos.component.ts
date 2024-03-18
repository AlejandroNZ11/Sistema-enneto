import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { OdontogramaService } from 'src/app/shared/services/odontograma.service';
import { SharedService } from '../../services/shared-service.service';
import { IHallazgo, hallazgoRequest, siglasHallazgo } from 'src/app/shared/models/hallazgoOdontograma';
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
  hallazgoSeleccionado$!: IHallazgo;
  siglaSeleccionada$!: siglasHallazgo;
  tipoHallazgo:string='';
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
      siglaHallazgo:[{value:'', disabled:true},[Validators.required]],
      numeroDiente: [{ value: '', disabled: true },[Validators.required]],
      especificacion: ['', []],

    })

    if(this.siglaSeleccionada$){
      this.form.patchValue({
        hallazgoNombre:this.hallazgoSeleccionado$.nombre,
        numeroDiente:this.numeroDiente$,
        siglaHallazgo:this.siglaSeleccionada$.sigla,
      })
    }
    else{
      this.form.patchValue({
        hallazgoNombre:this.hallazgoSeleccionado$.nombre,
        numeroDiente:this.numeroDiente$,
        siglaHallazgo:"II"
      })
    }


  }

  agregarHallazgo(){

    this.hallazgoR.pacienteId = this.pacienteId;
    this.hallazgoR.tipo = this.tipoHallazgo;
    this.hallazgoR.hallazgos.push(this.hallazgoSeleccionado$.hallazgoId);
    this.hallazgoR.categoria = this.hallazgoSeleccionado$.tipo;
    this.hallazgoR.numeroDiente =  parseInt(this.numeroDiente$);
    this.hallazgoR.especificacion = this.form.get('especificacion')?.value;
    this.hallazgoR.sigla = this.form.get('siglaHallazgo')?.value;



    console.log(this.hallazgoR);

    Swal.fire('Procesando')
          Swal.showLoading()

    this.odontogramaService.agregarOdontogramaPaciente(this.hallazgoR).subscribe(
      (response)=>{
        Swal.close();
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
