import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { ActivatedRoute } from '@angular/router';
import { PacienteExploracionService } from 'src/app/shared/services/paciente-exploracion.service';
import { DataPacienteExploracion, IPacienteExploracion } from 'src/app/shared/models/paciente-exploracion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })

    this.sharedService.setPacienteId(this.pacienteId);



    this.form = this.formBuilder.group({

      presionArterial: ['', [Validators.required, Validators.maxLength(100)]],
      pulso:['', [Validators.maxLength(150)]],
      temperatura: ['S'],
      frecuenciaCardiaca:['fgfg', [Validators.maxLength(150)]],
      frecuenciaRespiratoria:['N'],
      peso:['klkl', [Validators.maxLength(150)]],
      talla:['N'],
      masa:['uiui', [Validators.maxLength(150)]],
      examenClinico:['S'],
      complementoExamen:['rtrt', [Validators.maxLength(150)]],
      odontogramaEstomatologico:['A'],
    })

    if (this.pacienteId != '') {
      this.isLoading = true;
      this.obtenerExploracionPaciente();
    }


  }


  obtenerExploracionPaciente(){
    this.pacienteExploracionService.obtenerPacienteExploracion(this.pacienteId)
    .pipe(
      finalize(() => this.isLoading = false)
    )
    .subscribe((data: DataPacienteExploracion) => {
      console.log("Respuesta del Servidor:", data);


      this.pacienteExploracion = data.data;
      console.log("Exploracion del Paciente")
      console.log(this.pacienteExploracion)


    });
 }
}


