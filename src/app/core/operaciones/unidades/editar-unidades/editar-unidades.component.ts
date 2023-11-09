import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Iunidad } from 'src/app/shared/models/unidades';
import { routes } from 'src/app/shared/routes/routes';
import { UnidadesService } from 'src/app/shared/services/unidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-unidades',
  templateUrl: './editar-unidades.component.html',
  styleUrls: ['./editar-unidades.component.scss']
})
export class EditarUnidadesComponent implements OnInit {
  unidadSeleccionada: Iunidad | null = null;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private unidadService: UnidadesService, public fb: FormBuilder) {
    this.form = this.fb.group({
      siglas: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    if (this.unidadSeleccionada) {
      this.form.patchValue({
        siglas: this.unidadSeleccionada.siglas,
        descripcion: this.unidadSeleccionada.descripcion,
        estado: this.unidadSeleccionada.estado,
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

  guardarUnidad() {
    if (!this.unidadSeleccionada || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
  
    const unidadActualizada: Iunidad = {
      unidadId: this.unidadSeleccionada.unidadId,
      nombre: this.form.value.nombre,
      siglas: this.form.value.siglas,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado,
    };
  
    this.unidadService.actualizarUnidad(unidadActualizada).subscribe(
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