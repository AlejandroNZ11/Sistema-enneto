import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Iconsentimiento } from 'src/app/shared/models/consentimiento';
import { routes } from 'src/app/shared/routes/routes';
import { ConsentimientoService } from 'src/app/shared/services/consentimiento.service';
import Swal from 'sweetalert2';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-editar-consentimiento',
  templateUrl: './editar-consentimiento.component.html',
  styleUrls: ['./editar-consentimiento.component.scss']
})
export class EditarConsentimientoComponent implements OnInit, OnDestroy {
  consentimiento!: Iconsentimiento;
  consentimientoSeleccionada: any;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  editor!: Editor;
  texto = '';

  constructor(
    public bsModalRef: BsModalRef, 
    private consentimientoService: ConsentimientoService, 
    public fb: FormBuilder
    ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      observacion: ['', Validators.required],
      texto: [''],
      estado: ['Activo', Validators.required],
    });
  }

  ngOnInit() {
    this.editor = new Editor();
    this.consentimientoService.obtenerConsentimiento(this.consentimientoSeleccionada!).subscribe(consentimiento => {
      this.consentimiento = consentimiento;
      this.form.patchValue({  
        nombre:this.consentimiento.nombre,
        observacion: this.consentimiento.observacion,
        texto: this.consentimiento.texto,
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

  
  Cancelar() {
    this.bsModalRef.hide();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
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
      texto: this.form.value.texto,
      estado: this.form.value.estado == '1' ? 'Activo' : 'Inactivo',
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