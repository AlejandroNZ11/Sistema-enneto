import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
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
  tipopagoEditada$: Subject<boolean> = new Subject<boolean>();
  tipoPago!: ITipoPago;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tipoPagoSeleccionado: any;
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
    this.tipoPagoService.obtenerTipoPago(this.tipoPagoSeleccionado!).subscribe(tipoPago => {
      this.tipoPago = tipoPago;
      this.form.patchValue({
        metodoPago: this.tipoPago.metodoPago,
        descripcion: this.tipoPago.descripcion,
        estado: this.tipoPago.estado == '1' ? 'Activo' : 'Inactivo',
      });
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
    this.tipopagoEditada$.next(false);
    this.bsModalRef.hide();
  }

  guardarTipoPago() {
    if (!this.tipoPago || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const tipoPagoActualizado: ITipoPago = {
      tipoPagoId: this.tipoPago.tipoPagoId,
      metodoPago: this.form.value.metodoPago,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.tipoPagoService.actualizarTipoPago(tipoPagoActualizado).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
          this.tipopagoEditada$.next(true);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}
