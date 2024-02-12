import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Apoderado } from 'src/app/shared/models/apoderado';
import { ApoderadoService }  from 'src/app/shared/services/apoderado.service';
import { routes } from 'src/app/shared/routes/routes';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

function empiezaCon9Validator(): ValidatorFn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valido = control.value ? control.value.startsWith('9') : false;
    return valido ? null : {empiezaCon9: {value: control.value}};
  };
}

@Component({
  selector: 'app-agregar-apoderado',
  templateUrl: './agregar-apoderado.component.html',
  styleUrls: ['./agregar-apoderado.component.scss']
})
export class AgregarApoderadoComponent {
  public routes = routes;
  Apoderado: Apoderado = new Apoderado();
  apoderadoAgregada$: Subject<boolean> = new Subject<boolean>();
  form!: FormGroup;
  public mostrarErrores = false;
  maxLengthDocumento = 8;

  constructor(public bsModalRef: BsModalRef, private apoderadoService: ApoderadoService, public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      tipoDocumento: [null, Validators.required],
      documento: ['', [Validators.required]],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}$/), empiezaCon9Validator()]],
    });

    this.form.get('tipoDocumento')?.valueChanges.subscribe((tipo) => {
      this.setDocumentoValidators(tipo);
      this.setMaxLengthDocumento(tipo);
    });
  }

  private setDocumentoValidators(tipo: string): void {
    const documentoControl = this.form.get('documento');
    if (!documentoControl) return;

    documentoControl.clearValidators();

    switch (tipo) {
      case '01':
        documentoControl.setValidators([Validators.required, Validators.pattern(/^\d{8}$/)]);
        break;
      case '02':
        documentoControl.setValidators([Validators.required, Validators.pattern(/^\d{11}$/)]);
        break;
        case '03':
        documentoControl.setValidators([Validators.required, Validators.pattern(/^\d{9}$/)]);
        break;
      case '04':
        documentoControl.setValidators([Validators.required, Validators.pattern(/^\d{8}$/)]);
        break;
      case '05':
        documentoControl.setValidators([Validators.required, Validators.pattern(/^\d{12}$/)]);
        break;
      default:
        documentoControl.setValidators(Validators.required);
        break;
    }

    documentoControl.updateValueAndValidity();
  }

  private setMaxLengthDocumento(tipo: string): void {
    switch (tipo) {
      case '01':
        this.maxLengthDocumento = 8;
        break;
      case '02':
        this.maxLengthDocumento = 11;
        break;
      case '03':
        this.maxLengthDocumento = 9;
        break;
      case '04':
        this.maxLengthDocumento = 8;
        break;
      case '05':
        this.maxLengthDocumento = 12;
        break;
      default:
        this.maxLengthDocumento = 8;
        break;
    }
  }

  soloNumeros(event: KeyboardEvent): void {
    const teclasPermitidas = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];
    if (!teclasPermitidas.includes(event.key)) {
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
    this.bsModalRef.hide();
    this.apoderadoAgregada$.next(false);
  }

  isTouched() {
    this.form.markAllAsTouched();
  }

  crearApoderado() {
    if (this.form.invalid) {
      this.isTouched();
      return;
    }
  
    this.Apoderado.nombre = this.form.get('nombre')?.value;
    this.Apoderado.tipoDocumento = +this.form.get('tipoDocumento')?.value;
    this.Apoderado.documento = this.form.get('documento')?.value;
    this.Apoderado.direccion = this.form.get('direccion')?.value;
    this.Apoderado.telefono = this.form.get('telefono')?.value;
    this.Apoderado.estado = this.form.get('estado')?.value;
  
    this.apoderadoService.crearApoderado(this.Apoderado).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
          this.apoderadoAgregada$.next(true);
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
