import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TipoPago } from 'src/app/shared/models/tipopago';
import { TipoPagoService } from 'src/app/shared/services/tipo-pago.service';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-tipo-pago',
  templateUrl: './agregar-tipo-pago.component.html',
  styleUrls: ['./agregar-tipo-pago.component.scss']
})
export class AgregarTipoPagoComponent {
  public routes = routes;
  TipoPago: TipoPago = new TipoPago();
  form!: FormGroup;
  public mostrarErrores = false;
  tipopagoAgregado$: Subject<boolean> = new Subject<boolean>();

  constructor(public bsModalRef: BsModalRef, private tipoPagoService: TipoPagoService,
    public fb: FormBuilder) {
    this.form = this.fb.group({
      metodoPago: ['', Validators.required],
      descripcion: ['', Validators.required],
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
    this.tipopagoAgregado$.next(false);
    this.bsModalRef.hide()
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

    this.TipoPago.metodoPago = this.form.get("metodoPago")?.value;
    this.TipoPago.descripcion = this.form.get("descripcion")?.value;

    this.tipoPagoService.crearTipoPago(this.TipoPago).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire('Correcto', response.message, 'success');
          this.bsModalRef.hide();
          this.tipopagoAgregado$.next(true);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}
