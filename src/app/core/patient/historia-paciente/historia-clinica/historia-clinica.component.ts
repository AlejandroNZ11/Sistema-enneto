import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared-service.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {


  constructor(private route: ActivatedRoute, private sharedService: SharedService,public formBuilder: FormBuilder, ){}

    form!: FormGroup;
    activeTab: string = 'antecedentes';
    pacienteId = "";
    ada='sss';


    ngOnInit(): void {

      // this.sharedService.setPacienteId(this.pacienteId);

      this.sharedService.pacientID.subscribe((id)=>{
        this.pacienteId = id
      })


      this.form = this.formBuilder.group({

        ortodoncia: [false],
        ortodonciaTexto: ['hola', [ Validators.maxLength(100)]],
        medicamento: [false],
        medicamentoTexto: ['', [ Validators.maxLength(100)]],
        alergico: [false],
        alergicoTexto: ['', [ Validators.maxLength(100)]],
        hospitalizacion: [false],
        hospitalizacionTexto: ['', [ Validators.maxLength(100)]],
        transfusiones: [false],
        transfusionesTexto: ['', [ Validators.maxLength(100)]],
        padecimientos: [false],
        cepillado: [false],
        cepilladoTexto: ['', [ Validators.maxLength(100)]],
        presionArterial: [false],
        presionArterialTexto: ['', [ Validators.maxLength(100)]],
      })


      this.form.patchValue({

        ortodonciaTexto: 'holas',
      })
    }


    crearPaciente(){
      Swal.showLoading();
      Swal.close();
      Swal.fire('Correcto', 'Paciente registrado en el sistema correctamente.', 'success');
    }

    // Estructura posible Consultas Salud
    // {
    //   "consultasalud": {
    //     "grupo1": {
    //       "tratamiento": {
    //         "haTenidoTratamiento": true, // o false dependiendo de la selección
    //         "algunaVezMedicamentoTexto": "Texto asociado al tratamiento si aplica"
    //       },
    //       "medicamento": {
    //         "estaTomandoMedicamento": true, // o false dependiendo de la selección
    //         "tomandoMedicamentoTexto": "Texto asociado al medicamento si aplica"
    //       }
    //     },
    //     "grupo2": {
    //       "alergicoAnestesico": {
    //         "esAlergicoAnestesico": true, // o false dependiendo de la selección
    //         "alergicoAnestesicoTexto": "Texto asociado a la alergia si aplica"
    //       },
    //       "hospitalizadoCirugia": {
    //         "haSidoHospitalizado": true, // o false dependiendo de la selección
    //         "hospitalizadoCirugiaTexto": "Texto asociado a la hospitalización o cirugía si aplica"
    //       }
    //     },
    //     "enfermedades": {
    //       "asma": true, // o false dependiendo de la selección
    //       "hepatitis": true, // o false dependiendo de la selección
    //       "epilepsia": false, // o true dependiendo de la selección
    //       "enfRenal": false, // o true dependiendo de la selección
    //       "sarampion": false, // o true dependiendo de la selección
    //       "varicela": false, // o true dependiendo de la selección
    //       "tuberculosis": false, // o true dependiendo de la selección
    //       "diabetes": false, // o true dependiendo de la selección
    //       "otras": false // o true dependiendo de la selección
    //     },
    //     "transtornoNerviosoEmocional": {
    //       "haTenidoTranstorno": true, // o false dependiendo de la selección
    //       "transtornoNerviosoEmocionalTexto": "Texto asociado al trastorno si aplica"
    //     }
    //   }
    // }





}
