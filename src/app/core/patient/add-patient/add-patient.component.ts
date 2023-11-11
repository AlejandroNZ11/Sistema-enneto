import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { PacienteRequest, PacienteListData, PacienteList } from 'src/app/shared/models/paciente';
import { routes } from 'src/app/shared/routes/routes';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Ipais } from 'src/app/shared/models/pais';
import { Idepartamento } from 'src/app/shared/models/departamento';
import { Iprovincia } from 'src/app/shared/models/provincia';
import { Idistrito } from 'src/app/shared/models/distrito';
import { UbicacionService } from 'src/app/shared/services/ubicacion.service';
import { environment } from 'src/environments/environments';
import { AseguradorasService } from 'src/app/shared/services/aseguradoras.service';
import { Iaseguradoras } from 'src/app/shared/models/aseguradoras';
import { UserLoggedService } from 'src/app/shared/services/user-logged.service';
import { sede } from 'src/app/shared/models/sede';

interface data {
  value: string;
}
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  constructor(public formBuilder: FormBuilder, public pacienteService: PacienteService, public router: Router, public ubicacionService: UbicacionService,
    public aseguradoraService: AseguradorasService, public user: UserLoggedService) { }
  public routes = routes;
  public selectedValue!: string;
  paciente: PacienteRequest = new PacienteRequest();
  form!: FormGroup;
  cantidad!: number;
  imagenSubirFoto!: File;
  readerFoto = new FileReader();
  isFormSubmitted = false;
  public deleteIcon = true;
  sedeId!: string;
  paises!: Ipais[];
  departamentos!: Idepartamento[];
  provincias!: Iprovincia[];
  distritos!: Idistrito[];
  departamento!:string;
  provincia!:string;
  aseguradoras!: Iaseguradoras[];
  estadosCiviles!: any[];
  tiposPacientes!: any[];
  historias!: any[];
  infoClinicas!: any[];
  gradosInstruccion!: any[];
  empresas!: any[];
  ngOnInit(): void {
    this.ubicacionService.obtenerPaises().subscribe(data => { this.paises = data; })
    this.ubicacionService.obtenerDepartamentos().subscribe(data => { this.departamentos = data; })
    this.aseguradoraService.obtenerAseguradoras().subscribe(data => { this.aseguradoras = data; })
    let getCheckedSexo = null
    this.sexo_LISTA.forEach((o) => {
      if (o.checked) getCheckedSexo = o.value;
    });
    this.sedeId = this.user.selectedSucursal.id.toString();
    this.form = this.formBuilder.group({
      tipoDocumentoId: ['', [Validators.required, Validators.maxLength(40)]],
      numeroDocumento: ['', [Validators.required, Validators.maxLength(this.cantidad), Validators.minLength(this.cantidad), Validators.pattern('^[0-9]+$')]],
      nombres: ['', [Validators.required, Validators.maxLength(100)]],
      apellidos: ['', [Validators.required, Validators.maxLength(100)]],
      fechaNacimiento: ['', [Validators.required, this.fechaNacimientoValidator()]],
      edad: [{ value: '', disabled: true }, [Validators.maxLength(2), Validators.minLength(1), Validators.required]],
      ocupacion: ['', [Validators.required, Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      gradoInstruccionId: ['', [Validators.required, Validators.maxLength(100)]],
      paisId: ['', [Validators.required, Validators.maxLength(100)]],
      departamento: ['', [Validators.required, Validators.maxLength(100)]],
      provincia: ['', [Validators.required, Validators.maxLength(100)]],
      ubigeo: ['', [Validators.required, Validators.maxLength(100)]],
      celular: ['', [Validators.maxLength(9), Validators.minLength(9), Validators.required]],
      tipoPacienteId: ['', [Validators.required, Validators.maxLength(100)]],
      estadoCivil: ['', [Validators.required, Validators.maxLength(100)]],
      sexo: [getCheckedSexo, [Validators.required]],
      formaEnteroClinica: ['', [Validators.required, Validators.maxLength(100)]],
      nombreContacto: ['', [Validators.maxLength(100)]],
      tipoHistoria: ['', [Validators.required, Validators.maxLength(100)]],
      aseguradoraId: ['', [Validators.required, Validators.maxLength(100)]],
      empresaId: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      fotoPaciente: ['', Validators.required],
      titulo: ['', Validators.required],
      observacion: ['', [Validators.required, Validators.maxLength(100)]],
    })
  }
  sexo_LISTA = [
    { name: 'Masculino', value: 'Masculino', checked: false },
    { name: 'Femenino', value: 'Femenino', checked: false },
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

  actualizarProvincias() {
    if (this.departamento) {
      const departamentoEncontrado = this.departamentos.find(dep => dep.nombre === this.departamento)!.departamentoId;
      this.ubicacionService.obtenerProvincias(departamentoEncontrado).subscribe(data => {
        this.provincias = data;
      })
    }
  }
  actualizarDistritos() {
    if (this.provincia) {
      const provinciaEncotrada = this.provincias.find(prov => prov.nombre == this.provincia)!.provinciaId;
      this.ubicacionService.obtenerDistritos(provinciaEncotrada).subscribe(data => {
        this.distritos = data;
      })
    }
  }
  actualizarEdad() {
    const fechaNacimiento = this.form.get('fechaNacimiento')!.value;
    if (fechaNacimiento) {
      const fechaNacimientoDate: Date = new Date(fechaNacimiento);
      const hoy: Date = new Date();
      const edadMilisegundos: number = hoy.getTime() - fechaNacimientoDate.getTime();
      const edadFecha: Date = new Date(edadMilisegundos);
      const edad: number = Math.abs(edadFecha.getUTCFullYear() - 1970);
      this.paciente.Edad = edad.toString();
      console.log(edad);
    } else {
      this.paciente.Edad = '';
    }
  }
  obtenerPaciente() {
    if (this.paciente.NumeroDocumento) {
      this.pacienteService.getPaciente(this.paciente.NumeroDocumento).subscribe(paciente => {
        if (paciente.success == true) {
          this.paciente.Nombres = paciente.data.nombres;
          this.paciente.Apellidos = paciente.data.apellido_paterno + " " + paciente.data.apellido_materno
        }
        else {
          this.paciente.Nombres = "";
          this.paciente.Apellidos = "";
          Swal.fire({
            icon: 'info',
            title: paciente.message.toString(),
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
  }
  actualizarCantidad() {
    console.log(this.paciente.TipoDocumentoId);
    this.form.get('numeroDocumento')!.setValue('');
    const tipoDocumento = this.form.get('tipoDocumentoId')!.value;
    let maxCaracteres = 0;
    switch (tipoDocumento) {
      case '01':
        maxCaracteres = 8;
        break;
      case '06':
        maxCaracteres = 11;
        break;
      default:
        maxCaracteres = 12;
        break;
    }
    this.cantidad = maxCaracteres;
    this.form.get('numeroDocumento')?.setValidators([
      Validators.required,
      Validators.maxLength(maxCaracteres),
      Validators.minLength(maxCaracteres),
      Validators.pattern('^[0-9]+$')
    ]);
    this.form.get('numeroDocumento')?.updateValueAndValidity();
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
  /* V A L I D A C I O N E S*/
  isFechaNacimientoMayorActual() {
    return this.form.get('fechaNacimiento')?.hasError('fechaNacimientoMayorActual');
  }
  isCantidadNroDocumento(controlName: string) {
    const control = this.form.get(controlName);
    console.log(this.cantidad);
    if (control && control.value) {
      const cantidadCorrecta = this.cantidad;
      return control.value.length !== cantidadCorrecta;
    }
    return false;
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
  }
  imagenTempFoto!: string | ArrayBuffer | null;
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
        };
      };
      reader.readAsDataURL(file);
    } else {
      this.imagenTempFoto = null;
    }
  }

  /* C R E A R - P A C I E N T E */
  crearPaciente() {
    console.log()
    /*     if (this.form.invalid) {
          this.isFormSubmitted = true;
          this.markAllFieldsAsTouched();
          return;
        } */
    if (this.form.get("sexo")!.value == "M") {
      this.paciente.Sexo = 'M'
    } else {
      this.paciente.Sexo = 'F'
    }
    const formData = new FormData();
    formData.append('FotoPaciente', this.imagenSubirFoto, this.imagenSubirFoto.name)
    formData.append('TipoDocumentoId', this.paciente.TipoDocumentoId);
    formData.append('NumeroDocumento', this.paciente.NumeroDocumento);
    formData.append('Apellidos', this.paciente.Apellidos);
    formData.append('Nombres', this.paciente.Nombres);
    formData.append('FechaNacimiento', this.paciente.FechaNacimiento.toISOString().split('T')[0]);
    formData.append('Edad', this.paciente.Edad);
    formData.append('Ocupacion', this.paciente.Ocupacion);
    formData.append('Direccion', this.paciente.Direccion);
    formData.append('GradoInstruccionId', 'S');
    formData.append('PaisId', this.paciente.PaisId);
    formData.append('Ubigeo', '1');
    formData.append('Celular', this.paciente.Celular);
    formData.append('TipoPacienteId', '3');
    formData.append('EstadoCivil', 'C');
    formData.append('Sexo', this.paciente.Sexo);
    formData.append('FormaEnteroClinica', '1');
    formData.append('NombreContacto', this.paciente.NombreContacto);
    formData.append('TipoHistoria', this.paciente.TipoHistoria);
    formData.append('AseguradoraId', this.paciente.AseguradoraId);
    formData.append('EmpresaId', 'ED8AD1BA-51EF-457D-9E22-3033FCBFD13A');
    formData.append('Email', this.paciente.Email);
    formData.append('SedeId', this.sedeId);
    formData.append('Observacion', this.paciente.Observacion);
    formData.append('Titulo', this.paciente.Titulo);
    formData.append('ClinicaId', this.paciente.ClinicaId);
    formData.append('UsuarioId', this.paciente.UsuarioId);
    this.pacienteService.crearPaciente(formData).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire({
            title: 'Registrando...',
            allowOutsideClick: false,
          })
          Swal.showLoading();
          Swal.close();
          Swal.fire('Correcto', 'Paciente registrado en el sistema correctamente.', 'success');
          this.router.navigate(['/patient/patient-list']);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }

}
