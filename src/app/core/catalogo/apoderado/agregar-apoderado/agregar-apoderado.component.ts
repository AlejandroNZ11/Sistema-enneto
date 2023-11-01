import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Apoderado } from 'src/app/shared/models/apoderado';
import { ApoderadoService } from 'src/app/shared/services/apoderado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-apoderado',
  templateUrl: './agregar-apoderado.component.html',
  styleUrls: ['./agregar-apoderado.component.scss']
})
export class AgregarApoderadoComponent {

  apoderado: Apoderado = new Apoderado();
  form!: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private apoderadoService: ApoderadoService,
    public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      documento: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
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

  Cancelar() {
    this.bsModalRef.hide()
  }

  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  crearApoderado() {
    if (this.form.invalid) {
      this.isTouched()
      return;
    }
    this.apoderado.nombre = this.form.get("nombre")?.value;
    this.apoderado.tipoDocumento = this.form.get("tipoDocumento")?.value;
    this.apoderado.documento = this.form.get("documento")?.value;
    this.apoderado.direccion = this.form.get("direccion")?.value;
    this.apoderado.telefono = this.form.get("telefono")?.value;

    console.log('Datos enviados:', this.apoderado);

    this.apoderadoService.crearApoderado(this.apoderado).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error('Error al crear apoderado:', error);
        console.error('Cuerpo de la respuesta del error:', error.error);
      });
  }
}
