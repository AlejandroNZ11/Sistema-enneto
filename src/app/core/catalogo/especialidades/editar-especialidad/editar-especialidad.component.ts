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
  especialidadSeleccionada: Iespecialidad | null = null;
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
    if (this.especialidadSeleccionada) {
      this.form.patchValue({
        nombre: this.especialidadSeleccionada.nombre,
        descripcion: this.especialidadSeleccionada.descripcion,
        estado: this.especialidadSeleccionada.estado,
      });
    }
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

  guardarCategoria() {
    if (!this.especialidadSeleccionada || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
  
    const especialidadActualizada: Iespecialidad = {
      especialidadId: this.especialidadSeleccionada.especialidadId,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado,
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