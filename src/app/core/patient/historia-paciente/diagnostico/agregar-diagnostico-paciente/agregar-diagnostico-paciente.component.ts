import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-diagnostico-paciente',
  templateUrl: './agregar-diagnostico-paciente.component.html',
  styleUrls: ['./agregar-diagnostico-paciente.component.scss']
})
export class AgregarDiagnosticoPacienteComponent {
  categoriaAgregada$: Subject<boolean> = new Subject<boolean>();
  form!: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      codigoEnfermedad: ['', Validators.required],
      estado: ['', Validators.required],
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
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  crearCategoria(){
    if (this.form.invalid) {
      this.isTouched()
      return;
    }
    console.log('Categoria Creada')
  }

  Cancelar() {
    this.categoriaAgregada$.next(false);
    this.bsModalRef.hide()
  }

}
