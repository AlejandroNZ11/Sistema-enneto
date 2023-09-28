import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { tipoPago } from 'src/app/shared/models/tipopago';
import { routes } from 'src/app/shared/routes/routes';
import { TipoPagoService } from 'src/app/shared/services/tipo-pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tipo-pago',
  templateUrl: './agregar-tipo-pago.component.html',
  styleUrls: ['./agregar-tipo-pago.component.scss']
})
export class AgregarTipoPagoComponent {

  TipoPago: tipoPago = new tipoPago();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private tipoPagoService: TipoPagoService, public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['Activo', Validators.required]
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
    this.bsModalRef.hide();
  }

  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  crearTipoPago() {
    if (this.form.invalid) {
      this.isTouched();
      return;
    }
    
    this.TipoPago.nombre = this.form.get("nombre")?.value;
    this.TipoPago.descripcion = this.form.get("descripcion")?.value;
    this.TipoPago.estado = this.form.get("estado")?.value;

    this.tipoPagoService.crearTipoPago(this.TipoPago).subscribe(
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
