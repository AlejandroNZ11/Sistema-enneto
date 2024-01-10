import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MonedaService } from 'src/app/shared/services/moneda.service';
import { IMoneda } from 'src/app/shared/models/moneda';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-editar-moneda',
  templateUrl: './editar-moneda.component.html',
  styleUrls: ['./editar-moneda.component.scss']
})
export class EditarMonedaComponent implements OnInit {
  monedaEditada$: Subject<boolean> = new Subject<boolean>();
  moneda: IMoneda | undefined;
  public routes = routes;
  monedaSeleccionada: any;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(
    public bsModalRef: BsModalRef,
    private monedaService: MonedaService,
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.monedaService.obtenerMoneda(this.monedaSeleccionada!).subscribe(moneda => {
      this.moneda = moneda;
      this.form.patchValue({
        descripcion: this.moneda.descripcion,
        estado: this.moneda.estado == '1' ? 'Activo' : 'Inactivo',
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
    this.monedaEditada$.next(false);
    this.bsModalRef.hide();
  }

  guardarMoneda() {
    if (!this.moneda || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const monedaActualizada: IMoneda = {
      tipoMonedaId: this.moneda.tipoMonedaId,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.monedaService.actualizarMoneda(monedaActualizada).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.monedaEditada$.next(true);
          this.bsModalRef.hide();
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
        Swal.fire('Error', 'Ocurrió un error al actualizar la moneda', 'error');
      });
  }
}
