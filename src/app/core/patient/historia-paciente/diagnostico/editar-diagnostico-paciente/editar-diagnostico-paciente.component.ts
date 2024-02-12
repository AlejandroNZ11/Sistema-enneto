import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Enfermedad } from 'src/app/shared/models/enfermedad';
import { IHistoriaDagnostico } from 'src/app/shared/models/historiaDiagnostico';
import { EnfermedadService } from 'src/app/shared/services/enfermedad.service';
import { HistoriaDiagnosticoService } from 'src/app/shared/services/historia-diagnostico.service';
import { SharedService } from '../../services/shared-service.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { diagnostico } from 'src/app/shared/models/diagnostico';
@Component({
  selector: 'app-editar-diagnostico-paciente',
  templateUrl: './editar-diagnostico-paciente.component.html',
  styleUrls: ['./editar-diagnostico-paciente.component.scss']
})
export class EditarDiagnosticoPacienteComponent implements OnInit{

  diagnosticoEditado$: Subject<boolean> = new Subject<boolean>();
  pacienteId="";
  form!: FormGroup;
  enfermedadList:Array<Enfermedad> = [];
  enfermedadId:any;
  diagnostico!:IHistoriaDagnostico;
  diagnosticoSeleccionado?: string;
  listaDiagnosticos: Array<any> = [];
  isFormSubmitted = false;

  constructor(public bsModalRef: BsModalRef, public fb: FormBuilder , public enfermedadService:EnfermedadService, public historiaDiagnosticoService: HistoriaDiagnosticoService, public sharedService:SharedService){

    this.form = this.fb.group({
      fecha: ['', [Validators.required, this.fechaNacimientoValidator()]],
      enfermedadId: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.enfermedadService.obtenerEnfermedadesList().subscribe(data => {this.enfermedadList = data;});

    console.log(this.diagnosticoSeleccionado);
    this.historiaDiagnosticoService.obtenerDiagnosticoPaciente(this.diagnosticoSeleccionado!).subscribe(
      diagnostico=>{
        this.diagnostico = diagnostico;
        console.log(this.diagnostico);
        this.form.patchValue({
          fecha:this.diagnostico.fecha,
          enfermedadId:this.diagnostico.enfermedadId
        })
      });
      this.sharedService.pacientID.subscribe((id)=>{
        this.pacienteId = id
      })
  }


  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
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

  isFechaNacimientoMayorActual() {
    return this.form.get('fecha')?.hasError('fechaMayorActual');
  }

  fechaNacimientoValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fechaNacimiento = control.value;
      if (!fechaNacimiento) {
        return null;
      }
      const fechaNacimientoDate = new Date(fechaNacimiento);
      const fechaActual = new Date();
      if (fechaNacimientoDate > fechaActual) {
        return { 'fechaMayorActual': true };
      }
      return null;
    };
  }

  editarCategoriaPaciente(){
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.isTouched()
      return;
    }
    this.isFormSubmitted = true;

    const diagnosticoHistoriaActualizada: IHistoriaDagnostico ={
      pacienteDiagnosticoId:this.diagnostico.pacienteDiagnosticoId,
      pacienteId: this.diagnostico.pacienteId,
      fecha: this.form.get("fecha")?.value,
      enfermedadId: this.form.get("enfermedadId")?.value,
      estado:1,
    }

    console.log(diagnosticoHistoriaActualizada);

    this.historiaDiagnosticoService.actualizarDiagnosticoPaciente(diagnosticoHistoriaActualizada).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.diagnosticoEditado$.next(true);
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

  cancelar() {
    this.diagnosticoEditado$.next(false);
    this.bsModalRef.hide()
  }




}
