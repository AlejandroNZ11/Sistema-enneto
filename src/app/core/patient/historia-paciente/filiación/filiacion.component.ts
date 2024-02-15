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
// import { departamento } from '../../../shared/models/departamento';
import { CitaService } from 'src/app/shared/services/cita.service';

import { environment as env, environment } from 'src/environments/environments';
import { CitaMedicaPaciente, CitasMedicaPacienteById, DataCitaMedica, DataCitaMedicaPaciente, IcitaMedica, MedicoPaciente } from 'src/app/shared/models/cita';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { pageSelection } from 'src/app/shared/models/models';
import { ItipoCitado } from 'src/app/shared/models/tipoCitado';
import { TipoCitadoService } from 'src/app/shared/services/tipo-citado.service';
import { Iespecialidad } from 'src/app/shared/models/especialidades';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import { MedicoService } from 'src/app/shared/services/medico.service';
import { MedicoList } from 'src/app/shared/models/medico';
import { MiniSidebarComponent } from '../mini-sidebar/mini-sidebar.component';
import { SharedService } from '../services/shared-service.service';
import { UserLoggedService } from 'src/app/shared/services/user-logged.service';
import Swal from 'sweetalert2';
import { ValidatorsPatientService } from '../../services/validators-patient.service';

@Component({
  selector: 'app-filiacion',
  templateUrl: './filiacion.component.html',
  styleUrls: ['./filiacion.component.scss']
})
export class FiliacionComponent implements OnInit {
  constructor(public formBuilder: FormBuilder,private route: ActivatedRoute , public pacienteService: PacienteService, public ubicacionService: UbicacionService, public estadoCivilService: EstadoCivilService, public gradoInstService: GradoInstruccionService, public citaService: CitaService, public tipoCitadoService: TipoCitadoService, public especialidadService: EspecialidadesService , private medicoService: MedicoService, private sharedService: SharedService, public user: UserLoggedService, public validatorPatientService: ValidatorsPatientService) { }



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

  // paginación y data citas
  public pageSize = 10;
  public currentPage = 1;
  public pageIndex = 0;
  isLoading = false;
  public limit: number = this.pageSize;
  public totalData = 0;
  public skip = 0;
  public serialNumberArray: Array<number> = [];
  public citasList: Array<IcitaMedica> = [];
  public citasListPaciente: Array<CitasMedicaPacienteById> = [];
  public medicosListPaciente: Array<MedicoPaciente> = [];

  dataSource!: MatTableDataSource<IcitaMedica>;
  dataSource2!: MatTableDataSource<CitasMedicaPacienteById>
  public pageNumberArray: Array<number> = [];
  public totalPages = 0;
  public pageSelection: Array<pageSelection> = [];

  // Historial Citas
  listEstadosCitas!: ItipoCitado[];
  listEspecialidadesCitas!: Iespecialidad[];
  listaMedicos!: MedicoList[]

  sedeId!: string;
  usuarioId!:string;
  ngOnInit(): void {

    // Obteniendo data para los campos select
    this.estadoCivilService.obtenerEstadosCiviles().subscribe(data => { this.estadosCiviles = data; })
    this.gradoInstService.obtenerGradoInstruccion().subscribe(data => { this.gradosInstruccion = data; })
    this.ubicacionService.obtenerPaises().subscribe(data => { this.paises = data; })
    this.ubicacionService.obtenerDepartamentos().subscribe(data => { this.departamentos = data; console.log(this.departamentos)})



    this.form = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.maxLength(100)]],
      apellidos: ['', [Validators.required, Validators.maxLength(100)]],
      fechaNacimiento: ['', [Validators.required, this.fechaNacimientoValidator()]],
      edad: [{ value: '', disabled: true }, [Validators.maxLength(2), Validators.minLength(1), Validators.required]],
      ocupacion: ['', [Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      estudioId: ['', [Validators.required, Validators.maxLength(100)]],
      paisId: ['', [Validators.required, Validators.maxLength(100)]],
      ubigeo: ['', [Validators.required, Validators.maxLength(100)]],
      celular: ['', [Validators.maxLength(9), Validators.minLength(9), Validators.required]],
      // tipoPacienteId: ['', [Validators.required, Validators.maxLength(100)]],
      estadoCivil: ['', [Validators.required, Validators.maxLength(100)]],
      sexo: ['', [Validators.required]],
      // informacionClinicaId: ['', [Validators.required, Validators.maxLength(100)]],
      nombreContacto: ['', [Validators.maxLength(100)]],
      // tipoHistoria: ['', [Validators.required, Validators.maxLength(100)]],
      aseguradoraId: ['', [Validators.maxLength(100)]],
      empresaId: ['', [Validators.maxLength(100)]],
      email: ['', [Validators.maxLength(100), Validators.email]],
      fotoPaciente: ['', []],
      titulo: ['', []],
      observacion: ['', [Validators.maxLength(100)]],
      // estado: ['', [Validators.required]],
      nroDocumento:[{ value: '', disabled: true },[Validators.required]],
      contactoEmergencia:['',[Validators.maxLength(100)]],
      telefonoParentesco:['',[Validators.maxLength(9), Validators.minLength(9)]],
      domicilioParentesco:['',[Validators.maxLength(100)]],
      tipoParentesco:['',[Validators.maxLength(9)]],
      departamentoId:['', [Validators.required]],
      provinciaId:['',  [Validators.required]],
    })

    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })
    console.log(this.pacienteId)

    this.sharedService.setPacienteId(this.pacienteId);

    this.usuarioId = this.user.usuario.personalId.toString();
    this.sedeId = this.user.selectedSucursal.id.toString();

    if (this.pacienteId != '') {
      this.pacienteService.obtenerPaciente(this.pacienteId).subscribe( (paciente: PacienteEditar) => {
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
          console.log(this.pacienteData.departamentoId)
          console.log(this.pacienteData.provinciaId)

        }
        console.log(this.pacienteData.ubigeo);
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
          ubigeo: this.pacienteData.ubigeo,
          observacion: this.pacienteData.observacion,
          contactoEmergencia: this.pacienteData.contactoEmergencia,
          telefonoParentesco: this.pacienteData.telefonoParentesco,
          domicilioParentesco: this.pacienteData.domicilioParentesco,
          tipoParentesco: this.pacienteData.tipoParentesco,
          departamentoId:this.pacienteData.departamentoId.toString(),
          provinciaId: this.pacienteData.provinciaId.toString(),
        });

        const departamentoId = this.pacienteData.departamentoId.toString();
        const provinciaId = this.pacienteData.provinciaId.toString();


        this.ubicacionService.obtenerProvincias(departamentoId).subscribe(data => {
          console.log(data)
          this.provincias = data;
          this.ubicacionService.obtenerDistritos(provinciaId).subscribe(dataDistrito => {
            console.log(dataDistrito)
            console.log()
            this.distritos = dataDistrito;
          })
        })


      })
    }

    // this.obtenerCitas();
    this.obtenerCitasSinFiltro();
  }

  sexo_LISTA = [
    { name: 'Masculino', value: 'M', checked: false },
    { name: 'Femenino', value: 'F', checked: false },
  ]

  actualizarProvincias() {
        const departamentoEncontrado = this.departamentos.find(dep => dep.departamentoId === this.form.get('departamentoId')?.value)!.departamentoId;
        this.ubicacionService.obtenerProvincias(departamentoEncontrado).subscribe(data => {
          console.log(data)
          this.provincias = data;
        });

  }
  actualizarDistritos() {
        const provinciaEncotrada = this.provincias.find(prov => prov.provinciaId == this.form.get('provinciaId')?.value)!.provinciaId;
        this.ubicacionService.obtenerDistritos(provinciaEncotrada).subscribe(data => {
          this.distritos = data;
        });

  }

  // cargarUbicacion(departamento: string, provincia: string) {
  //   this.departamento = this.departamentos?.find(dep => dep.departamentoId === departamento)!.nombre;
  //   this.ubicacionService.obtenerProvincias(departamento).subscribe(data => {
  //     this.provincias = data;
  //     this.provincia = this.provincias.find(prov => prov.provinciaId === provincia)!.nombre;
  //     this.ubicacionService.obtenerDistritos(provincia).subscribe(data => {
  //       this.distritos = data;
  //     });
  //   })
  // }

  soloNumeros(event:Event){
    this.validatorPatientService.soloNumeros(event);
  }



  private obtenerCitasSinFiltro(): void {
    this.citasListPaciente = [];
    this.serialNumberArray = [];
    this.isLoading = true;
    this.citaService.ObtenerCitasMedicasByPacienteId( this.pacienteId)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe((data: CitasMedicaPacienteById[]) => {
        console.log("Respuesta del Servidor:", data);

        this.citasListPaciente = data;
        console.log("lista de citas:",this.citasListPaciente)
        this.totalData = this.citasListPaciente.length;
        console.log(this.totalData)
        for (let index = this.skip; index < Math.min(this.limit, this.totalData); index++) {
          const serialNumber = index + 1;
          this.serialNumberArray.push(serialNumber);
        }
        console.log("Lista de Citas del Paciente2")
        console.log(this.citasListPaciente)
        this.dataSource2 = new MatTableDataSource<CitasMedicaPacienteById>(this.citasListPaciente);
        this.calculateTotalPages(this.totalData, this.pageSize);
      });
  }

  markAllFieldsAsTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

    // Función para convertir FormData a JSON (usado para visualizar la data a enviar)
formDataToJson(formData: FormData): any {
  const jsonObject: any = {};
  formData.forEach((value, key) => {
    if (jsonObject[key]) {
      if (Array.isArray(jsonObject[key])) {
        jsonObject[key].push(value);
      } else {
        jsonObject[key] = [jsonObject[key], value];
      }
    } else {
      jsonObject[key] = value;
    }
  });
  return jsonObject;
}

isFechaNacimientoMayorActual() {
  return this.form.get('fechaNacimiento')?.hasError('fechaNacimientoMayorActual');
}

isCantidadExacta(controlName: string) {
  const control = this.form.get(controlName);
  return control?.errors && (control?.errors['maxlength'] || control?.errors['minlength']);
}

isEmail(controlName: string) {
  const control = this.form.get(controlName);
  return control?.errors && control?.errors['email'];
}

actualizarEdad() {
  const fechaNacimiento = this.form.get('fechaNacimiento')!.value;
  if (fechaNacimiento) {
    const fechaNacimientoDate: Date = new Date(fechaNacimiento);
    const hoy: Date = new Date();
    const edadMilisegundos: number = hoy.getTime() - fechaNacimientoDate.getTime();
    const edadFecha: Date = new Date(edadMilisegundos);
    const edad: number = Math.abs(edadFecha.getUTCFullYear() - 1970);
    this.pacienteData.edad = edad.toString();
  } else {
    this.pacienteData.edad = '';
  }
}

  actualizarPaciente() {
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      console.log("update return")
      this.markAllFieldsAsTouched();
      return;
    }
    console.log("update done")

    this.isFormSubmitted = true;
    this.pacienteData.clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    if (this.form.get("sexo")!.value == "M") {
      this.pacienteData.sexo = 'M'
    } else {
      this.pacienteData.sexo = 'F'
    }
    this.pacienteData.usuarioId = this.usuarioId;
    const formData = new FormData();
    formData.append('FotoPaciente', this.pacienteData.foto);
    formData.append('PacienteId', this.pacienteData.pacienteId);
    if (this.pacienteData.aseguradoraId) { formData.append('AseguradoraId', this.pacienteData.aseguradoraId); }
    if (this.pacienteData.observacion) { formData.append('Observacion', this.pacienteData.observacion); }
    if (this.pacienteData.titulo) { formData.append('Titulo', this.pacienteData.titulo); }
    if (this.pacienteData.empresaId) { formData.append('EmpresaId', this.pacienteData.empresaId); }
    if (this.pacienteData.email) { formData.append('Email', this.pacienteData.email); }
    formData.append('TipoDocumentoId', this.pacienteData.tipoDocumentoId);
    formData.append('NumeroDocumento', this.pacienteData.numeroDocumento);
    formData.append('Apellidos', this.pacienteData.apellidos);
    formData.append('Nombres', this.pacienteData.nombres);
    formData.append('FechaNacimiento', this.pacienteData.fechaNacimiento.toString().split('T')[0]);
    formData.append('Edad', this.pacienteData.edad);
    if (this.pacienteData.ocupacion)  {formData.append('Ocupacion', this.pacienteData.ocupacion);}
    formData.append('Direccion', this.pacienteData.direccion);
    formData.append('EstudioId', this.pacienteData.estudioId);
    formData.append('PaisId', this.pacienteData.paisId.toString());
    formData.append('Ubigeo', this.pacienteData.ubigeo.toString());
    formData.append('Celular', this.pacienteData.celular);
    formData.append('TipoPacienteId', this.pacienteData.tipoPacienteId);
    formData.append('EstadoCivilId', this.pacienteData.estadoCivilId);
    formData.append('Sexo', this.pacienteData.sexo);
    formData.append('InformacionClinicaId', this.pacienteData.informacionClinicaId);
    if (this.pacienteData.contactoEmergencia)  {formData.append('contactoEmergencia', this.pacienteData.contactoEmergencia);}
    formData.append('TipoHistoria', this.pacienteData.tipoHistoria);
    formData.append('SedeId', this.sedeId);
    formData.append('ClinicaId', this.pacienteData.clinicaId);
    formData.append('UsuarioId', this.pacienteData.usuarioId);
    formData.append('Estado', this.pacienteData.estado);

    if (this.pacienteData.observacion)  {formData.append('observacion',this.pacienteData.observacion);}
    if (this.pacienteData.telefonoParentesco)  {formData.append('telefonoParentesco',this.pacienteData.telefonoParentesco);}
    if (this.pacienteData.domicilioParentesco)  { formData.append('domicilioParentesco',this.pacienteData.domicilioParentesco);}
    if (this.pacienteData.tipoParentesco) {formData.append('tipoParentesco',this.pacienteData.tipoParentesco)}

    console.log('FormData:', this.formDataToJson(formData));
    this.pacienteService.actualizarPaciente(formData, this.pacienteData.pacienteId).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire({
            title: 'Actualizando...',
            allowOutsideClick: false,
          })
          Swal.showLoading();
          Swal.close();
          Swal.fire('Correcto', 'Paciente actualizado en el sistema correctamente.', 'success');
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.obtenerCitasSinFiltro();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      var limit = pageSize * i;
      var skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }



  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.obtenerCitasSinFiltro();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.obtenerCitasSinFiltro();
    }
  }

  // data historial cita
  getEstadoInfo(estado: string): { nombre: string, clase: string } {
    let estadoInfo = { nombre: '', clase: '' };

    switch (estado) {
      case '0':
        estadoInfo.nombre = 'Nuevo';
        estadoInfo.clase = 'custom-badge status-green';
        break;
      case '1':
        estadoInfo.nombre = 'Reingreso';
        estadoInfo.clase = 'custom-badge status-orange';
        break;
      case '2':
        estadoInfo.nombre = 'Continuador';
        estadoInfo.clase = 'custom-badge status-blue';
        break;
      default:
        estadoInfo.nombre = '';
        estadoInfo.clase = '';
        break;
    }
    return estadoInfo;
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



