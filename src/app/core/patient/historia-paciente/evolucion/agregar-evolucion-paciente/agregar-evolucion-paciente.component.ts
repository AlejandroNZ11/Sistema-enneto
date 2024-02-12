import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Iespecialidad } from 'src/app/shared/models/especialidades';
import { evolucion } from 'src/app/shared/models/evolucionPaciente';
import { MedicoList } from 'src/app/shared/models/medico';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import { MedicoService } from 'src/app/shared/services/medico.service';
import { SharedService } from '../../services/shared-service.service';
import { EvolucionPacienteService } from 'src/app/shared/services/evolucionPaciente.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar-evolucion-paciente',
  templateUrl: './agregar-evolucion-paciente.component.html',
  styleUrls: ['./agregar-evolucion-paciente.component.scss']
})
export class AgregarEvolucionPacienteComponent implements OnInit{
  pacienteId="";
  evolucionAgregada$: Subject<boolean> = new Subject<boolean>();
  Evolucion: evolucion = new evolucion();
  form!: FormGroup;
  isFormSubmitted = false;
  especialidadList:Array<Iespecialidad> =[];
  especialidadId:any;
  listaMedicos:Array<MedicoList>=[];
  public mostrarErrores = false;
  constructor(public bsModalRef: BsModalRef, public fb: FormBuilder, public especialidadService: EspecialidadesService, public medicoService: MedicoService, public sharedService:SharedService,public evolucionPacienteService: EvolucionPacienteService){
    this.form = this.fb.group({
      especialidadId: ['', Validators.required],
      medicoId: ['', Validators.required],
      descripcion:['', Validators.required],
      fechaEvolucion: ['', Validators.required],
      estado:['',Validators.required]
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

  ngOnInit(): void {
    this.especialidadService.obtenerListaEspecialidad().subscribe(data => { this.especialidadList = data; })

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


  crearEvolucion(){
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.isTouched()
      return;
    }
    this.isFormSubmitted = true;

    this.Evolucion.pacienteId = this.pacienteId;
    this.Evolucion.especialidadId = this.form.get("especialidadId")?.value;
    this.Evolucion.medicoId = this.form.get("medicoId")?.value;
    this.Evolucion.descripcion = this.form.get("descripcion")?.value;
    this.Evolucion.fechaEvolucion = this.form.get("fechaEvolucion")?.value;
    this.Evolucion.estado = this.form.get("estado")?.value;

    console.log(this.Evolucion);

    this.evolucionPacienteService.agregarEvolucionPaciente(this.Evolucion).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.evolucionAgregada$.next(true);
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
    this.evolucionAgregada$.next(false);
    this.bsModalRef.hide()
  }

  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
