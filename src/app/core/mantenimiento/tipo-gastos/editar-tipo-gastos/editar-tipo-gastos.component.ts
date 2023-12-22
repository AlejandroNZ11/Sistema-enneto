import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IConceptoGasto } from 'src/app/shared/models/tipogastos';
import { routes } from 'src/app/shared/routes/routes';
import { TipoGastosService } from 'src/app/shared/services/tipo-gastos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tipo-gastos',
  templateUrl: './editar-tipo-gastos.component.html',
  styleUrls: ['./editar-tipo-gastos.component.scss']
})
export class EditarTipoGastosComponent implements OnInit {
  conceptoGasto!: IConceptoGasto;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    this.tipoGastosService.obtenerConceptoGasto(this.gastoSeleccionado).subscribe(conceptoGasto => {
      this.conceptoGasto = conceptoGasto;
      this.form.patchValue({
        nombre: this.conceptoGasto.nombre,
        estado: this.conceptoGasto.estado == '1' ? 'Activo' : 'Inactivo',
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

  guardarConceptoGasto() {
    if (!this.conceptoGasto || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }

    const conceptoGastoActualizado: IConceptoGasto = {
      conceptoGastoId: this.conceptoGasto.conceptoGastoId,
      nombre: this.form.value.nombre,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.tipoGastosService.actualizarConceptoGasto(conceptoGastoActualizado).subscribe(
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
