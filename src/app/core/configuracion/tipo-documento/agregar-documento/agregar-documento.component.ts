import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TipoDocumento } from 'src/app/shared/models/tipodocumento';
import { TipoDocumentoService } from 'src/app/shared/services/tipo-documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-documento',
  templateUrl: './agregar-documento.component.html',
  styleUrls: ['./agregar-documento.component.scss']
})
export class AgregarDocumentoComponent  {
  Documento: TipoDocumento = new TipoDocumento();
  form!: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private tipoDocumentoService: TipoDocumentoService,
    public fb: FormBuilder) {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      abreviatura: ['', Validators.required],
      serie: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      correlativoActual: ['', Validators.required]
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

  crearTipoDocumento() {
    if (this.form.invalid) {
      this.isTouched();
      return;
    }

    this.Documento.descripcion = this.form.get("descripcion")?.value;
    this.Documento.abreviatura = this.form.get("abreviatura")?.value;
    this.Documento.serie = this.form.get("serie")?.value;
    this.Documento.inicio = this.form.get("inicio")?.value;
    this.Documento.fin = this.form.get("fin")?.value;
    this.Documento.correlativoActual = this.form.get("correlativoActual")?.value;

    this.tipoDocumentoService.crearTipoDocumento(this.Documento).subscribe(
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
