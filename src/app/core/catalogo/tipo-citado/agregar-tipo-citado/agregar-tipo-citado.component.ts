import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { tipoCitado } from 'src/app/shared/models/tipoCitado';
import { routes } from 'src/app/shared/routes/routes';
import { TipoCitadoService } from 'src/app/shared/services/tipo-citado.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tipo-citado',
  templateUrl: './agregar-tipo-citado.component.html',
  styleUrls: ['./agregar-tipo-citado.component.scss']
})
export class AgregarTipoCitadoComponent{
  citadoAgregada$: Subject<boolean> = new Subject<boolean>();
  tipoCitado: tipoCitado = new tipoCitado();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private TipoCitadoService: TipoCitadoService, public fb: FormBuilder) {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      color: ['#000000', Validators.required],
    });
  }

  soloLetras(event: KeyboardEvent): void {
    const regex = new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$");
    const teclasPermitidas = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];
    if (!regex.test(event.key) && !teclasPermitidas.includes(event.key)) {
      event.preventDefault();
    }
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }

  Cancelar() {
    this.bsModalRef.hide()
    this.citadoAgregada$.next(false);
  }
  isTouched() {
    this.form.markAllAsTouched();
  }
  crearTipoCitado() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.tipoCitado.nombre = this.form.get("descripcion")?.value;
    this.tipoCitado.color = this.form.get("color")?.value;
    
    this.TipoCitadoService.crearTipoCitado(this.tipoCitado).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
          this.citadoAgregada$.next(true);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
  
        if (error instanceof HttpErrorResponse && error.error) {
          console.error('Error del servidor:', error.error);
        }
      }
    );
  }
}
