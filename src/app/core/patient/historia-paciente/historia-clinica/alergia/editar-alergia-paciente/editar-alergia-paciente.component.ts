import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { DataAlergias, Ialergias } from 'src/app/shared/models/alergia';
import { updatePacienteAlergia } from 'src/app/shared/models/paciente-alergia';
import { AlergiasService } from 'src/app/shared/services/alergias.service';
import { PacienteAlergiaService } from 'src/app/shared/services/paciente-alergia.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar-alergia-paciente',
  templateUrl: './editar-alergia-paciente.component.html',
  styleUrls: ['./editar-alergia-paciente.component.scss']
})
export class EditarAlergiaPacienteComponent implements OnInit{
  pacienteAlergiaEditado$: Subject<boolean> = new Subject<boolean>();
  form!: FormGroup;
  constructor(public bsModalRef: BsModalRef, public alergiaService: AlergiasService,public fb: FormBuilder, public pacienteAlergiaService:PacienteAlergiaService ){
    this.form = this.fb.group({
      alergiaId:['', [Validators.required]],
      observacion:['']
    })
  }
  ListAlergias: Array<Ialergias> = [];
  pacienteAlergiaId?: string;
  alergiaId?:string;
  observacion?: string;
  isFormSubmitted = false;

  pacienteAlergiaClass:updatePacienteAlergia = new updatePacienteAlergia();

  ngOnInit(): void {
    this.obtenerListaAlergias();
   this.pacienteAlergiaId

   this.form.patchValue({
    alergiaId: this.alergiaId,
    observacion: this.observacion
   })


  }
  private obtenerListaAlergias(): void {
    this.ListAlergias = [];

    this.alergiaService.obtenerListaAlergias().subscribe((data: Ialergias[]) => {

      this.ListAlergias = data;
      console.log(this.ListAlergias)
    });

  }

  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }


  actualizarPacienteAlergia(){

    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.isTouched()
      return;
    }
    this.isFormSubmitted = true;


    this.pacienteAlergiaClass.pacienteAlergiaId = this.pacienteAlergiaId;
    this.pacienteAlergiaClass.observacion = this.form.get('observacion')?.value;
    this.pacienteAlergiaClass.alergiaId=this.form.get('alergiaId')?.value;

    console.log("peticion:",this.pacienteAlergiaClass)
    this.pacienteAlergiaService.actualizarPacienteAlergia(this.pacienteAlergiaClass).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.pacienteAlergiaEditado$.next(true);
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
    this.pacienteAlergiaEditado$.next(false);
    this.bsModalRef.hide()
  }




}
