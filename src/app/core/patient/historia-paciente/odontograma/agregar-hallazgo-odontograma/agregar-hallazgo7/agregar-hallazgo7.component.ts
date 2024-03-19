import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { OdontogramaService } from 'src/app/shared/services/odontograma.service';
import { SharedService } from '../../../services/shared-service.service';
import { IHallazgo, hallazgoRequest, siglasHallazgo } from 'src/app/shared/models/hallazgoOdontograma';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-hallazgo7',
  templateUrl: './agregar-hallazgo7.component.html',
  styleUrls: ['./agregar-hallazgo7.component.scss']
})
export class AgregarHallazgo7Component implements OnInit{


  hallazgoAgregado$: Subject<boolean> = new Subject<boolean>();
  hallazgo$:string='';
  hallazgoId$:number=0;
  hallazgoNombre$:string ='';
  numeroDiente$:string='';
  siglas$:string[]=[];
  siglaSeleccionada$!:siglasHallazgo;
  hallazgoSeleccionado$!: IHallazgo;
  tipoHallazgo:string='';


  estados:any[]=[{
    name:'Buen Estado',value:1
  },
  {
    name:'Mal Estado',value:0
  }
];

  pacienteId = "";
  form!: FormGroup;
  isFormSubmitted = false;

  constructor(public bsModalRef: BsModalRef,private sharedService: SharedService, private odontogramaService:OdontogramaService, public formBuilder: FormBuilder){}

  hallazgoR:hallazgoRequest = new hallazgoRequest();

  ngOnInit(): void {
    this.sharedService.pacientID.subscribe((id)=>{
      this.pacienteId = id
    })

    this.form = this.formBuilder.group({

      sigla: ['',this.validarSiglaRequerida()],
      hallazgoNombre:[{ value: '', disabled: true }, ],
      siglaHallazgo:[{ value: '', disabled: true }, ],
      numeroDiente: [{ value: '', disabled: true }],
      estado:['', [Validators.required]],
      especificacion: [''],

    })

    if(this.siglaSeleccionada$!=undefined){
      this.form.patchValue({
        numeroDiente:this.numeroDiente$,
        hallazgoNombre: `${this.siglaSeleccionada$.sigla }: ${this.siglaSeleccionada$.nombre}`,
        siglaHallazgo:this.siglaSeleccionada$.sigla,
      })
    }
    else{
      this.form.patchValue({
        numeroDiente:this.numeroDiente$,
        hallazgoNombre: `${this.hallazgoSeleccionado$.siglas }: ${this.hallazgoSeleccionado$.nombre}`,
        siglaHallazgo:this.hallazgoSeleccionado$.siglas,

      })
    }

  }
  validarSiglaRequerida() {
    return (control:any) => {
      if (this.hallazgoId$===(3) || this.hallazgoId$===(27)) { // Reemplaza "this.condicion" por tu condición real
        return Validators.required(control);
      }
      return null;
    };
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
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

    this.hallazgoR.pacienteId = this.pacienteId;
    this.hallazgoR.tipo = this.tipoHallazgo;
    this.hallazgoR.hallazgos.push(this.hallazgoSeleccionado$.hallazgoId);
    this.hallazgoR.categoria = this.hallazgoSeleccionado$.tipo;
    this.hallazgoR.estadoHallazgo = this.form.get('estado')?.value;
    this.hallazgoR.numeroDiente = parseInt(this.numeroDiente$);
    this.hallazgoR.sigla = this.form.get('siglaHallazgo')?.value.substring(0,2);
    this.hallazgoR.especificacion = this.form.get('especificacion')?.value


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
