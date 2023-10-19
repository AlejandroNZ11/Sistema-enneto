import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { RolesService } from 'src/app/shared/services/roles.service';
import { Iroles } from 'src/app/shared/models/rol';

@Component({
  selector: 'app-editar-roles',
  templateUrl: './editar-roles.component.html',
  styleUrls: ['./editar-roles.component.scss']
})
export class EditarRolesComponent  implements OnInit{
  rolSeleccionada: Iroles | null = null;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void {
    if (this.rolSeleccionada) {
      this.form.patchValue({
        nombre: this.rolSeleccionada.nombre,
        estado: this.rolSeleccionada.estado,
      });
    }
   }
  constructor(public bsModalRef: BsModalRef,private rolesService: RolesService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['Activo', Validators.required],
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
  guardarRol() {
    if (!this.rolSeleccionada || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
  
    const rolActualizada: Iroles = {
      rolesId: this.rolSeleccionada.rolesId,
      nombre: this.form.value.nombre,
      estado: this.form.value.estado,
    };
  
    this.rolesService.actualizarRol(rolActualizada).subscribe(
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

