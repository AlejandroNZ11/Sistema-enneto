import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { IUsuario } from 'src/app/shared/models/usuario';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  usuario!: IUsuario;
  usuarioSeleccionado: any;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  public showPassword = false;

  constructor(public bsModalRef: BsModalRef, private usuarioService: UsuarioService, public fb: FormBuilder) {
    this.form = this.fb.group({
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoDocumentoId: ['', Validators.required],
      documento: ['', Validators.required],
      foto: ['', Validators.required],
      rolId: ['', Validators.required],
      loginUsuario: ['', Validators.required],
      passwordUsuario: ['', Validators.required],
      estado: ['activo', Validators.required],
    });
  }

  ngOnInit() {
    this.usuarioService.obtenerUsuario(this.usuarioSeleccionado!).subscribe(usuario => {
      this.usuario = usuario;
      this.form.patchValue({
        apellido: this.usuario.apellido,
        nombre: this.usuario.nombre,
        telefono: this.usuario.telefono,
        direccion: this.usuario.direccion,
        email: this.usuario.email,
        tipoDocumentoId: this.usuario.tipoDocumentoId,
        documento: this.usuario.documento,
        foto: this.usuario.foto,
        rolId: this.usuario.rolId,
        loginUsuario: this.usuario.loginUsuario,
        passwordUsuario: '',
        estado: this.usuario.estado.toLowerCase(),
      });
    });
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
  
    if (files) {
      //
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
  }

  guardarUsuario() {
    if (!this.usuario || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }

    const usuarioActualizado: IUsuario = {
      usuarioId: this.usuario.usuarioId,
      apellido: this.form.value.apellido,
      nombre: this.form.value.nombre,
      telefono: this.form.value.telefono,
      direccion: this.form.value.direccion,
      email: this.form.value.email,
      tipoDocumentoId: this.form.value.tipoDocumentoId,
      documento: this.form.value.documento,
      foto: this.form.value.foto,
      rolId: this.form.value.rolId,
      loginUsuario: this.form.value.loginUsuario,
      passwordUsuario: this.form.value.passwordUsuario,
      fechaRegistro: this.form.value.fechaRegistro,
      estado: this.form.value.estado.toLowerCase(),
    };

    this.usuarioService.actualizarUsuario(usuarioActualizado).subscribe(
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
  }
}