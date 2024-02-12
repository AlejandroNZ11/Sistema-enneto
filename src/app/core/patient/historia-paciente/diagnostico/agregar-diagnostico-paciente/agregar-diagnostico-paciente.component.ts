import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Enfermedad } from 'src/app/shared/models/enfermedad';
import { EnfermedadService } from 'src/app/shared/services/enfermedad.service';
import { SharedService } from '../../services/shared-service.service';
import { diagnosticoHistoria } from 'src/app/shared/models/historiaDiagnostico';
import { HistoriaDiagnosticoService } from 'src/app/shared/services/historia-diagnostico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-diagnostico-paciente',
  templateUrl: './agregar-diagnostico-paciente.component.html',
  styleUrls: ['./agregar-diagnostico-paciente.component.scss']
})
export class AgregarDiagnosticoPacienteComponent implements OnInit{
  pacienteId="";
  diagnosticoAgregada$: Subject<boolean> = new Subject<boolean>();
  form!: FormGroup;
  public mostrarErrores = false;
  enfermedadList:Array<Enfermedad> = [];
  isFormSubmitted = false;

  diagnosticoHistoria: diagnosticoHistoria = new diagnosticoHistoria();

  constructor(public bsModalRef: BsModalRef,
    public fb: FormBuilder, public enfermedadService:EnfermedadService, public sharedService:SharedService, public historiaDiagnosticoService:HistoriaDiagnosticoService) {
    this.form = this.fb.group({
      fecha: ['', [Validators.required, this.fechaNacimientoValidator()]],
      enfermedadId: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.enfermedadService.obtenerEnfermedadesList().subscribe(data => {this.enfermedadList = data;})

    this.sharedService.pacientID.subscribe((id)=>{
      this.pacienteId = id
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
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  isFechaMayorActual() {
    return this.form.get('fecha')?.hasError('fechaMayorActual');
  }

  fechaNacimientoValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fecha = control.value;
      if (!fecha) {
        return null;
      }
      const fechaDate = new Date(fecha);
      const fechaActual = new Date();
      if (fechaDate > fechaActual) {
        return { 'fechaMayorActual': true };
      }
      return null;
    };
  }

  crearCategoria(){
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.isTouched()
      return;
    }
    this.diagnosticoHistoria.pacienteId = this.pacienteId;
    this.diagnosticoHistoria.fecha = this.form.get("fecha")?.value;
    this.diagnosticoHistoria.enfermedadId = this.form.get("enfermedadId")?.value;

    this.historiaDiagnosticoService.agregarDiagnosticoPaciente(this.diagnosticoHistoria).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.diagnosticoAgregada$.next(true);
          this.bsModalRef.hide();
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  Cancelar() {
    this.diagnosticoAgregada$.next(false);
    this.bsModalRef.hide()
  }

}
