import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IClientes } from 'src/app/shared/models/clientes';
import { routes } from 'src/app/shared/routes/routes';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

export function empiezaCon9Validator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valido = control.value ? control.value.startsWith('9') : false;
    return valido ? null : { empiezaCon9: { value: control.value } };
  };
}

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {
  cliente: IClientes | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clienteSeleccionado: any;
  clientesEditada$: Subject<boolean> = new Subject<boolean>();
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  public maxLengthDocumento = 8;

  constructor(
    public bsModalRef: BsModalRef,
    private clientesService: ClientesService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      tipoDocumento: [null, Validators.required],
      documento: ['', Validators.required],
      direccion: ['', Validators.required],
      contacto: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}$/), empiezaCon9Validator()]],
      email: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.clientesService.obtenerCliente(this.clienteSeleccionado!).subscribe(cliente => {
      this.cliente = cliente;
      this.form.patchValue({
        nombre: this.cliente.nombre,
        tipoDocumento: this.mapTipoDocumento(this.cliente.tipoDocumento),
        documento: this.cliente.documento,
        direccion: this.cliente.direccion,
        contacto: this.cliente.contacto, 
        telefono: this.cliente.telefono,
        email: this.cliente.email,
        estado: this.cliente.estado == '1' ? 'Activo' : 'Inactivo',
      });

      this.setupDocumentValidation();
    });
  }

  setupDocumentValidation() {
    this.form.get('tipoDocumento')?.valueChanges.subscribe(tipoDocumento => {
      const documentoControl = this.form.get('documento');
      if (!documentoControl) return;
  
      documentoControl.clearValidators();
      documentoControl.setValidators([Validators.required]);
  
      if (tipoDocumento === '01') {
        documentoControl.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
        this.maxLengthDocumento = 8;
      } else if (tipoDocumento === '02') {
        documentoControl.setValidators([Validators.required, Validators.minLength(11), Validators.maxLength(11)]);
        this.maxLengthDocumento = 11;
      } else if (tipoDocumento === '03') {
        documentoControl.setValidators([Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
        this.maxLengthDocumento = 9;
      } else if (tipoDocumento === '04') {
        documentoControl.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
        this.maxLengthDocumento = 8;
      } else if (tipoDocumento === '05') {
        documentoControl.setValidators([Validators.required, Validators.minLength(12), Validators.maxLength(12)]);
        this.maxLengthDocumento = 12;
      }
  
  
      documentoControl.updateValueAndValidity();
      this.cdr.detectChanges();
    });
  }

  mapTipoDocumento(tipoDocumento: number): string {
    switch (tipoDocumento) {
      case 1: return '01';
      case 2: return '02';
      case 3: return '03';
      case 4: return '04';
      case 5: return '05';
  
      default: return '';
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
    return control?.invalid && control?.touched;
  }

  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }

  Cancelar() {
    this.bsModalRef.hide();
    this.clientesEditada$.next(false);
  }

  guardarCliente() {
    if (!this.cliente || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }

    const clienteActualizado: IClientes = {
      clienteId: this.cliente.clienteId,
      nombre: this.form.value.nombre,
      tipoDocumento: this.form.value.tipoDocumento,
      documento: this.form.value.documento,
      direccion: this.form.value.direccion,
      contacto: this.form.value.contacto,
      telefono: this.form.value.telefono,
      email: this.form.value.email,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.clientesService.actualizarCliente(clienteActualizado).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
          this.clientesEditada$.next(true);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}
