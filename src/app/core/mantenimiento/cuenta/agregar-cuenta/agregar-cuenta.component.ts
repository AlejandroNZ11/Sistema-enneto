import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {  cuenta } from 'src/app/shared/models/cuenta';
import { routes } from 'src/app/shared/routes/routes';
import { CuentaService } from 'src/app/shared/services/cuenta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-cuenta',
  templateUrl: './agregar-cuenta.component.html',
  styleUrls: ['./agregar-cuenta.component.scss']
})
export class AgregarCuentaComponent implements OnInit{

  Cuenta: cuenta = new cuenta();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private cuentaService: CuentaService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      total: ['', Validators.required],
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
  crearCuenta() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Cuenta.nombre = this.form.get("nombre")?.value;
    console.log(this.Cuenta);
    this.cuentaService.crearCuenta(this.Cuenta).subscribe(
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
