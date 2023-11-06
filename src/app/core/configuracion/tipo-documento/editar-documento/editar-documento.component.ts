import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ITipoDocumento } from 'src/app/shared/models/tipodocumento';
import { routes } from 'src/app/shared/routes/routes';
import { TipoDocumentoService } from 'src/app/shared/services/tipo-documento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-documento',
  templateUrl: './editar-documento.component.html',
  styleUrls: ['./editar-documento.component.scss']
})
export class EditarDocumentoComponent implements OnInit {
  documento!: ITipoDocumento;
  documentoSeleccionado: any;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private tipoDocumentoService: TipoDocumentoService, public fb: FormBuilder) {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      abreviatura: ['', Validators.required],
      serie: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      correlativoActual: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.tipoDocumentoService.obtenerTipoDocumento(this.documentoSeleccionado!).subscribe(documento => {
      this.documento = documento;
      this.form.patchValue({
        descripcion: this.documento.descripcion,
        abreviatura: this.documento.abreviatura,
        serie: this.documento.serie,
        inicio: this.documento.inicio,
        fin: this.documento.fin,
        correlativoActual: this.documento.correlativoActual,
        estado: this.documento.estado == '1' ? 'Activo' : 'Inactivo',
      });
    })
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

  guardarDocumento() {
    if (!this.documento || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const documentoActualizado: ITipoDocumento = {
      tipoDocumentoId: this.documento.tipoDocumentoId,
      descripcion: this.form.value.descripcion,
      abreviatura: this.form.value.abreviatura,
      serie: this.form.value.serie,
      inicio: this.form.value.inicio,
      fin: this.form.value.fin,
      correlativoActual: this.form.value.correlativoActual,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.tipoDocumentoService.actualizarTipoDocumento(documentoActualizado).subscribe(
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
