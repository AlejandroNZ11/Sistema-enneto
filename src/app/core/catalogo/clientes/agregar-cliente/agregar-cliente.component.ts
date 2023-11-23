import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataClientes, IClientes, clientes } from 'src/app/shared/models/clientes';
import { routes } from 'src/app/shared/routes/routes';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import Swal from 'sweetalert2';
import { PacienteRequest } from 'src/app/shared/models/paciente';


@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {

  Cliente: clientes = new clientes();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }
  isFormSubmitted = false;
  cantidad!: number;
  paciente: PacienteRequest = new PacienteRequest();

  constructor(public bsModalRef: BsModalRef, private service: ClientesService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      documento: ['', Validators.required],
      tipoDocumentoId: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      contacto: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
    });
    
  }
  tipoDocumento_LISTA = [
    { name: 'DNI', value: '01' },
    { name: 'RUC', value: '06' },
    { name: 'PASAPORTE', value: '07' },
    { name: 'CARNET EXTRANJERIA', value: '04' },
    { name: 'OTROS', value: '00' },
  ]

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
    console.log(this.Cliente);
    this.service.crearClientes(this.Cliente).subscribe(
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
  actualizarCantidad() {
    this.form.get('numeroDocumento')!.setValue('');
    const tipoDocumento = this.form.get('tipoDocumentoId')!.value;
    let maxCaracteres = 0;
    switch (tipoDocumento) {
      case '01':
        maxCaracteres = 8;
        break;
      case '06':
        maxCaracteres = 11;
        break;
      default:
        maxCaracteres = 12;
        break;
    }
    this.cantidad = maxCaracteres;
    this.form.get('numeroDocumento')?.setValidators([
      Validators.required,
      Validators.maxLength(maxCaracteres),
      Validators.minLength(maxCaracteres),
      Validators.pattern('^[0-9]+$')
    ]);
    this.form.get('numeroDocumento')?.updateValueAndValidity();
  }
}
