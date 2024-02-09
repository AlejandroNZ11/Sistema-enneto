import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicoService } from '../../../../../shared/services/medico.service';
import { MedicoList } from 'src/app/shared/models/medico';
import { Iespecialidad } from 'src/app/shared/models/especialidades';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import { IEvolucionPaciente, evolucion } from 'src/app/shared/models/evolucionPaciente';
import { EvolucionPacienteService } from 'src/app/shared/services/evolucionPaciente.service';
import { SharedService } from '../../services/shared-service.service';
import Swal from 'sweetalert2';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-editar-evolucion-paciente',
  templateUrl: './editar-evolucion-paciente.component.html',
  styleUrls: ['./editar-evolucion-paciente.component.scss']
})
export class EditarEvolucionPacienteComponent implements OnInit{

  evolucionEditada$: Subject<boolean> = new Subject<boolean>();
  pacienteId="";
  Evolucion: evolucion = new evolucion();
  form!: FormGroup;
  evolucion!: IEvolucionPaciente;
  especialidadId:any;
  listaMedicos:Array<MedicoList>=[];
  especialidadList:Array<Iespecialidad> =[];
  isFormSubmitted = false;
  evolucionSeleccionada ?:string;

  constructor(public bsModalRef: BsModalRef,public medicoService: MedicoService, public especialidadService: EspecialidadesService, public evolucionPacienteService: EvolucionPacienteService, public sharedService:SharedService, public fb: FormBuilder){
    this.form = this.fb.group({
      especialidadId:['',Validators.required],
      fechaEvolucion:['',Validators.required],
      medicoId:['',Validators.required],
      estado:['',Validators.required],
      descripcion:['', Validators.required],


    })
  }
  ngOnInit(): void {
    this.especialidadService.obtenerListaEspecialidad().subscribe(data => { this.especialidadList = data; });

    console.log(this.evolucionSeleccionada);
    this.evolucionPacienteService.obtenerEvolucionPaciente(this.evolucionSeleccionada!).subscribe(evolucion=>{
      this.evolucion = evolucion;
      this.form.patchValue({
        especialidadId:this.evolucion.especialidadId,
        fechaEvolucion: this.evolucion.fechaEvolucion,
        medicoId: this.evolucion.medicoId,
        estado: this.evolucion.estado,
        descripcion: this.evolucion.descripcion,
      })
    })

    this.evolucionPacienteService

    this.sharedService.pacientID.subscribe((id)=>{
      this.pacienteId = id
    })
  }

  estadoLista = [
    { name: '0%', value: '0', checked: false },
    { name: '10%', value: '1', checked: false },
    { name: '25%', value: '2', checked: false },
    { name: '50%', value: '3', checked: false },
    { name: '75%', value: '4', checked: false },
    { name: '100%', value: '5', checked: false },
  ]

  actualizarMedicos(){
    if(this.especialidadId){
      this.medicoService.listaMedicos(this.especialidadId).subscribe(data=>{
        this.listaMedicos = data;
      })
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

  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  editarEvolucion(){
    if (this.form.invalid) {
      this.isTouched()
      return;
    }
    this.isFormSubmitted = true;

    const evolucionActualizada: IEvolucionPaciente ={
      pacienteEvolucionId: this.evolucion.pacienteEvolucionId,
      pacienteId: this.Evolucion.pacienteId = this.pacienteId,
      especialidadId: this.Evolucion.especialidadId = this.form.get("especialidadId")?.value,
      medicoId: this.Evolucion.medicoId = this.form.get("medicoId")?.value,
      descripcion: this.Evolucion.descripcion = this.form.get("descripcion")?.value,
      fechaEvolucion: this.Evolucion.fechaEvolucion = this.form.get("fechaEvolucion")?.value,
      estado: this.Evolucion.estado = this.form.get("estado")?.value,
    }


    console.log(evolucionActualizada);

    this.evolucionPacienteService.editarEvolucionPaciente(evolucionActualizada).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.evolucionEditada$.next(true);
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
    this.evolucionEditada$.next(false);
    this.bsModalRef.hide()
  }

}
