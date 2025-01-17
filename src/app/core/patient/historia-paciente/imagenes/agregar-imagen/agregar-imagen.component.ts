import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataAlergias, Ialergias } from 'src/app/shared/models/alergia';
import { AlergiasService } from 'src/app/shared/services/alergias.service';
import { environment as env } from 'src/environments/environments';
import { SharedService } from '../../services/shared-service.service';
import { pacienteAlergia } from 'src/app/shared/models/paciente-alergia';
import { PacienteAlergiaService } from 'src/app/shared/services/paciente-alergia.service';

import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { pacienteImagen } from 'src/app/shared/models/pacienteImagenes';
@Component({
  selector: 'app-agregar-imagen',
  templateUrl: './agregar-imagen.component.html',
  styleUrls: ['./agregar-imagen.component.scss']
})
export class AgregarImagenComponent implements OnInit{
  pacienteAlergiaAgregada$: Subject<boolean> = new Subject<boolean>();
  form!: FormGroup;
  isFormSubmitted = false;
  pacienteId="";

  pacienteAlergia:pacienteAlergia = new pacienteAlergia();
  pacienteImagen: pacienteImagen = new pacienteImagen();
  constructor(public bsModalRef: BsModalRef, public alergiaService: AlergiasService,  public fb: FormBuilder, public sharedService:SharedService, public pacienteAlergiaService: PacienteAlergiaService ){

    this.form = this.fb.group({
      nombre:['', [Validators.required]],
      notas:['']
    })
  }

  ListAlergias?: Ialergias[];
  ngOnInit(): void {
    this.obtenerListaAlergias();
    console.log(env.clinicaId)

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





  private obtenerListaAlergias(): void {

    this.alergiaService.obtenerListaAlergias().subscribe((datas: Ialergias[]) => {

      console.log(datas)
      this.ListAlergias = datas;
      console.log(this.ListAlergias)
    });

  }

  crearPacienteAlergia(){
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.isTouched()
      console.log("error")
      return;
    }

    this.isFormSubmitted = true;
    this.pacienteImagen.pacienteId = this.pacienteId;
    const now = new Date();
    this.pacienteImagen.fecha = now.toString();
    this.pacienteImagen.nombre = this.form.get("nombre")?.value;
    this.pacienteImagen.notas = this.form.get("notas")?.value;


    console.log(this.pacienteImagen);

    // this.pacienteAlergiaService.agregarPacienteAlergia(this.pacienteAlergia).subscribe(
    //   (response)=>{
    //     if(response.isSuccess){
    //       Swal.fire(response.message, '', 'success');
    //       this.pacienteAlergiaAgregada$.next(true);
    //       this.bsModalRef.hide();
    //     }else{
    //       console.error(response.message);
    //     }
    //   },
    //   (error)=>{
    //     console.log(error);
    //   }
    // )
  }

  cancelar() {
    this.pacienteAlergiaAgregada$.next(false);
    this.bsModalRef.hide()
  }



}
