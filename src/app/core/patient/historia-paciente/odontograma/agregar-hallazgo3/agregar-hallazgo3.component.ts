import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { SharedService } from '../../services/shared-service.service';
import { hallazgoRequest } from 'src/app/shared/models/hallazgoOdontograma';
import { OdontogramaService } from 'src/app/shared/services/odontograma.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-hallazgo3',
  templateUrl: './agregar-hallazgo3.component.html',
  styleUrls: ['./agregar-hallazgo3.component.scss']
})
export class AgregarHallazgo3Component implements OnInit{

  dientesSuperior: string[] = ['18', '17', '16', '15', '14', '13', '12', '11', '21', '22', '23', '24', '25', '26', '27', '28'];
  dientesInferior: string[] = ['48', '47', '46', '45', '44', '43', '42', '41', '31', '32', '33', '34', '35', '36', '37', '38']

  numerosMostrar: string[] = [];
  numeroSeleccionado: string = '';


  llenarSelect(): void {
    if(this.dientesSuperior.includes(this.numeroDiente$)){
      const indice = this.dientesSuperior.findIndex(num => num=== this.numeroDiente$);
      if (indice !== -1) {
        this.numerosMostrar = this.dientesSuperior.slice(indice + 1);
      } else {
        this.numerosMostrar = [];
      }
    }
    else if(this.dientesInferior.includes(this.numeroDiente$)){

      const indice = this.dientesInferior.findIndex(num => num=== this.numeroDiente$);
      if (indice !== -1) {
        this.numerosMostrar = this.dientesInferior.slice(indice + 1);
      } else {
        this.numerosMostrar = [];
      }
    }
    else{
      return;
    }

  }

  hallazgoAgregado$: Subject<boolean> = new Subject<boolean>();
  numeroDiente$:string='';
  hallazgoNombre$?:string;
  hallazgoTipo$:string='';
  hallazgoId$:number=0;

  estados_list= [
    { name: 'Buen Estado', value: 1, checked: false },
    { name: 'Mal Estado', value: 0, checked: false },
  ]
  form!: FormGroup;
  isFormSubmitted = false;
  pacienteId = "";

  hallazgoR:hallazgoRequest = new hallazgoRequest();


  constructor(public bsModalRef: BsModalRef, private sharedService: SharedService,public formBuilder: FormBuilder,  private odontogramaService:OdontogramaService){}



  ngOnInit(): void {
    this.sharedService.pacientID.subscribe((id)=>{
      this.pacienteId = id
    })


    this.form = this.formBuilder.group({
      hallazgoNombre: [{ value: '', disabled: true }, [Validators.required]],
      estado:['',[Validators.required]],
      desdePieza:[{ value: '', disabled: true },[Validators.required]],
      hastaPieza:['',[Validators.required]],
      especificacion: ['', []],

    })

    this.form.patchValue({
      hallazgoNombre:this.hallazgoNombre$,
      desdePieza:this.numeroDiente$,
    })

    this.llenarSelect();

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
      this.hallazgoR.tipo = this.hallazgoTipo$;
      this.hallazgoR.halllazgoId = this.hallazgoId$;
      this.hallazgoR.categoria = this.hallazgoTipo$;
      this.hallazgoR.numeroDiente =  parseInt(this.numeroDiente$);
      this.hallazgoR.dienteFinal = this.form.get('hastaPieza')?.value;
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
