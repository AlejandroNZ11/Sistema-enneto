import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { ActivatedRoute } from '@angular/router';
import { PacienteExploracionService } from 'src/app/shared/services/paciente-exploracion.service';
import { DataPacienteExploracion, IPacienteExploracion, pacienteExploracion } from 'src/app/shared/models/paciente-exploracion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-exploracion-fisica',
  templateUrl: './exploracion-fisica.component.html',
  styleUrls: ['./exploracion-fisica.component.scss']
})
export class ExploracionFisicaComponent implements OnInit{


  constructor(private sharedService:SharedService ,private route: ActivatedRoute, private pacienteExploracionService: PacienteExploracionService,public formBuilder: FormBuilder, ){}

  pacienteId = "";
  form!: FormGroup;
  isLoading = false;
  pacienteExploracion!: IPacienteExploracion;
  PacienteExp: pacienteExploracion = new pacienteExploracion();
  flag:number=0;
  pacienteExploracionId!:string;

  isFormSubmitted = false;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })

    this.sharedService.setPacienteId(this.pacienteId);



    this.form = this.formBuilder.group({

      presionArterial: ['', [Validators.required, Validators.maxLength(100)]],
      pulso:['', [Validators.required, Validators.maxLength(150)]],
      temperatura: ['',[Validators.required]],
      frecuenciaCardiaca:['', [Validators.required, Validators.maxLength(150)]],
      frecuenciaRespiratoria:['',[Validators.required, Validators.maxLength(150)]],
      peso:['', [Validators.required, Validators.maxLength(150)]],
      talla:['',[Validators.required, Validators.maxLength(150)]],
      masa:['', [Validators.required, Validators.maxLength(150)]],
      examenClinico:['',[Validators.required, Validators.maxLength(150)]],
      complementoExamen:['', [Validators.required, Validators.maxLength(150)]],
      odontogramaEstomatologico:['',[Validators.required, Validators.maxLength(150)]],
    })

    if (this.pacienteId != '') {
      this.isLoading = true;
      this.obtenerExploracionPaciente();
    }


  }

  isValidField1(field: string): boolean | null{
    // TODO: obtener validación desde un servicio.
    return this.isValidField2(this.form, field)
  }

  public isValidField2(form: FormGroup, field: string){
    return form.controls[field].errors
    && form.controls[field].touched;
  }




  obtenerExploracionPaciente(){
    this.pacienteExploracionService.obtenerPacienteExploracion(this.pacienteId, environment.clinicaId,1,2)
    .pipe(
      finalize(() => this.isLoading = false)
    )
    .subscribe((data: DataPacienteExploracion) => {
      console.log("Respuesta del Servidor:", data);


      console.log("Exploracion del Paciente")
      this.pacienteExploracion = data.data[0];
      console.log(this.pacienteExploracion)
      this.pacienteExploracionId = data.data[0].pacienteExploracionId

      this.form.patchValue({
        pacienteExploracionId: data.data[0].pacienteExploracionId,
        pacienteId:               data.data[0].pacienteId,
        presionArterial:           data.data[0].presionArterial,
        pulso:                     data.data[0].pulso,
        temperatura:               data.data[0].temperatura,
        frecuenciaCardiaca:        data.data[0].frecuenciaCardiaca,
        frecuenciaRespiratoria:    data.data[0].frecuenciaRespiratoria,
        peso:                      data.data[0].peso,
        talla:                     data.data[0].talla,
        masa:                      data.data[0].masa,
        examenClinico:             data.data[0].examenClinico,
        complementoExamen:         data.data[0].complementoExamen,
        odontogramaEstomatologico: data.data[0].odontogramaEstomatologico
      })

      if(data.data){
        this.flag=1;
      }
    });
 }



 agregarExploracionPaciente(){
  this.form.markAllAsTouched(); //Todos los formularios han sido tocados.
  if(this.flag!=0){

    const exploracionActualizada : IPacienteExploracion={
      pacienteExploracionId: this.pacienteExploracionId,
      pacienteId: this.pacienteId,
      presionArterial:this.form.get("presionArterial")?.value,
      pulso: this.form.get("pulso")?.value,
      temperatura: this.form.get("temperatura")?.value,
      frecuenciaCardiaca: this.form.get("frecuenciaCardiaca")?.value,
      frecuenciaRespiratoria: this.form.get("frecuenciaRespiratoria")?.value,
      peso: this.form.get("peso")?.value,
      talla: this.form.get("talla")?.value,
      masa: this.form.get("masa")?.value,
      examenClinico: this.form.get("examenClinico")?.value,
      complementoExamen: this.form.get("complementoExamen")?.value,
      odontogramaEstomatologico: this.form.get("odontogramaEstomatologico")?.value,
    }

    this.pacienteExploracionService.actualizarPacienteExploracion(exploracionActualizada).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.log(error);
      }
    )
    return;
  }
  if (this.form.invalid) {
    this.isFormSubmitted = true;
    return;
  }
  console.log("Agrego al paciente");



  this.PacienteExp.pacienteId = this.pacienteId;
  this.PacienteExp.presionArterial = this.form.get("presionArterial")?.value;
  this.PacienteExp.pulso = this.form.get("pulso")?.value;
  this.PacienteExp.temperatura = this.form.get("temperatura")?.value;
  this.PacienteExp.frecuenciaCardiaca = this.form.get("frecuenciaCardiaca")?.value;
  this.PacienteExp.frecuenciaRespiratoria = this.form.get("frecuenciaRespiratoria")?.value;
  this.PacienteExp.peso = this.form.get("peso")?.value;
  this.PacienteExp.talla = this.form.get("talla")?.value;
  this.PacienteExp.masa = this.form.get("masa")?.value;
  this.PacienteExp.examenClinico = this.form.get("examenClinico")?.value;
  this.PacienteExp.complementoExamen = this.form.get("complementoExamen")?.value;
  this.PacienteExp.odontogramaEstomatologico = this.form.get("odontogramaEstomatologico")?.value;

  console.log(this.PacienteExp)

  this.pacienteExploracionService.agregarPacienteExploracion(this.PacienteExp).subscribe(
    (response)=>{
      if(response.isSuccess){
        Swal.fire(response.message, '', 'success');
      }else{
        console.error(response.message);
      }
    },
    (error)=>{
      console.log(error);
    }
  )
 }
}


