import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { tipoTarjeta } from 'src/app/shared/models/tipotarjeta';
import { routes } from 'src/app/shared/routes/routes';
import { TipoTarjetaService } from 'src/app/shared/services/tipo-tarjeta.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-tarjeta',
  templateUrl: './agregar-tarjeta.component.html',
  styleUrls: ['./agregar-tarjeta.component.scss']
})
export class AgregarTarjetaComponent implements OnInit {
  tipoTarjetaAgregada$: Subject<boolean> = new Subject<boolean>();
  TipoTarjeta: tipoTarjeta = new tipoTarjeta();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  TipoTarjetaService: any;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private tipoTarjetaService: TipoTarjetaService,
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
    this.tipoTarjetaAgregada$.next(false);
    this.bsModalRef.hide()
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearTarjeta() {
    if (this.form.invalid) {
      this.isTouched()
      return;
    }

    this.TipoTarjeta.descripcion = this.form.get("descripcion")?.value;
    this.TipoTarjeta.estado = 1
    console.log(this.TipoTarjeta);
    this.tipoTarjetaService.crearTipoTarjeta(this.TipoTarjeta).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.tipoTarjetaAgregada$.next(true);
          this.bsModalRef.hide();
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
  soloLetras(event: KeyboardEvent): void {
    const regex = new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$");
    const teclasPermitidas = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];
    if (!regex.test(event.key) && !teclasPermitidas.includes(event.key)) {
      event.preventDefault();
    }
  }
 
}
