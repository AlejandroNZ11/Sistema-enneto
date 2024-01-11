import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Iconsentimiento } from 'src/app/shared/models/consentimiento';
import { routes } from 'src/app/shared/routes/routes';
import { ConsentimientoService } from 'src/app/shared/services/consentimiento.service';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-editar-consentimiento',
  templateUrl: './editar-consentimiento.component.html',
  styleUrls: ['./editar-consentimiento.component.scss']
})
export class EditarConsentimientoComponent implements OnInit {
  consentimiento!: Iconsentimiento;
  consentimientoSeleccionada: any;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;

  constructor(public bsModalRef: BsModalRef, private consentimientoService: ConsentimientoService, public fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      observacion: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.consentimientoService.obtenerConsentimiento(this.consentimientoSeleccionada!).subscribe(consentimiento => {
      this.consentimiento = consentimiento;
      this.form.patchValue({  
        nombre:this.consentimiento.nombre,
        observacion: this.consentimiento.observacion,
        estado: this.consentimiento.estado == '1' ? 'Activo' : 'Inactivo',
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

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };
  
  Cancelar() {
    this.bsModalRef.hide();
  }

  guardarConsentimiento() {
    if (!this.consentimiento || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    const consentimientoActualizada: Iconsentimiento = {
      consentimientoId: this.consentimiento.consentimientoId,
      nombre: this.form.value.nombre,
      observacion: this.form.value.observacion,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.consentimientoService.actualizarConsentimiento(consentimientoActualizada).subscribe(
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