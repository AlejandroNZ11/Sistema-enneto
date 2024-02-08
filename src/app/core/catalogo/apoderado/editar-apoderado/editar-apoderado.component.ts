import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IApoderado } from 'src/app/shared/models/apoderado';
import { routes } from 'src/app/shared/routes/routes';
import { ApoderadoService } from 'src/app/shared/services/apoderado.service';
import { Subject } from 'rxjs';
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
  apoderadoEditada$: Subject<boolean> = new Subject<boolean>();
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  public maxLengthDocumento = 8;

  constructor(
    public bsModalRef: BsModalRef,
    private apoderadoService: ApoderadoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
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

  ngOnInit() {
    this.apoderadoService.obtenerApoderado(this.apoderadoSeleccionado!).subscribe(apoderado => {
      this.apoderado = apoderado;
      this.form.patchValue({
        nombre: this.apoderado.nombre,
        tipoDocumento: this.mapTipoDocumento(this.apoderado.tipoDocumento),
        documento: this.apoderado.documento,
        direccion: this.apoderado.direccion,
        telefono: this.apoderado.telefono,
        estado: this.apoderado.estado == '1' ? 'Activo' : 'Inactivo',
      });
  
      console.log('Tipo de Documento:', this.apoderado.tipoDocumento);
      this.setupDocumentValidation(); 
      this.form.get('tipoDocumento')?.setValue(this.mapTipoDocumento(this.apoderado.tipoDocumento));
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
    this.apoderadoEditada$.next(false);
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
          this.apoderadoEditada$.next(true);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}
