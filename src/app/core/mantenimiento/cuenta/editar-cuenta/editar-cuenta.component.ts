import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Icuenta } from 'src/app/shared/models/cuenta';
import { routes } from 'src/app/shared/routes/routes';
import { CuentaService } from 'src/app/shared/services/cuenta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.scss']
})
export class EditarCuentaComponent implements OnInit {
  cuentaSeleccionada: Icuenta | null = null;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private cuentaService: CuentaService, public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      balance: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    if (this.cuentaSeleccionada) {
      this.form.patchValue({
        nombre: this.cuentaSeleccionada.nombre,
        balance: this.cuentaSeleccionada.balance,
        estado: this.cuentaSeleccionada.estado,
      });
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
    this.bsModalRef.hide();
  }

  guardarCuenta() {
    if (!this.cuentaSeleccionada || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
  
    const cuentaActualizada: Icuenta = {
      cuentaId: this.cuentaSeleccionada.cuentaId,
      nombre: this.form.value.nombre,
      balance: this.form.value.balance,
      estado: this.form.value.estado,
    };
  
    this.cuentaService.actualizarCuenta(cuentaActualizada).subscribe(
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