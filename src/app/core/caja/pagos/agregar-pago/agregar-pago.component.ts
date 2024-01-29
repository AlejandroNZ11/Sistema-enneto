import { Component, OnInit } from '@angular/core';
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
export class AgregarPagoComponent implements OnInit {
  //Pago: PagosRequest = new PagosRequest();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private pagosService: PagosService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      fechaRegistro: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
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
    this.bsModalRef.hide()
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearPago() {
    
  }
}
