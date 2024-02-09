/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iaseguradoras } from 'src/app/shared/models/aseguradoras';
import { Idepartamento } from 'src/app/shared/models/departamento';
import { Idistrito } from 'src/app/shared/models/distrito';
import { Iempresa } from 'src/app/shared/models/empresa';
import { IestadoCivil } from 'src/app/shared/models/estadoCivil';
import { IformaEnteroClinica } from 'src/app/shared/models/formaEnteroClinica';
import { IgradoInstruccion } from 'src/app/shared/models/estudio';
import { PacienteEditar } from 'src/app/shared/models/paciente';
import { Ipais } from 'src/app/shared/models/pais';
import { Iprovincia } from 'src/app/shared/models/provincia';
import { ItipoPaciente } from 'src/app/shared/models/tipoPaciente';
import { routes } from 'src/app/shared/routes/routes';
import { AseguradorasService } from 'src/app/shared/services/aseguradoras.service';
import { EmpresaPacienteService } from 'src/app/shared/services/empresa-paciente.service';
import { EstadoCivilService } from 'src/app/shared/services/estado-civil.service';
import { FormaEnteroClinicaService } from 'src/app/shared/services/forma-entero-clinica.service';
import { GradoInstruccionService } from 'src/app/shared/services/grado-instruccion.service';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import { TipoPacienteService } from 'src/app/shared/services/tipo-paciente.service';
import { UbicacionService } from 'src/app/shared/services/ubicacion.service';
import { UserLoggedService } from 'src/app/shared/services/user-logged.service';
import Swal from 'sweetalert2';
interface data {
  value: string;
}
@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {
  constructor(public formBuilder: FormBuilder, public pacienteService: PacienteService, public router: Router, public ubicacionService: UbicacionService,
    public aseguradoraService: AseguradorasService, public user: UserLoggedService, public tipoPacienteService: TipoPacienteService, public gradoInstService: GradoInstruccionService,
    public formaEntClinicaService: FormaEnteroClinicaService, public estadoCivilService: EstadoCivilService, public empresaService: EmpresaPacienteService, private route: ActivatedRoute) { }
  imagenSubirFoto!: File;
  otraFoto = false;
  readerFoto = new FileReader();
  public deleteIcon = true;
  imagenTempFoto!: string | ArrayBuffer | null;
  public routes = routes;
  public selectedValue!: string;
  isFormSubmitted = false;
  pacienteId = "";
  pacienteEditar!: PacienteEditar;
  tipoDocumento !: string;
  nroDocumento !: string;
  sexoPaciente!: string;
  estadoPaciente!: number;
  form!: FormGroup;
  date = new FormControl(new Date());
  paises!: Ipais[];
  departamentos!: Idepartamento[];
  provincias!: Iprovincia[];
  distritos!: Idistrito[];
  departamento!: string;
  provincia!: string;
  aseguradoras!: Iaseguradoras[];
  estadosCiviles!: IestadoCivil[];
  tiposPacientes!: ItipoPaciente[];
  infoClinicas!: IformaEnteroClinica[];
  gradosInstruccion!: IgradoInstruccion[];
  empresas!: Iempresa[];
  sedeId!: string;
  usuarioId!: string;
  ngOnInit(): void {
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
    })
    this.ubicacionService.obtenerPaises().subscribe(data => { this.paises = data; })
    this.ubicacionService.obtenerDepartamentos().subscribe(data => { this.departamentos = data; })
    this.aseguradoraService.obtenerAseguradoras().subscribe(data => { this.aseguradoras = data; })
    this.estadoCivilService.obtenerEstadosCiviles().subscribe(data => { this.estadosCiviles = data; })
    this.tipoPacienteService.obtenerTipoPacientes().subscribe(data => { this.tiposPacientes = data; })
    this.formaEntClinicaService.obtenerFormaEnteroClinicas().subscribe(data => { this.infoClinicas = data; })
    this.gradoInstService.obtenerGradoInstruccion().subscribe(data => { this.gradosInstruccion = data; })
    this.empresaService.obtenerEmpresasPacientes().subscribe(data => { this.empresas = data; })
    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })
    this.usuarioId = this.user.usuario.personalId.toString();
    this.sedeId = this.user.selectedSucursal.id.toString();
    if (this.pacienteId != '') {
      this.pacienteService.obtenerPaciente(this.pacienteId).subscribe(async (paciente: PacienteEditar) => {
        if (paciente) {
          this.pacienteEditar = paciente;
          this.imagenTempFoto = this.pacienteEditar.foto;
          this.sexoPaciente = this.pacienteEditar.sexo;
          if (this.pacienteEditar.estado == "I") {
            this.estadoPaciente = 0
          } else if (this.pacienteEditar.estado == "A") {
            this.estadoPaciente = 1
          } else {
            this.estadoPaciente = parseInt(this.pacienteEditar.estado);
          }

          switch (this.pacienteEditar.tipoDocumentoId) {
            case '01': this.tipoDocumento = 'DNI'; break;
            case '06': this.tipoDocumento = 'RUC'; break;
            case '07': this.tipoDocumento = 'PASAPORTE'; break;
            case '04': this.tipoDocumento = 'CARNET EXTRANJERIA'; break;
            case '00': this.tipoDocumento = 'OTROS'; break;
          }
          this.nroDocumento = paciente.numeroDocumento;
        }
        const departamentoId = (this.pacienteEditar!.ubigeo.substring(0, 2));
        const provinciaId = (this.pacienteEditar!.ubigeo.substring(0, 4));
        this.cargarUbicacion(departamentoId, provinciaId);
      })
    }
  }

  sexo_LISTA = [
    { name: 'Masculino', value: 'M', checked: false },
    { name: 'Femenino', value: 'F', checked: false },
  ]
  historiaPaciente_LISTA = [
    { name: 'ANTIGUO', value: 'A' },
    { name: 'NUEVO', value: 'N' },
  ]
  estado_LISTA = [
    { name: 'Activo', value: 1, checked: true },
    { name: 'Inactivo', value: 0, checked: false },
  ]
  tipoDocumento_LISTA = [
    { name: 'DNI', value: '01' },
    { name: 'RUC', value: '06' },
    { name: 'PASAPORTE', value: '07' },
    { name: 'CARNET EXTRANJERIA', value: '04' },
    { name: 'OTROS', value: '00' },
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
    this.departamento = this.departamentos.find(dep => dep.departamentoId === departamento)!.nombre;
    this.ubicacionService.obtenerProvincias(departamento).subscribe(data => {
      this.provincias = data;
      this.provincia = this.provincias.find(prov => prov.provinciaId === provincia)!.nombre;
      this.ubicacionService.obtenerDistritos(provincia).subscribe(data => {
        this.distritos = data;
      });
    })
  }
  deleteIconFunc() {
    this.deleteIcon = !this.deleteIcon
  }
  actualizarEdad() {
    const fechaNacimiento = this.form.get('fechaNacimiento')!.value;
    if (fechaNacimiento) {
      const fechaNacimientoDate: Date = new Date(fechaNacimiento);
      const hoy: Date = new Date();
      const edadMilisegundos: number = hoy.getTime() - fechaNacimientoDate.getTime();
      const edadFecha: Date = new Date(edadMilisegundos);
      const edad: number = Math.abs(edadFecha.getUTCFullYear() - 1970);
      this.pacienteEditar.edad = edad.toString();
    } else {
      this.pacienteEditar.edad = '';
    }
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
  isFechaNacimientoMayorActual() {
    return this.form.get('fechaNacimiento')?.hasError('fechaNacimientoMayorActual');
  }
  isCantidadExacta(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && (control?.errors['maxlength'] || control?.errors['minlength']);
  }
  isCantidad(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && (control?.errors['maxlength']);
  }
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
  isEmail(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control?.errors['email'];
  }
  markAllFieldsAsTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  soloNumeros(event: Event) {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    input.value = currentValue.replace(/[^0-9]/g, '');
  }
  /* C A R G A R - I M A G E N */
  deleteIconFuncFoto() {
    this.imagenTempFoto = "assets/img/user.jpg"
    this.otraFoto = true;
  }
  cargarImagenFoto(event: any) {
    const file = event.target.files[0] as File;
    if (file) {
      const nombreArchivo = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target!.result as string;
        image.onload = () => {
          this.imagenTempFoto = image.src;
          this.imagenSubirFoto = file;
          this.otraFoto = true;
        };
      };
      reader.readAsDataURL(file);
    } else {
      this.imagenTempFoto = null;
    }
  }
  actualizarPaciente() {
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.markAllFieldsAsTouched();
      return;
    }
    this.isFormSubmitted = false;
    this.pacienteEditar.clinicaId = 'D30C2D1E-E883-4B2D-818A-6813E15046E6';
    if (this.form.get("sexo")!.value == "Masculino") {
      this.pacienteEditar.sexo = 'M'
    } else {
      this.pacienteEditar.sexo = 'F'
    }
    if (this.form.get("estado")!.value == 1) {
      this.pacienteEditar.estado = 'A'
    } else {
      this.pacienteEditar.estado = 'I'
    }
    this.pacienteEditar.usuarioId = this.usuarioId;
    const formData = new FormData();
    if (this.otraFoto) {
      if (this.imagenSubirFoto) { formData.append('FotoPaciente', this.imagenSubirFoto, this.imagenSubirFoto.name) }
      else { formData.append('FotoPaciente', '') }
    } else {
      formData.append('FotoPaciente', this.pacienteEditar.foto)
    }
    formData.append('PacienteId', this.pacienteEditar.pacienteId);
    if (this.pacienteEditar.aseguradoraId) { formData.append('AseguradoraId', this.pacienteEditar.aseguradoraId); }
    if (this.pacienteEditar.observacion) { formData.append('Observacion', this.pacienteEditar.observacion); }
    if (this.pacienteEditar.titulo) { formData.append('Titulo', this.pacienteEditar.titulo); }
    if (this.pacienteEditar.empresaId) { formData.append('EmpresaId', this.pacienteEditar.empresaId); }
    if (this.pacienteEditar.email) { formData.append('Email', this.pacienteEditar.email); }
    formData.append('TipoDocumentoId', this.pacienteEditar.tipoDocumentoId);
    formData.append('NumeroDocumento', this.pacienteEditar.numeroDocumento);
    formData.append('Apellidos', this.pacienteEditar.apellidos);
    formData.append('Nombres', this.pacienteEditar.nombres);
    formData.append('FechaNacimiento', this.pacienteEditar.fechaNacimiento.toString().split('T')[0]);
    formData.append('Edad', this.pacienteEditar.edad);
    formData.append('Ocupacion', this.pacienteEditar.ocupacion);
    formData.append('Direccion', this.pacienteEditar.direccion);
    formData.append('EstudioId', this.pacienteEditar.estudioId);
    formData.append('PaisId', this.pacienteEditar.paisId.toString());
    formData.append('Ubigeo', this.pacienteEditar.ubigeo.toString());
    formData.append('Celular', this.pacienteEditar.celular);
    formData.append('TipoPacienteId', this.pacienteEditar.tipoPacienteId);
    formData.append('EstadoCivilId', this.pacienteEditar.estadoCivilId);
    formData.append('Sexo', this.pacienteEditar.sexo);
    formData.append('InformacionClinicaId', this.pacienteEditar.informacionClinicaId);
    if (this.pacienteEditar.contactoEmergencia) { formData.append('NombreContacto', this.pacienteEditar.contactoEmergencia); }
    formData.append('TipoHistoria', this.pacienteEditar.tipoHistoria);
    formData.append('SedeId', this.sedeId);
    formData.append('ClinicaId', this.pacienteEditar.clinicaId);
    formData.append('UsuarioId', this.pacienteEditar.usuarioId);
    formData.append('Estado', this.pacienteEditar.estado);
    this.pacienteService.actualizarPaciente(formData, this.pacienteEditar.pacienteId).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire({
            title: 'Actualizando...',
            allowOutsideClick: false,
          })
          Swal.showLoading();
          Swal.close();
          Swal.fire('Correcto', 'Paciente actualizado en el sistema correctamente.', 'success');
          this.router.navigate(['/paciente/registro']);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}
