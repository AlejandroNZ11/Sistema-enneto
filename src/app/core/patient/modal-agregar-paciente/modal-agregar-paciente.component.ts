/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Idepartamento } from 'src/app/shared/models/departamento';
import { Idistrito } from 'src/app/shared/models/distrito';
import { Iempresa } from 'src/app/shared/models/empresa';
import { IestadoCivil } from 'src/app/shared/models/estadoCivil';
import { IgradoInstruccion } from 'src/app/shared/models/estudio';
import { IformaEnteroClinica } from 'src/app/shared/models/formaEnteroClinica';
import { PacienteRequest } from 'src/app/shared/models/paciente';
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

@Component({
  selector: 'app-modal-agregar-paciente',
  templateUrl: './modal-agregar-paciente.component.html',
  styleUrls: ['./modal-agregar-paciente.component.scss']
})
export class ModalAgregarPacienteComponent implements OnInit{
  constructor(public formBuilder: FormBuilder, public pacienteService: PacienteService, public router: Router, public ubicacionService: UbicacionService,public bsModalRef: BsModalRef,
    public aseguradoraService: AseguradorasService, public user: UserLoggedService, public tipoPacienteService: TipoPacienteService, public gradoInstService: GradoInstruccionService,
    public formaEntClinicaService: FormaEnteroClinicaService, public estadoCivilService: EstadoCivilService, public empresaService: EmpresaPacienteService) { }
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
  usuarioId!: string;
  paises!: Ipais[];
  departamentos!: Idepartamento[];
  provincias!: Iprovincia[];
  distritos!: Idistrito[];
  departamento!: string;
  provincia!: string;
  edad!: number;
  estadosCiviles!: IestadoCivil[];
  tiposPacientes!: ItipoPaciente[];
  infoClinicas!: IformaEnteroClinica[];
  gradosInstruccion!: IgradoInstruccion[];
  modalRef?: BsModalRef;
  ngOnInit(): void {
    this.ubicacionService.obtenerPaises().subscribe(data => { this.paises = data; })
    this.ubicacionService.obtenerDepartamentos().subscribe(data => { this.departamentos = data; })
    this.estadoCivilService.obtenerEstadosCiviles().subscribe(data => { this.estadosCiviles = data; })
    this.tipoPacienteService.obtenerTipoPacientes().subscribe(data => { this.tiposPacientes = data; })
    this.formaEntClinicaService.obtenerFormaEnteroClinicas().subscribe(data => { this.infoClinicas = data; })
    this.gradoInstService.obtenerGradoInstruccion().subscribe(data => { this.gradosInstruccion = data; })
    let getCheckedSexo = null
    this.sexo_LISTA.forEach((o) => {
      if (o.checked) getCheckedSexo = o.value;
    });
    this.sedeId = this.user.selectedSucursal.id.toString();
    this.usuarioId = this.user.usuario.personalId.toString();
    this.form = this.formBuilder.group({
      tipoDocumentoId: ['', [Validators.required, Validators.maxLength(40)]],
      numeroDocumento: ['', [Validators.required, Validators.maxLength(this.cantidad), Validators.minLength(this.cantidad), Validators.pattern('^[0-9]+$')]],
      nombres: ['', [Validators.required, Validators.maxLength(100)]],
      apellidos: ['', [Validators.required, Validators.maxLength(100)]],
      nombreContacto: ['', [Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.maxLength(100), Validators.email]],
      estudioId: ['', [Validators.required, Validators.maxLength(100)]],
      celular: ['', [Validators.maxLength(9), Validators.minLength(9), Validators.required]],
      sexo: [getCheckedSexo, [Validators.required]],
      fechaNacimiento: ['', [Validators.required, this.fechaNacimientoValidator()]],
      edad: [{ value: '', disabled: true }, [Validators.maxLength(2), Validators.minLength(1), Validators.required]],
      estadoCivil: ['', [Validators.required, Validators.maxLength(100)]],
      paisId: ['', [Validators.required, Validators.maxLength(100)]],
      sede: [{ value: this.user.selectedSucursal.nombre, disabled: true }, [Validators.required, Validators.maxLength(10)]],
      departamento: ['', [Validators.required, Validators.maxLength(100)]],
      provincia: ['', [Validators.required, Validators.maxLength(100)]],
      ubigeo: ['', [Validators.required, Validators.maxLength(100)]],
      tipoPacienteId: ['', [Validators.required, Validators.maxLength(100)]],
      informacionClinica: ['', [Validators.required, Validators.maxLength(100)]], 
      tipoHistoria: ['', [Validators.required, Validators.maxLength(100)]], 
    })
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
    { name: 'Documento Nacional de Identidad', value: '01' },
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
  /* V A L I D A C I O N E S*/
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
  isCantidadNroDocumento(controlName: string) {
    const control = this.form.get(controlName);
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
    /* C R E A R - P A C I E N T E */
    crearPaciente() {
      if (this.form.invalid) {
        this.isFormSubmitted = true;
        this.markAllFieldsAsTouched();
        return;
      }
      if (this.form.get("sexo")!.value == "M") {
        this.paciente.Sexo = 'M'
      } else {
        this.paciente.Sexo = 'F'
      }
  
      this.paciente.UsuarioId = this.usuarioId;
      const formData = new FormData();
      formData.append('TipoDocumentoId', this.paciente.TipoDocumentoId);
      formData.append('NumeroDocumento', this.paciente.NumeroDocumento);
      formData.append('Apellidos', this.paciente.Apellidos);
      formData.append('Nombres', this.paciente.Nombres);
      formData.append('FechaNacimiento', this.paciente.FechaNacimiento.toISOString().split('T')[0]);
      formData.append('Edad', this.paciente.Edad);
      formData.append('Estado', 'A');
      if (this.paciente.Ocupacion) { formData.append('Ocupacion', this.paciente.Ocupacion); }
      formData.append('Direccion', this.paciente.Direccion);
      formData.append('PaisId', this.paciente.PaisId.toString());
      formData.append('Ubigeo', this.paciente.Ubigeo.toString());
      formData.append('Celular', this.paciente.Celular);
      formData.append('TipoPacienteId', this.paciente.TipoPacienteId);
      formData.append('EstadoCivil', this.paciente.EstadoCivil);
      formData.append('Sexo', this.paciente.Sexo);
      if (this.paciente.NombreContacto) { formData.append('NombreContacto', this.paciente.NombreContacto); }
      formData.append('TipoHistoria', this.paciente.TipoHistoria);
      if (this.paciente.AseguradoraId) { formData.append('AseguradoraId', this.paciente.AseguradoraId); }
      if (this.paciente.EmpresaId) { formData.append('EmpresaId', this.paciente.EmpresaId); }
      if (this.paciente.Email) { formData.append('Email', this.paciente.Email); }
      if (this.imagenSubirFoto) { formData.append('FotoPaciente', this.imagenSubirFoto, this.imagenSubirFoto.name) }
      if (this.paciente.Titulo) { formData.append('Titulo', this.paciente.Titulo); }
      if (this.paciente.Observacion) { formData.append('Observacion', this.paciente.Observacion); }
      formData.append('InformacionClinicaId', this.paciente.InformacionClinicaId);
      formData.append('EstudioId', this.paciente.EstudioId);
      formData.append('SedeId', this.sedeId);
      formData.append('ClinicaId', this.paciente.ClinicaId);
      formData.append('UsuarioId', this.paciente.UsuarioId);
      console.log(this.paciente);
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
            this.bsModalRef.hide();
          } else {
            console.error(response.message);
          }
        },
        (error) => {
          console.error(error);
        });
    }
}
