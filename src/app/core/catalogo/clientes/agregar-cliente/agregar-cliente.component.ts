import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Clientes } from 'src/app/shared/models/clientes';
import { routes } from 'src/app/shared/routes/routes';
import { ClientesService } from 'src/app/shared/services/clientes.service';
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
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent {
  clientesAgregada$: Subject<boolean> = new Subject<boolean>();
  Cliente: Clientes = new Clientes();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  maxLengthDocumento = 8;

  constructor(public bsModalRef: BsModalRef, private service: ClientesService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      tipoDocumento: [null, Validators.required],
      documento: ['', [Validators.required]],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      contacto: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}$/), empiezaCon9Validator()]],
      email: ['', [Validators.required, Validators.email]],
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
    this.bsModalRef.hide()
    this.clientesAgregada$.next(false);
  }
  isTouched() {
    this.form.markAllAsTouched();
  }
  crearCliente() {
    if (this.form.invalid) {
      this.isTouched()
      return;
    }
    this.Cliente.documento = this.form.get("documento")?.value;
    this.Cliente.nombre = this.form.get("nombre")?.value;
    this.Cliente.direccion = this.form.get("direccion")?.value;
    this.Cliente.contacto = this.form.get("contacto")?.value;
    this.Cliente.telefono = this.form.get("telefono")?.value;
    this.Cliente.email = this.form.get("email")?.value;
    this.Cliente.tipoDocumento = this.form.get("tipoDocumento")?.value;
    this.Cliente.estado = this.form.get("estado")?.value;

    console.log(this.form.get("documento")?.value);
    console.log(this.Cliente);
    
    this.service.crearClientes(this.Cliente).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
          this.clientesAgregada$.next(true);
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