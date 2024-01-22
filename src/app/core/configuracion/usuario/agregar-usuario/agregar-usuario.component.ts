import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/shared/models/usuario';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';

function mapTipoDocumentoCodeToGuid(tipoDocumentoCode: string): string {
  const tipoDocumentoMap: { [key: string]: string } = {
    "01": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "02": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "03": "3fa85f64-5717-4562-b3fc-2c963f66afa6", 
    "04": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "05": "3fa85f64-5717-4562-b3fc-2c963f66afa6",  
  };

  return tipoDocumentoMap[tipoDocumentoCode] || "valor predeterminado";
}

function mapRolCodeToGuid(rolCode: string): string {
  const rolMap: { [key: string]: string } = {
    "01": "3fa85f64-5717-4562-b3fc-2c963f66afa6", 
    "02": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "03": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "04": "3fa85f64-5717-4562-b3fc-2c963f66afa6",

  };

  return rolMap[rolCode] || "valor predeterminado";
}

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent {
  public routes = routes;
  usuario: Usuario = new Usuario();
  form!: FormGroup;
  public mostrarErrores = false;
  showPassword = false;

  constructor(public bsModalRef: BsModalRef, private usuarioService: UsuarioService, public fb: FormBuilder) {
    this.form = this.fb.group({
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoDocumentoIdentidadId: ['', Validators.required],
      documento: ['', Validators.required],
      foto: [null, Validators.required],
      rolId: ['', Validators.required],
      loginUsuario: ['', Validators.required],
      passwordUsuario: ['', Validators.required],
      fechaRegistro: [''],
      estado: ['', Validators.required]
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

  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.usuario.foto = file;
  }

  crearUsuario() {
    if (this.form.invalid) {
      this.isTouched();
      return;
    }

    this.usuario.tipoDocumentoIdentidadId = mapTipoDocumentoCodeToGuid(this.form.get('tipoDocumentoIdentidadId')?.value);
    this.usuario.rolId = mapRolCodeToGuid(this.form.get('rolId')?.value);

    this.usuario.apellido = this.form.get('apellido')?.value;
    this.usuario.nombre = this.form.get('nombre')?.value;
    this.usuario.telefono = this.form.get('telefono')?.value.toString();
    this.usuario.direccion = this.form.get('direccion')?.value;
    this.usuario.email = this.form.get('email')?.value;
    this.usuario.documento = this.form.get('documento')?.value.toString();
    this.usuario.foto = this.form.get('foto')?.value;

    this.usuarioService.crearUsuario(this.usuario).subscribe(
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordControl = this.form.get('passwordUsuario');
    if (passwordControl) {
      const inputType = this.showPassword ? 'text' : 'password';
      passwordControl.get('passwordUsuario')?.setValue('');
      passwordControl.get('passwordUsuario')?.setValidators([Validators.required]);
      passwordControl.get('passwordUsuario')?.updateValueAndValidity();

      const inputElement = document.getElementById('passwordInput');
      if (inputElement) {
        inputElement.setAttribute('type', inputType);
      }
    }
  }
}
