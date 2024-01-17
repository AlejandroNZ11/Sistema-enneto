import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataConsentimiento, consentimiento, consentimientoResponse } from 'src/app/shared/models/consentimiento';
import { routes } from 'src/app/shared/routes/routes';
import { ConsentimientoService } from 'src/app/shared/services/consentimiento.service';
import Swal from 'sweetalert2';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-agregar-consentimiento',
  templateUrl: './agregar-consentimiento.component.html',
  styleUrls: ['./agregar-consentimiento.component.scss']
})
export class AgregarConsentimientoComponent implements OnInit, OnDestroy{
  Consentimiento: consentimiento = new consentimiento();
  editor: any;
  texto = '';
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { 
    this.editor = new Editor();
  }

  constructor(
    public bsModalRef: BsModalRef, 
    private consentimientoService: ConsentimientoService,
    public fb: FormBuilder,
    ) {
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        observacion: ['', Validators.required],
        texto: [''],
      });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
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
    this.bsModalRef.hide()
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  
  
  
  
  crearConsentimiento() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Consentimiento.nombre = this.form.get("nombre")?.value;
    this.Consentimiento.observacion = this.form.get("observacion")?.value;
    this.Consentimiento.texto = this.form.get("texto")?.value;
    console.log(this.Consentimiento);
    this.consentimientoService.crearConsentimiento(this.Consentimiento).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.error(error);
      });
  }
}