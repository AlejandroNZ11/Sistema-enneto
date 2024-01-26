import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Iespecialidad } from 'src/app/shared/models/especialidades';
import { MedicoList } from 'src/app/shared/models/medico';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import { MedicoService } from 'src/app/shared/services/medico.service';

@Component({
  selector: 'app-agregar-evolucion-paciente',
  templateUrl: './agregar-evolucion-paciente.component.html',
  styleUrls: ['./agregar-evolucion-paciente.component.scss']
})
export class AgregarEvolucionPacienteComponent implements OnInit{
  evolucionAgregada$: Subject<boolean> = new Subject<boolean>();
  form!: FormGroup;
  especialidadList:Array<Iespecialidad> =[];
  especialidadId:any;
  listaMedicos:Array<MedicoList>=[];
  constructor(public bsModalRef: BsModalRef, public fb: FormBuilder, public especialidadService: EspecialidadesService, public medicoService: MedicoService){
    this.form = this.fb.group({
      especialidadId: ['', Validators.required],
      fechaEvolucion: ['', Validators.required],
      medico: ['', Validators.required],
      estado:['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.especialidadService.obtenerListaEspecialidad().subscribe(data => { this.especialidadList = data; })
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


  crearCategoria(){
return;
  }
  cancelar() {
    this.evolucionAgregada$.next(false);
    this.bsModalRef.hide()
  }
}
