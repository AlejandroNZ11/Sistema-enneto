import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataClientes, IClientes, clientes } from 'src/app/shared/models/clientes';
import { routes } from 'src/app/shared/routes/routes';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { PacienteRequest } from 'src/app/shared/models/paciente';


@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
  clientesAgregada$: Subject<boolean> = new Subject<boolean>();
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
      tipoDocumento: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      contacto: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
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
    this.bsModalRef.hide()
    this.clientesAgregada$.next(false);
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
    this.Cliente.tipodocumento = this.form.get("tipodocumento")?.value;
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
      });
  }
  
}