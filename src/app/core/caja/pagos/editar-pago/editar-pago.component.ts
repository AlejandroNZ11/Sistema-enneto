import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
//import { PagosListData, PagosRequest, PagosResponse } from 'src/app/shared/models/pagos';
import { routes } from 'src/app/shared/routes/routes';
import { PagosService } from 'src/app/shared/services/pagos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-pago',
  templateUrl: './editar-pago.component.html',
  styleUrls: ['./editar-pago.component.scss']
})
export class EditarPagoComponent implements OnInit {
  PagoSeleccionada?: string;
  //Pago!: PagosResponse;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }
  constructor(public bsModalRef: BsModalRef, private pagosService: PagosService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      monto: ['', Validators.required],
      numeroPago: ['', Validators.required],
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
  guardarPago() {
    //this.pagosService.actualizarPago(this.Pago, this.pagoSeleccionada).subscribe(
     // (response) => {
      //  if (response.isSuccess) {
       //   Swal.fire(response.message, '', 'success');
       //   this.bsModalRef.hide();
       // } else {
       //   console.error(response.message);
      //  }
     // },
    //  (error) => {
      //  console.error(error);
     // });
  }
}
