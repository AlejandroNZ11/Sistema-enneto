import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Enfermedad } from 'src/app/shared/models/enfermedad';
import { EnfermedadService } from 'src/app/shared/services/enfermedad.service';

@Component({
  selector: 'app-agregar-diagnostico-paciente',
  templateUrl: './agregar-diagnostico-paciente.component.html',
  styleUrls: ['./agregar-diagnostico-paciente.component.scss']
})
export class AgregarDiagnosticoPacienteComponent implements OnInit{
  categoriaAgregada$: Subject<boolean> = new Subject<boolean>();
  form!: FormGroup;
  public mostrarErrores = false;
  enfermedadList:Array<Enfermedad> = [];

  constructor(public bsModalRef: BsModalRef,
    public fb: FormBuilder, public enfermedadService:EnfermedadService ) {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      enfermedadId: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.enfermedadService.obtenerEnfermedadesList().subscribe(data => {this.enfermedadList = data;})
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  crearCategoria(){
    if (this.form.invalid) {
      this.isTouched()
      return;
    }
    console.log('Categoria Creada')
  }

  Cancelar() {
    this.categoriaAgregada$.next(false);
    this.bsModalRef.hide()
  }

}
