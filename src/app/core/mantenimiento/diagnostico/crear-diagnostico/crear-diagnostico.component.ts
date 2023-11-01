import { Component } from '@angular/core';
import {routes } from 'src/app/shared/routes/routes';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DiagnosticoService } from 'src/app/shared/services/diagnostico.service';
import { diagnostico } from 'src/app/shared/models/diagnostico';

@Component({
  selector: 'app-crear-diagnostico',
  templateUrl: './crear-diagnostico.component.html',
  styleUrls: ['./crear-diagnostico.component.scss']
})
export class CrearDiagnosticoComponent {
  constructor(public bsModalRef: BsModalRef,public fb: FormBuilder,private DiagnosticoService :DiagnosticoService) { 
  }
  Diagnostico: diagnostico = new diagnostico();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
  Cancelar() {
    this.bsModalRef.hide()
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearDiagnostico() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Diagnostico.nombre = this.form.get("nombre")?.value;
    this.Diagnostico.diagnostico = this.form.get("descripcion")?.value;
    console.log(this.Diagnostico);
    this.DiagnosticoService.crearDiagnostico(this.Diagnostico).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.error(error);
      });
  }
}
