import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Icuenta } from 'src/app/shared/models/cuenta';
import { routes } from 'src/app/shared/routes/routes';
import { CuentaService } from 'src/app/shared/services/cuenta.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.scss']
})
export class EditarCuentaComponent implements OnInit {
  cuentaEditada$: Subject<boolean> = new Subject<boolean>();
  cuentaSeleccionada: any;
  cuenta!: Icuenta;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(
    public bsModalRef: BsModalRef, 
    private renderer: Renderer2, 
    private cuentaService: CuentaService, 
    public fb: FormBuilder,
    ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      total: ['', Validators.required],
      estado: ['Activo', Validators.required],
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
  ngOnInit() {
    this.cuentaService.obtenerCuenta(this.cuentaSeleccionada!).subscribe(cuenta=> {
      this.cuenta=cuenta;
      this.form.patchValue({
        nombre: this.cuenta.nombre,
        total: this.cuenta.total,
        estado: this.cuenta.estado == '1' ? 'Activo' : 'Inactivo',
      });
    })
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
    this.cuentaEditada$.next(false);
    this.bsModalRef.hide();
  }

  guardarCuenta() {
    if (!this.cuenta || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const cuentaActualizada: Icuenta = {
      cuentaPagarId: this.cuenta.cuentaPagarId,
      nombre: this.form.value.nombre,
      total: this.form.value.total,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };
    
    this.cuentaService.actualizarCuenta(cuentaActualizada).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.cuentaEditada$.next(true);
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