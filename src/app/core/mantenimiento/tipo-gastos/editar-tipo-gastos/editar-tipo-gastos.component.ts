import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ITipoGasto } from 'src/app/shared/models/tipogastos';
import { routes } from 'src/app/shared/routes/routes';
import { TipoGastosService } from 'src/app/shared/services/tipo-gastos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tipo-gastos',
  templateUrl: './editar-tipo-gastos.component.html',
  styleUrls: ['./editar-tipo-gastos.component.scss']
})
export class EditarTipoGastosComponent implements OnInit {
  tipoGasto!: ITipoGasto;
  gastoSeleccionado: any;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private tipoGastosService: TipoGastosService, public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.tipoGastosService.obtenerTipoGasto(this.gastoSeleccionado!).subscribe(tipoGasto => {
      this.tipoGasto = tipoGasto;
      this.form.patchValue({
        nombre: this.tipoGasto.nombre,
        estado: this.tipoGasto.estado == '1' ? 'Activo' : 'Inactivo',
      });
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
    this.bsModalRef.hide();
  }

  guardarTipoGasto() {
    if (!this.tipoGasto || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }

    const tipoGastoActualizado: ITipoGasto = {
      tipoGastoId: this.tipoGasto.tipoGastoId,
      nombre: this.form.value.nombre,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.tipoGastosService.actualizarTipoGasto(tipoGastoActualizado).subscribe(
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
