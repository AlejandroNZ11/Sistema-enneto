import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MonedaService } from 'src/app/shared/services/moneda.service';
import { Moneda } from 'src/app/shared/models/moneda';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-moneda',
  templateUrl: './agregar-moneda.component.html',
  styleUrls: ['./agregar-moneda.component.scss']
})
export class AgregarMonedaComponent {
  monedaAgregada$: Subject<boolean> = new Subject<boolean>();
  public form!: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private monedaService: MonedaService,
    public fb: FormBuilder) {
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
    this.monedaAgregada$.next(false);
    this.bsModalRef.hide();
  }

  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  crearMoneda() {
    if (this.form.invalid) {
        this.isTouched()      
        return;
    }
    const nuevaMoneda = new Moneda();
    nuevaMoneda.descripcion = this.form.get("descripcion")?.value;

    this.monedaService.crearMoneda(nuevaMoneda).subscribe(
        (response) => {
            if (response.isSuccess) {
                Swal.fire(response.message, '', 'success');
                this.monedaAgregada$.next(true);
                this.bsModalRef.hide();
            } else {
                console.error(response.message);
            }
        },
        (error) => {
            console.error(error);
        }
    );
}
}