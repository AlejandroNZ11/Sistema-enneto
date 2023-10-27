import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApoderadoService } from 'src/app/shared/services/apoderado.service';
import { Apoderado } from 'src/app/shared/models/apoderado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-apoderado',
  templateUrl: './agregar-apoderado.component.html',
  styleUrls: ['./agregar-apoderado.component.scss']
})
export class AgregarApoderadoComponent {

  public form!: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private apoderadoService: ApoderadoService,
    public fb: FormBuilder) {
    this.form = this.fb.group({
      apoderadoId: [''],
      nombre: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      documento: ['', Validators.required],
      direccion: [''],
      telefono: [''],
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
    const nuevoApoderado = new Apoderado();
    nuevoApoderado.apoderadoId = this.form.get('apoderadoId')?.value,
    nuevoApoderado.nombre = this.form.get("nombre")?.value;
    nuevoApoderado.tipoDocumento = this.form.get("tipoDocumento")?.value;
    nuevoApoderado.documento = this.form.get("documento")?.value;
    nuevoApoderado.direccion = this.form.get("direccion")?.value;
    nuevoApoderado.telefono = this.form.get("telefono")?.value;

    this.apoderadoService.crearApoderado(nuevoApoderado).subscribe(
        (response) => {
            if (response.isSuccess) {
                Swal.fire(response.message, '', 'success');
                this.bsModalRef.hide();
            } else {
                console.error(response.message);
            }
        },
        (error) => {
            console.error(error);
        }
    );
  }
}
