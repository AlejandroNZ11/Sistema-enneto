import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ITipoPago } from 'src/app/shared/models/tipopago';
import { routes } from 'src/app/shared/routes/routes';
import { TipoPagoService } from 'src/app/shared/services/tipo-pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tipo-pago',
  templateUrl: './editar-tipo-pago.component.html',
  styleUrls: ['./editar-tipo-pago.component.scss']
})
export class EditarTipoPagoComponent implements OnInit {
  tipoPagoSeleccionado: ITipoPago | null = null;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private tipoPagoService: TipoPagoService, public fb: FormBuilder) {
    this.form = this.fb.group({
      metodoPago: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    if (this.tipoPagoSeleccionado) {
      this.form.patchValue({
        metodoPago: this.tipoPagoSeleccionado.metodoPago,
        descripcion: this.tipoPagoSeleccionado.descripcion,
        estado: this.tipoPagoSeleccionado.estado,
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

  guardarTipoPago() {
    if (!this.tipoPagoSeleccionado || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
  
    const tipoPagoActualizado: ITipoPago = {
      tipoPagoId: this.tipoPagoSeleccionado.tipoPagoId,
      metodoPago: this.form.value.metodoPago,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado,
    };
  
    this.tipoPagoService.actualizarTipoPago(tipoPagoActualizado).subscribe(
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
