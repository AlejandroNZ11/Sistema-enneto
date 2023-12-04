import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PagosListData, PagosRequest, PagosResponse } from 'src/app/shared/models/pagos';
import { routes } from 'src/app/shared/routes/routes';
import { PagosService } from 'src/app/shared/services/pagos.service';
import Swal from 'sweetalert2';
import { PagosComponent } from '../pagos.component';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-pago.component.html',
  styleUrls: ['./agregar-pago.component.scss']
})
export class AgregarPagoComponent implements OnInit {
  Pago: PagosRequest = new PagosRequest();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private pagosService: PagosService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      monto: [,Validators.required],
      numeroPago: [,Validators.required],
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
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Pago.monto = parseFloat(this.form.get("monto")?.value);
    this.Pago.numeroPago = parseFloat(this.form.get("numeroPago")?.value);
    this.Pago.fechaRegistro = this.form.get("fechaRegistro")?.value;
    this.Pago.fechaVencimiento = this.form.get("fechaVencimiento")?.value;
    console.log(this.Pago);
    this.pagosService.crearPago(this.Pago).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
        }else{
          console.error(response.message);
          console.log(response);
        }
      },
      (error)=>{
        console.error(error);
      });
  }
}
