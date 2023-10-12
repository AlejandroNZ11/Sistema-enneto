import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataTipoGasto, ITipoGasto, tipoGasto } from 'src/app/shared/models/tipogastos';
import { routes } from 'src/app/shared/routes/routes';
import { TipoGastosService } from 'src/app/shared/services/tipo-gastos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tipo-gastos',
  templateUrl: './agregar-tipo-gastos.component.html',
  styleUrls: ['./agregar-tipo-gastos.component.scss']
})
export class AgregarTipoGastosComponent {

  tipoGasto: tipoGasto = new tipoGasto();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private tipoGastosService: TipoGastosService,
    public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
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

  crearTipoGasto() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.tipoGasto.nombre = this.form.get("nombre")?.value;
    this.tipoGastosService.crearTipoGasto(this.tipoGasto).subscribe(
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
