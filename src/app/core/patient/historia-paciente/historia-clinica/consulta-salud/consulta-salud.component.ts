import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaSaludService } from 'src/app/shared/services/consulta-salud.service';
import { finalize } from 'rxjs';
import { DataConsultaSalud, IConsultaSalud } from 'src/app/shared/models/consulta-salud';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-consulta-salud',
  templateUrl: './consulta-salud.component.html',
  styleUrls: ['./consulta-salud.component.scss']
})
export class ConsultaSaludComponent implements OnInit {

  constructor(private sharedService:SharedService ,private route: ActivatedRoute,public formBuilder: FormBuilder,private consultaSaludService:ConsultaSaludService){


  }

  pacienteId = "";

  form!: FormGroup;
  isLoading = false;
  consultaPaciente!: IConsultaSalud;




  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })

    this.sharedService.setPacienteId(this.pacienteId);

    this.form = this.formBuilder.group({

      ortodoncia: ['', [Validators.required, Validators.maxLength(100)]],
      ortodonciaTexto:['', [Validators.maxLength(150)]],
      medicamento: ['S'],
      medicamentoTexto:['fgfg', [Validators.maxLength(150)]],
      alergico:['N'],
      alergicoTexto:['klkl', [Validators.maxLength(150)]],
      hospitalizacion:['N'],
      hospitalizacionTexto:['uiui', [Validators.maxLength(150)]],
      transfusiones:['S'],
      transfusionesTexto:['rtrt', [Validators.maxLength(150)]],
      padecimientos:['A',],
      cepillado:['S'],
      cepilladoTexto:['qwqw', [Validators.maxLength(150)]],
      presionArterial:['S'],
      presionArterialTexto:['xcxv', [Validators.maxLength(150)]],
    })



    if (this.pacienteId != '') {
      this.isLoading = true;
      this.obtenerConsultaPaciente();


    }


  }

  obtenerConsultaPaciente(){
    this.consultaSaludService.obtenerConsultaPaciente(this.pacienteId)
    .pipe(
            finalize(() => this.isLoading = false)
          )
          .subscribe((data: DataConsultaSalud) => {
            console.log("Respuesta del Servidor:", data);


            this.consultaPaciente = data.data;
            console.log("Consulta del Paciente")
            console.log(this.consultaPaciente)


          });
  }

  enfermedades_LISTA = [
    { name: 'Asma', value: 'A' },
    { name: 'Hepatitis', value: 'H' },
    { name: 'Epilepsia', value: 'E' },
    { name: 'renal', value: 'R' },
    { name: 'Sarampion', value: 'S' },
    { name: 'Varicela', value: 'V' },
    { name: 'Tuberculosis', value: 'T' },
    { name: 'Diabetes', value: 'D' },
    { name: 'Otras', value: 'O' },
  ]


}
