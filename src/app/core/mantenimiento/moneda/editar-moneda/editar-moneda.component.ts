import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IMoneda } from 'src/app/shared/models/moneda';
import { routes } from 'src/app/shared/routes/routes';
import { MonedaService } from 'src/app/shared/services/moneda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-moneda',
  templateUrl: './editar-moneda.component.html',
  styleUrls: ['./editar-moneda.component.scss']
})
export class EditarMonedaComponent implements OnInit {
  monedaSeleccionada: IMoneda | null = null;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private monedaService: MonedaService, public fb: FormBuilder) {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    if (this.monedaSeleccionada) {
      this.form.patchValue({
        descripcion: this.monedaSeleccionada.descripcion,
        estado: this.monedaSeleccionada.estado,
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

  guardarMoneda() {
    if (!this.monedaSeleccionada || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }

    const monedaActualizada: IMoneda = {
      monedaId: this.monedaSeleccionada.monedaId,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado,
    };

    this.monedaService.actualizarMoneda(monedaActualizada).subscribe(
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
