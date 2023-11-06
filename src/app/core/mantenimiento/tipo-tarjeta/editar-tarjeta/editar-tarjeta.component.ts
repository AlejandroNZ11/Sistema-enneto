
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ITipoTarjeta } from 'src/app/shared/models/tipotarjeta';
import { routes } from 'src/app/shared/routes/routes';
import { TipoTarjetaService } from 'src/app/shared/services/tipo-tarjeta.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-tarjeta',
  templateUrl: './editar-tarjeta.component.html',
  styleUrls: ['./editar-tarjeta.component.scss']
})
export class EditarTarjetaComponent implements OnInit {
  tipoTarjetaSeleccionado: ITipoTarjeta | null = null;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private tipoTarjetaService: TipoTarjetaService, public fb: FormBuilder) {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      estado: [, Validators.required],
    });
  }

  ngOnInit() {
    if (this.tipoTarjetaSeleccionado) {
      this.form.patchValue({
        descripcion: this.tipoTarjetaSeleccionado.descripcion,
        estado: this.tipoTarjetaSeleccionado.estado,
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

  guardarTipoTarjeta() {
    if (!this.tipoTarjetaSeleccionado || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }

    const tipoTarjetaActualizado: ITipoTarjeta = {
      tipoTarjetaId: this.tipoTarjetaSeleccionado.tipoTarjetaId,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado,
    };

    this.tipoTarjetaService.actualizarTipoTarjeta(tipoTarjetaActualizado).subscribe(
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
