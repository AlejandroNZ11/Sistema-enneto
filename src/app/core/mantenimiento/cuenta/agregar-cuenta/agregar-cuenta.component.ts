import { Component, OnInit, Renderer2  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {  cuenta } from 'src/app/shared/models/cuenta';
import { routes } from 'src/app/shared/routes/routes';
import { CuentaService } from 'src/app/shared/services/cuenta.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-cuenta',
  templateUrl: './agregar-cuenta.component.html',
  styleUrls: ['./agregar-cuenta.component.scss']
})
export class AgregarCuentaComponent implements OnInit{
  cuentaAgregada$: Subject<boolean> = new Subject<boolean>();
  Cuenta: cuenta = new cuenta();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(
    private renderer: Renderer2, 
    public bsModalRef: BsModalRef, 
    private cuentaService: CuentaService,
    public fb: FormBuilder,
    ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      total: ['', Validators.required],
    });
  }
  
  validarInput(event: any) {
    const inputValue = event.target.value;
    const maxValueLength = 9;
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
    this.cuentaAgregada$.next(false);
    this.bsModalRef.hide();
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
    this.Cuenta.total= this.form.get("total")?.value;
    console.log(this.Cuenta);
    this.cuentaService.crearCuenta(this.Cuenta).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.cuentaAgregada$.next(true);
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
