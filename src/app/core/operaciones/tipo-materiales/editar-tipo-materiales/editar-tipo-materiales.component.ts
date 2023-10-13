import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Itipomateriales } from 'src/app/shared/models/tipo-materiales';
import { routes } from 'src/app/shared/routes/routes';
import { TipomaterialesService } from 'src/app/shared/services/tipo-materiales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tipo-materiales',
  templateUrl: './editar-tipo-materiales.component.html',
  styleUrls: ['./editar-tipo-materiales.component.scss']
})
export class EditarTipoMaterialesComponent implements OnInit {
  tipomaterialesSeleccionada: Itipomateriales | null = null;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private tipomaterialesService: TipomaterialesService, public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required], 
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    if (this.tipomaterialesSeleccionada) {
      this.form.patchValue({
        nombre: this.tipomaterialesSeleccionada.nombre,
        descripcion: this.tipomaterialesSeleccionada.descripcion,
        estado: this.tipomaterialesSeleccionada.estado,
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

  guardarTipomateriales() {
    if (!this.tipomaterialesSeleccionada || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
  
    const tipomaterialesActualizada: Itipomateriales = {
      tipomaterialesId: this.tipomaterialesSeleccionada.tipomaterialesId,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado,
    };
  
    this.tipomaterialesService.actualizarTipomateriales(tipomaterialesActualizada).subscribe(
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