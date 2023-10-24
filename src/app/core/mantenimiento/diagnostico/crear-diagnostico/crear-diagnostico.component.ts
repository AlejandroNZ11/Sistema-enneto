import { Component } from '@angular/core';
import {routes } from 'src/app/shared/routes/routes';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-diagnostico',
  templateUrl: './crear-diagnostico.component.html',
  styleUrls: ['./crear-diagnostico.component.scss']
})
export class CrearDiagnosticoComponent {
  constructor(public bsModalRef: BsModalRef,public fb: FormBuilder) { 
  }
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  Cancelar() {
    this.bsModalRef.hide();
  }
  agregarProducto()
  {
    
  }
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
