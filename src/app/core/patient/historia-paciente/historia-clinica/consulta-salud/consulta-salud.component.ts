import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaSaludService } from 'src/app/shared/services/consulta-salud.service';
import { finalize } from 'rxjs';
import { DataConsultaSalud, IConsultaSalud } from 'src/app/shared/models/consulta-salud';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-consulta-salud',
  templateUrl: './consulta-salud.component.html',
  styleUrls: ['./consulta-salud.component.scss']
})
export class ConsultaSaludComponent implements OnInit {

  constructor(private sharedService:SharedService ,private route: ActivatedRoute,public formBuilder: FormBuilder,private consultaSaludService:ConsultaSaludService){
  }
  flag:number=0;
  pacienteId = "";

  form!: FormGroup;
  isLoading = false;
  consultaPaciente!: IConsultaSalud;
  pacienteConsultaId!:string;



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })

    this.sharedService.setPacienteId(this.pacienteId);

    this.form = this.formBuilder.group({

      ortodoncia: ['', [Validators.required, Validators.maxLength(100)]],
      ortodonciaTexto:['', [Validators.maxLength(150)]],
      medicamento: [''],
      medicamentoTexto:['', [Validators.maxLength(150)]],
      alergico:[''],
      alergicoTexto:['', [Validators.maxLength(150)]],
      hospitalizacion:[''],
      hospitalizacionTexto:['', [Validators.maxLength(150)]],
      transfusiones:[''],
      transfusionesTexto:['', [Validators.maxLength(150)]],
      padecimientos:['',],
      cepillado:[''],
      cepilladoTexto:['', [Validators.maxLength(150)]],
      presionArterial:[''],
      presionArterialTexto:['', [Validators.maxLength(150)]],
    })



    if (this.pacienteId != '') {
      this.isLoading = true;
      this.obtenerConsultaPaciente();


    }


  }

  obtenerConsultaPaciente(){
    this.consultaSaludService.obtenerConsultaPaciente(this.pacienteId,environment.clinicaId,1,2)
    .pipe(
            finalize(() => this.isLoading = false)
          )
          .subscribe((data: DataConsultaSalud) => {
            console.log("Respuesta del Servidor:", data);


            if(data.data[0]){
              this.consultaPaciente = data.data[0];
              console.log("Consulta del Paciente")
              console.log(this.consultaPaciente)


              this.pacienteConsultaId = data.data[0].pacienteConsultaId;

              this.form.patchValue({
                pacienteConsultaId:   data.data[0].pacienteConsultaId,
                pacienteId:           data.data[0].pacienteId,
                ortodoncia:           data.data[0].ortodoncia,
                ortodonciaTexto:      data.data[0].ortodonciaTexto,
                medicamento:          data.data[0].medicamento,
                medicamentoTexto:     data.data[0].medicamentoTexto,
                alergico:             data.data[0].alergico,
                alergicoTexto:        data.data[0].alergicoTexto,
                hospitalizacion:      data.data[0].hospitalizacion,
                hospitalizacionTexto: data.data[0].hospitalizacionTexto,
                transfusiones:        data.data[0].transfusiones,
                transfusionesTexto:   data.data[0].transfusionesTexto,
                padecimientos:        data.data[0].padecimientos,
                cepillado:            data.data[0].cepillado,
                cepilladoTexto:       data.data[0].cepilladoTexto,
                presionArterial:      data.data[0].presionArterial,
                presionArterialTexto: data.data[0].presionArterialTexto,
              })
              if(data.data){
                this.flag=1;
                this.pacienteConsultaId = data.data[0].pacienteConsultaId;
              }
            }


          });
  }

  enfermedades_LISTA = [
    { name: 'Asma', value: 'a' },
    { name: 'Hepatitis', value: 'h' },
    { name: 'Epilepsia', value: 'e' },
    { name: 'renal', value: 'r' },
    { name: 'Sarampion', value: 's' },
    { name: 'Varicela', value: 'v' },
    { name: 'Tuberculosis', value: 't' },
    { name: 'Diabetes', value: 'd' },
    { name: 'Otras', value: 'o' },
  ]

  agregarConsultaSaludPaciente(){
    if(this.flag!=0){

        const consultaSaludActualizada: IConsultaSalud={
          pacienteConsultaId:   this.pacienteConsultaId,
          pacienteId:           this.pacienteId,
          ortodoncia:           this.form.get("ortodoncia")?.value,
          ortodonciaTexto:      this.form.get("ortodonciaTexto")?.value,
          medicamento:         this.form.get("medicamento")?.value,
          medicamentoTexto:     this.form.get("medicamentoTexto")?.value,
          alergico:             this.form.get("alergico")?.value,
          alergicoTexto:        this.form.get("alergicoTexto")?.value,
          hospitalizacion:     this.form.get("hospitalizacion")?.value,
          hospitalizacionTexto: this.form.get("hospitalizacionTexto")?.value,
          transfusiones:        this.form.get("transfusiones")?.value,
          transfusionesTexto:   this.form.get("transfusionesTexto")?.value,
          padecimientos:        this.form.get("padecimientos")?.value,
          cepillado:            this.form.get("cepillado")?.value,
          cepilladoTexto:       this.form.get("cepilladoTexto")?.value,
          presionArterial:      this.form.get("presionArterial")?.value,
          presionArterialTexto: this.form.get("presionArterialTexto")?.value,
        }

        this.consultaSaludService.actualizarConsultaPaciente(consultaSaludActualizada).subscribe(
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

    console.log("Agrego consulta");

    const consultaSaludAgregada: IConsultaSalud={
      pacienteConsultaId:   this.pacienteConsultaId,
      pacienteId:           this.pacienteId,
      ortodoncia:           this.form.get("ortodoncia")?.value,
      ortodonciaTexto:      this.form.get("ortodonciaTexto")?.value,
      medicamento:         this.form.get("medicamento")?.value,
      medicamentoTexto:     this.form.get("medicamentoTexto")?.value,
      alergico:             this.form.get("alergico")?.value,
      alergicoTexto:        this.form.get("alergicoTexto")?.value,
      hospitalizacion:     this.form.get("hospitalizacion")?.value,
      hospitalizacionTexto: this.form.get("hospitalizacionTexto")?.value,
      transfusiones:        this.form.get("transfusiones")?.value,
      transfusionesTexto:   this.form.get("transfusionesTexto")?.value,
      padecimientos:        this.form.get("padecimientos")?.value,
      cepillado:            this.form.get("cepillado")?.value,
      cepilladoTexto:       this.form.get("cepilladoTexto")?.value,
      presionArterial:      this.form.get("presionArterial")?.value,
      presionArterialTexto: this.form.get("presionArterialTexto")?.value,
    }
    console.log(consultaSaludAgregada)

    this.consultaSaludService.agregarConsultaPaciente(consultaSaludAgregada).subscribe(
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
