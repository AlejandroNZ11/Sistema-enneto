import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
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
  documentoeditado$: Subject<boolean> = new Subject<boolean>();
  documento!: ITipoDocumento;
  documentoSeleccionado: any;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private tipoDocumentoService: TipoDocumentoService, public fb: FormBuilder) {
    this.form = this.fb.group({
      tipoComprobanteId: ['', Validators.required],
      serie: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      correlativoActual: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.tipoDocumentoService.obtenerTipoDocumento(this.documentoSeleccionado!).subscribe(documento => {
      console.log('Documento obtenido:', documento)

      this.documento = documento;
      this.form.patchValue({
        tipoComprobanteId: this.documento.tipoComprobanteId,
        tipoComprobanteNombre: this.documento.tipoComprobanteNombre, 
        serie: this.documento.serie,
        inicio: this.documento.inicio,
        fin: this.documento.fin,
        correlativoActual: this.documento.correlativoActual,
        estado: this.documento.estado == '1' ? 'Activo' : 'Inactivo',

  gettipoComprobanteId(tipoComprobanteId: string):string{
    return this["documento"].find((tipoComprobanteId: { tipoComprobanteNombre: any; }) => tipoComprobanteId.tipoComprobanteNombre === tipoComprobanteId)!.nombre || '';
  }
      });
    },
    error=>{console.error('Error al obtener el documento:', error);
      });
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
    this.documentoeditado$.next(false);
    this.bsModalRef.hide();
  }

  guardarDocumento() {
    if (!this.documento || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const documentoActualizado: ITipoDocumento = {
      tipoDocumentoId: this.documento.tipoDocumentoId,
      tipoComprobanteNombre: this.form.value.tipoComprobanteNombre,
      tipoComprobanteId: this.form.value.tipoComprobanteId,
      descripcion: this.form.value.descripcion,
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
          this.documentoeditado$.next(true);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}
