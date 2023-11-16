import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/shared/models/usuario';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';

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
      tipoDocumentoId: ['', Validators.required],
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
    this.form.get('foto')?.setValue(file);
  }

  crearUsuario() {
    if (this.form.invalid) {
      this.isTouched();
      return;
    }

    this.usuario.apellido = this.form.get('apellido')?.value;
    this.usuario.nombre = this.form.get('nombre')?.value;
    this.usuario.telefono = this.form.get('telefono')?.value;
    this.usuario.direccion = this.form.get('direccion')?.value;
    this.usuario.email = this.form.get('email')?.value;
    this.usuario.tipoDocumentoId = this.form.get('tipoDocumentoId')?.value;
    this.usuario.documento = this.form.get('documento')?.value;
    this.usuario.foto = this.form.get('foto')?.value;
    this.usuario.rolId = this.form.get('rolId')?.value;

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
