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
  rol!: Iroles;
  rolSeleccionada?: string;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private rolesService: RolesService, 
    public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.rolesService.obtenerRol(this.rolSeleccionada!).subscribe(rol => {
      this.rol = rol;
      this.form.patchValue({
        nombre: this.rol.nombre,
        estado: this.rol.estado == '1' ? 'Activo' : 'Inactivo',
      });
    })
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

  guardarRol() {
    if (!this.rol || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const rolActualizada: Iroles = {
      rolId: this.rol.rolId,
      nombre: this.form.value.nombre,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };
    
    this.rol.nombre = this.form.get("nombre")?.value;
    this.rolesService.actualizarRol(this.rol ||rolActualizada).subscribe(
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

