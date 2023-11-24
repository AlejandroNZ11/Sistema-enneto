import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IPermiso } from 'src/app/shared/models/permiso';
import { routes } from 'src/app/shared/routes/routes';
import { PermisoService } from 'src/app/shared/services/permiso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-permiso',
  templateUrl: './editar-permiso.component.html',
  styleUrls: ['./editar-permiso.component.scss']
})
export class EditarPermisoComponent implements OnInit {
  permiso: IPermiso| undefined;
  permisoSeleccionado: any;
  public routes = routes;
  form: FormGroup;
  mostrarErrores = false;

  constructor(
    public bsModalRef: BsModalRef,
    private permisoService: PermisoService,
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      modulo: ['', Validators.required],
      cargo: ['', Validators.required],
      read: [1, Validators.required],
      insert: [1, Validators.required],
      update: [1, Validators.required],
      delete: [1, Validators.required],
    });
  }

  ngOnInit() {
    this.cargarDatosPermiso();
  }

  cargarDatosPermiso() {
    this.permisoService.obtenerPermiso(this.permisoSeleccionado).subscribe(permiso => {
      this.permiso = permiso;
      this.form.patchValue({
        modulo: this.permiso.modulo,
        cargo: this.permiso.cargo,
        read: this.permiso.read,
        insert: this.permiso.insert,
        update: this.permiso.update,
        delete: this.permiso.delete,
      });
    });
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control?.touched || this.mostrarErrores);
  }

  Cancelar() {
    this.bsModalRef.hide();
  }

  guardarPermiso() {
    if (!this.permiso || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }

    const permisoActualizado = {
      permisoId: this.permiso.permisoId,
      menuId: this.form.value.modulo,
      rolId: this.form.value.modulo,
      modulo: this.form.value.modulo,
      cargo: this.form.value.cargo,
      read: this.form.value.read,
      insert: this.form.value.insert,
      update: this.form.value.update,
      delete: this.form.value.delete,
    };

    this.permisoService.actualizarPermiso(permisoActualizado).subscribe(
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
      });
  }
}
