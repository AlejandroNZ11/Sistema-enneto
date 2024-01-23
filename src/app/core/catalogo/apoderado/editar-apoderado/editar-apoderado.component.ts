import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IApoderado } from 'src/app/shared/models/apoderado';
import { routes } from 'src/app/shared/routes/routes';
import { ApoderadoService } from 'src/app/shared/services/apoderado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-apoderado',
  templateUrl: './editar-apoderado.component.html',
  styleUrls: ['./editar-apoderado.component.scss']
})
export class EditarApoderadoComponent implements OnInit {
  apoderado: IApoderado | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apoderadoSeleccionado: any;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(
    public bsModalRef: BsModalRef,
    private apoderadoService: ApoderadoService,
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      tipoDocumento: [null, Validators.required],
      documento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  tipoDocumentoMapping: { [key: number]: string } = {
    1: '01',
    2: '02',
    3: '03',
    4: '04',
    5: '05'  
  };

  ngOnInit() {
    this.apoderadoService.obtenerApoderado(this.apoderadoSeleccionado!).subscribe(apoderado => {
      this.apoderado = apoderado;
      this.form.patchValue({
        nombre: this.apoderado.nombre,
        tipoDocumento: this.apoderado.tipoDocumento,
        documento: this.apoderado.documento,
        direccion: this.apoderado.direccion,
        telefono: this.apoderado.telefono,
        estado: this.apoderado.estado == '1' ? 'Activo' : 'Inactivo',
      });
  
      console.log('Tipo de Documento:', this.apoderado.tipoDocumento);
      console.log('Tipo de Documento API:', apoderado.tipoDocumento);
      console.log('Estado del formulario:', this.form.value);
      this.form.get('tipoDocumento')?.setValue(this.apoderado.tipoDocumento);
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

  guardarApoderado() {
    if (!this.apoderado || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const apoderadoActualizado: IApoderado = {
      apoderadoId: this.apoderado.apoderadoId,
      nombre: this.form.value.nombre,
      tipoDocumento: this.form.value.tipoDocumento,
      documento: this.form.value.documento,
      direccion: this.form.value.direccion,
      telefono: this.form.value.telefono,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.apoderadoService.actualizarApoderado(apoderadoActualizado).subscribe(
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
}
