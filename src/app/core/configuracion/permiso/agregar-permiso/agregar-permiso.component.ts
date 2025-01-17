import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Permiso } from 'src/app/shared/models/permiso';
import { PermisoService } from 'src/app/shared/services/permiso.service';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-permiso',
  templateUrl: './agregar-permiso.component.html',
  styleUrls: ['./agregar-permiso.component.scss']
})
export class AgregarPermisoComponent {
  public routes = routes;
  permiso: Permiso = new Permiso();
  form!: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private permisoService: PermisoService, public fb: FormBuilder) {
    this.form = this.fb.group({
      modulo: ['', Validators.required],
      cargo: ['', Validators.required],
      read: [false],
      insert: [false],
      update: [false],
      delete: [false]
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
    this.bsModalRef.hide();
  }

  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  crearPermiso() {
    if (this.form.invalid) {
      this.isTouched();
      return;
    }

    this.permiso.modulo = this.form.get('modulo')?.value;
    this.permiso.cargo = this.form.get('cargo')?.value;
    this.permiso.read = this.form.get('read')?.value;
    this.permiso.insert = this.form.get('insert')?.value;
    this.permiso.update = this.form.get('update')?.value;
    this.permiso.delete = this.form.get('delete')?.value;

    this.permisoService.crearPermiso(this.permiso).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error('Error del servicio:', error);
      }
    );
  }
}
