/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { tipoCitado } from 'src/app/shared/models/tipoCitado';
import { routes } from 'src/app/shared/routes/routes';
import { TipoCitadoService } from 'src/app/shared/services/tipo-citado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tipo-citado',
  templateUrl: './agregar-tipo-citado.component.html',
  styleUrls: ['./agregar-tipo-citado.component.scss']
})
export class AgregarTipoCitadoComponent implements OnInit{

  tipoCitado: tipoCitado = new tipoCitado();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private service: TipoCitadoService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
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
    this.bsModalRef.hide()
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearTipoCitado() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.tipoCitado.nombre = this.form.get("descripcion")?.value;
    console.log(this.tipoCitado);
    this.service.crearTipoCitado(this.tipoCitado).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.error(error);
      });
  }
}




