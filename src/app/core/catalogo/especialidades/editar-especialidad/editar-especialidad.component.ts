import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Iespecialidad } from 'src/app/shared/models/especialidades';
import { routes } from 'src/app/shared/routes/routes';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-especialidad',
  templateUrl: './editar-especialidad.component.html',
  styleUrls: ['./editar-especialidad.component.scss']
})
export class EditarEspecialidadComponent implements OnInit {
  especialidad!: Iespecialidad;
  especialidadSeleccionada ?:string;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private especialidadService: EspecialidadesService, public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.especialidadService.obtenerEspecialidad(this.especialidadSeleccionada!).subscribe(especialidad => {
      this.especialidad = especialidad;
      this.form.patchValue({
        nombre: this.especialidad.nombre,
        descripcion: this.especialidad.descripcion,
        estado: this.especialidad.estado == '1' ? 'Activo' : 'Inactivo',
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

  guardarEspecialidad() {
    if (!this.especialidad || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const especialidadActualizada: Iespecialidad = {
      especialidadId: this.especialidad.especialidadId,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.especialidadService.actualizarEspecialidad(especialidadActualizada).subscribe(
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