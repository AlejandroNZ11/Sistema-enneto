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
  unidadSeleccionada ?: string;
  Unidad!: Iunidad;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private unidadService: UnidadesService, 
    public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      siglas: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit(): void { 
    this.unidadService.obtenerUnidad(this.unidadSeleccionada!).subscribe(unidades => {
    this.Unidad = unidades;
    this.form.patchValue({
      nombre: this.Unidad.nombre,
      siglas: this.Unidad.siglas,
      descripcion: this.Unidad.descripcion,
      estado: this.Unidad.estado== '1' ? 'Activo' : 'Inactivo',
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

  guardarUnidad() {
    if (!this.Unidad || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
  
    const unidadActualizada: Iunidad = {
      unidadId: this.Unidad.unidadId,
      nombre: this.form.value.nombre,
      siglas: this.form.value.siglas,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };
    this.Unidad.nombre = this.form.get("nombre")?.value;
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