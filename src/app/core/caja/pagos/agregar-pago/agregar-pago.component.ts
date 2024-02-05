import { Component, OnInit, Renderer2  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataPago, Pago, Ipago } from 'src/app/shared/models/pagos';
import { routes } from 'src/app/shared/routes/routes';
import { PagosService } from 'src/app/shared/services/pagos.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-pago.component.html',
  styleUrls: ['./agregar-pago.component.scss']
})
export class AgregarPagoComponent {
  pagoAgregada$: Subject<boolean> = new Subject<boolean>();
  Pago: Pago = new Pago();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;

  ngOnInit(): void { }

  constructor(
    public bsModalRef: BsModalRef, 
    private renderer: Renderer2,
    private pagosService: PagosService,
    public fb: FormBuilder,
    ) {
    this.form = this.fb.group({
      numeroPago: ['', Validators.required],
      estadoPago: ['', Validators.required],
      fechaRegistro: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      monto: ['', Validators.required],
    });
  }

  validarInput(event: any) {
    const inputValue = event.target.value;

    if (isNaN(inputValue)) {
      const newValue = inputValue.slice(0, -1);
      this.renderer.setProperty(event.target, 'value', newValue);
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
    this.pagoAgregada$.next(false);
    this.bsModalRef.hide()
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearPago() {
    if (this.form.invalid) {
      this.isTouched()
      return;
    }
    this.Pago.numeroPago = this.form.get("numeroPago")?.value;
    this.Pago.estadoPago = 1
    this.Pago.fechaRegistro = this.form.get("fechaRegistro")?.value;
    this.Pago.fechaVencimiento = this.form.get("fechaVencimiento")?.value;
    this.Pago.monto = this.form.get("monto")?.value;
    console.log(this.Pago);
    this.pagosService.crearPago(this.Pago).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.pagoAgregada$.next(true);
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
