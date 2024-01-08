import { Component,OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import {AbstractControl, FormBuilder,FormGroup,FormControl, ValidatorFn, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { PacienteEditar } from 'src/app/shared/models/paciente';
import { Idepartamento } from 'src/app/shared/models/departamento';
import { UbicacionService } from 'src/app/shared/services/ubicacion.service';
import { Iprovincia } from 'src/app/shared/models/provincia';
import { Idistrito } from 'src/app/shared/models/distrito';
import { EstadoCivilService } from 'src/app/shared/services/estado-civil.service';
import { IestadoCivil } from 'src/app/shared/models/estadoCivil';
import { GradoInstruccionService } from 'src/app/shared/services/grado-instruccion.service';
import { IgradoInstruccion } from 'src/app/shared/models/estudio';
import { Ipais } from 'src/app/shared/models/pais';
import { departamento } from '../../../shared/models/departamento';

@Component({
  selector: 'app-historia-paciente',
  templateUrl: './historia-paciente.component.html',
  styleUrls: ['./historia-paciente.component.scss']
})
export class HistoriaPacienteComponent implements OnInit {
  constructor(public formBuilder: FormBuilder,private route: ActivatedRoute , public pacienteService: PacienteService, public ubicacionService: UbicacionService, public estadoCivilService: EstadoCivilService, public gradoInstService: GradoInstruccionService) { }
  public routes = routes;
  isFormSubmitted = false;
  form!: FormGroup;
  activeLink = '';
  pacienteId = "";


  pacienteData!: PacienteEditar;
  imagenTempFoto!: string | ArrayBuffer | null;
  sexoPaciente!: string;
  estadoPaciente!: number;
  tipoDocumento !: string;
  nroDocumento !: string;
  departamento!: string;
  departamentos!: Idepartamento[];
  provincia!: string;
  provincias!: Iprovincia[];
  distritos!: Idistrito[];
  estadosCiviles!: IestadoCivil[];
  gradosInstruccion!: IgradoInstruccion[];
  paises!: Ipais[];

  ngOnInit(): void {

    // Obteniendo data para los campos select
    this.estadoCivilService.obtenerEstadosCiviles().subscribe(data => { this.estadosCiviles = data; })
    this.gradoInstService.obtenerGradoInstruccion().subscribe(data => { this.gradosInstruccion = data; })
    this.ubicacionService.obtenerPaises().subscribe(data => { this.paises = data; })
    this.ubicacionService.obtenerDepartamentos().subscribe(data => { this.departamentos = data; })

    this.form = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.maxLength(100)]],
      apellidos: ['', [Validators.required, Validators.maxLength(100)]],
      fechaNacimiento: ['', [Validators.required, this.fechaNacimientoValidator()]],
      edad: [{ value: '', disabled: true }, [Validators.maxLength(2), Validators.minLength(1), Validators.required]],
      ocupacion: ['', [Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      estudioId: ['', [Validators.required, Validators.maxLength(100)]],
      paisId: ['', [Validators.required, Validators.maxLength(100)]],
      departamento: ['', [Validators.required, Validators.maxLength(100)]],
      provincia: ['', [Validators.required, Validators.maxLength(100)]],
      ubigeo: ['', [Validators.required, Validators.maxLength(100)]],
      celular: ['', [Validators.maxLength(9), Validators.minLength(9), Validators.required]],
      tipoPacienteId: ['', [Validators.required, Validators.maxLength(100)]],
      estadoCivil: ['', [Validators.required, Validators.maxLength(100)]],
      sexo: ['', [Validators.required]],
      informacionClinicaId: ['', [Validators.required, Validators.maxLength(100)]],
      nombreContacto: ['', [Validators.maxLength(100)]],
      tipoHistoria: ['', [Validators.required, Validators.maxLength(100)]],
      aseguradoraId: ['', [Validators.maxLength(100)]],
      empresaId: ['', [Validators.maxLength(100)]],
      email: ['', [Validators.maxLength(100), Validators.email]],
      fotoPaciente: ['', []],
      titulo: ['', []],
      observacion: ['', [Validators.maxLength(100)]],
      estado: ['', [Validators.required]],
      nroDocumento:[{ value: '', disabled: true },[Validators.required]],
      contactoEmergencia:['',[Validators.maxLength(100)]],
      telefonoParentesco:['',[Validators.maxLength(9)]],
      domicilioParentesco:['',[Validators.maxLength(100)]],
    })

    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })
    console.log(this.pacienteId)

    if (this.pacienteId != '') {
      this.pacienteService.obtenerPaciente(this.pacienteId).subscribe(async (paciente: PacienteEditar) => {
        if (paciente) {
          this.pacienteData = paciente;
          this.imagenTempFoto = this.pacienteData.foto;
          this.sexoPaciente = this.pacienteData.sexo;
          if (this.pacienteData.estado == "A") {
            this.estadoPaciente = 1
          } else {
            this.estadoPaciente = 0
          }
          switch (this.pacienteData.tipoDocumentoId) {
            case '01': this.tipoDocumento = 'DNI'; break;
            case '06': this.tipoDocumento = 'RUC'; break;
            case '07': this.tipoDocumento = 'PASAPORTE'; break;
            case '04': this.tipoDocumento = 'CARNET EXTRANJERIA'; break;
            case '00': this.tipoDocumento = 'OTROS'; break;
          }
          console.log(this.pacienteData)
        }


         // Patch valores al formulario
         this.form.patchValue({
          nombres: this.pacienteData.nombres,
          apellidos: this.pacienteData.apellidos,
          fechaNacimiento: this.formatoFecha(this.pacienteData.fechaNacimiento.toString()),
          edad: this.pacienteData.edad,
          nroDocumento: this.pacienteData.numeroDocumento,
          direccion: this.pacienteData.direccion,
          estadoCivil: this.pacienteData.estadoCivilId,
          sexo: this.pacienteData.sexo,
          ocupacion: this.pacienteData.ocupacion,
          estudioId: this.pacienteData.estudioId,
          celular: this.pacienteData.celular,
          email: this.pacienteData.email,
          paisId: this.pacienteData.paisId,
          // provincia: (this.pacienteData!.ubigeo.substring(0, 4)),
          ubigeo: this.pacienteData.ubigeo,
          observacion: this.pacienteData.observacion,
          contactoEmergencia: this.pacienteData.contactoEmergencia,
          telefonoParentesco: this.pacienteData.telefonoParentesco,
          domicilioParentesco: this.pacienteData.domicilioParentesco,


        });

        const departamentoId = (this.pacienteData!.ubigeo.substring(0, 2));
        const provinciaId = (this.pacienteData!.ubigeo.substring(0, 4));
        this.cargarUbicacion(departamentoId, provinciaId);
      })
    }
  }

  sexo_LISTA = [
    { name: 'Masculino', value: 'M', checked: false },
    { name: 'Femenino', value: 'F', checked: false },
  ]

  actualizarProvincias(id?: string) {
    if (this.departamento) {
      if (id) {
        this.ubicacionService.obtenerProvincias(id).subscribe(data => {
          this.provincias = data;
        })
      } else {
        const departamentoEncontrado = this.departamentos.find(dep => dep.nombre === this.departamento!.toString())!.departamentoId;
        this.ubicacionService.obtenerProvincias(departamentoEncontrado).subscribe(data => {
          this.provincias = data;
        })
      }
    }
  }
  actualizarDistritos(id?: string) {
    if (this.provincia) {
      if (id) {
        this.ubicacionService.obtenerDistritos(id).subscribe(data => {
          this.distritos = data;
        })
      } else {
        const provinciaEncotrada = this.provincias.find(prov => prov.nombre == this.provincia!.toString())!.provinciaId;
        this.ubicacionService.obtenerDistritos(provinciaEncotrada).subscribe(data => {
          this.distritos = data;
        })
      }
    }
  }

  cargarUbicacion(departamento: string, provincia: string) {
    this.departamento = this.departamentos?.find(dep => dep.departamentoId === departamento)!.nombre;
    this.ubicacionService.obtenerProvincias(departamento).subscribe(data => {
      this.provincias = data;
      this.provincia = this.provincias.find(prov => prov.provinciaId === provincia)!.nombre;
      this.ubicacionService.obtenerDistritos(provincia).subscribe(data => {
        this.distritos = data;
      });
    })
  }





  formatoFecha(fecha: string): string {
    const [anio, mes, dia] = fecha.toString().split('T')[0].split('-');
    return `${dia}-${mes}-${anio}`;
  }

  getNombres(): string {
    const nombres = this.pacienteData?.nombres ?? '';
    return nombres;
  }

  getApellidos():string | null{
    const apellidos = this.pacienteData?.apellidos ? this.pacienteData.apellidos : null;
    return apellidos
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
        return { 'fechaNacimientoMayorActual': true };
      }
      return null;
    };
  }
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
  setActiveLink(link: string): void {
    this.activeLink = link; // Establece el enlace como activo
  }
}



