import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DataEspecialidad, Iespecialidad } from 'src/app/shared/models/especialidades';
import { MedicoRequest, MedicoResponse } from 'src/app/shared/models/medico';
import { routes } from 'src/app/shared/routes/routes';
import { MedicoService } from 'src/app/shared/services/medico.service';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

interface data {
  value: string;
}
@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.scss']
})
export class EditarMedicoComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public medicoService: MedicoService, public especialidadService: EspecialidadesService, public router: Router,
    private route: ActivatedRoute) { }
  especialidad_LISTA: Array<Iespecialidad> = [];
  form!: FormGroup;
  cantidad!: number;
  imagenSubirFoto!: File;
  imagenSubirFirma!: File;
  readerFoto = new FileReader();
  readerFirma = new FileReader();
  isFormSubmitted = false;
  dd: number = new Date().getDate();
  mm: number = new Date().getMonth();
  yyyy: number = new Date().getFullYear();
  hoy: string = this.dd + '/' + this.mm + '/' + this.yyyy;
  public routes = routes;
  public tipoDocumento !: string;
  public especialidades !: string[];
  public deleteIcon = true;
  imagenTempFoto!: string | ArrayBuffer | null;
  imagenTempFirma!: string | ArrayBuffer | null;
  medicoId: string = "";
  medicoEditar!: MedicoResponse;
  sexoMedico!: string ;

  ngOnInit(): void {
    this.isFormSubmitted = false;
    this.route.params.subscribe(params => {
      this.medicoId = params['medicoId'];
      console.log(this.medicoId);
      this.medicoService.obtenerMedico(this.medicoId).subscribe((medico: MedicoResponse) => {
        if (medico) {
          this.medicoEditar = medico;
          this.imagenTempFoto = this.medicoEditar.foto;
          this.imagenTempFirma = this.medicoEditar.firma;
          this.sexoMedico = this.medicoEditar.sexo;
        }
      })
      let elementoActivo = document.querySelector('input[name="status"]:checked');
    })
    this.especialidadService.obtenerEspecialidades("D30C2D1E-E883-4B2D-818A-6813E15046E6", 1, 100).subscribe((data: DataEspecialidad) => {
      this.especialidad_LISTA = data.data;
    });
    this.form = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.maxLength(100)]],
      apellidos: ['', [Validators.required, Validators.maxLength(100)]],
      abreviatura: ['', [Validators.required, Validators.maxLength(4)]],
      celular: ['', [Validators.maxLength(9), Validators.minLength(9)]],
      telefono: ['', [Validators.maxLength(7), Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      fechaNacimiento: ['', [Validators.required, this.fechaNacimientoValidator()]],
      sexo: ['', [Validators.required]],
      especialidades: ['', [Validators.required]],
      colegioMedico: ['', [Validators.required, Validators.maxLength(4)]],
      foto: [''],
      firma: ['']
    })
  }

  sexo_LISTA = [
    { name: 'Masculino', value: 'M'},
    { name: 'Femenino', value: 'F'},
  ]
  estado_LISTA = [
    { name: 'Activo', value: 1, checked: true },
    { name: 'Inactivo', value: 0, checked: false },
  ]

  actualizarCantidad() {
    const tipoDocumento = this.form.get('tipoDocumento')!.value;
    let maxCaracteres = 0;
    switch (tipoDocumento) {
      case 'DNI':
        maxCaracteres = 8;
        break;
      case 'RUC':
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
  deleteIconFuncFirma() {
    this.imagenTempFirma = "assets/img/user.jpg"
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
        };
      };
      reader.readAsDataURL(file);
    } else {
      this.imagenTempFoto = null;
    }
  }
  cargarImagenFirma(event: any) {
    const file = event.target.files[0] as File;
    if (file) {
      const nombreArchivo = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target!.result as string;
        image.onload = () => {
          this.imagenTempFirma = image.src;
          this.imagenSubirFirma = file;
        };
      };
      reader.readAsDataURL(file);
    } else {
      this.imagenTempFirma = null;
    }
  }
  /* C R E A R - M E D I C O */
  actualizarMedico() {
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.markAllFieldsAsTouched();
      return;
    }
    this.isFormSubmitted = false;
    if (this.form.get("sexo")!.value == "Masculino") {
      this.medicoEditar.sexo = 'M'
    } else {
      this.medicoEditar.sexo = 'F'
    }
    const formData = new FormData();
    formData.append('fotoForm', this.imagenSubirFoto, this.imagenSubirFoto.name)
    formData.append('firmaForm', this.imagenSubirFirma, this.imagenSubirFirma.name)
    formData.append('Especialidades', this.medicoEditar.especialidadId);
    formData.append('Nombres', this.medicoEditar.nombre);
    formData.append('Apellidos', this.medicoEditar.apellido);
    formData.append('Abreviatura', this.medicoEditar.abreviatura);
    formData.append('TipoDocumento', this.medicoEditar.tipoDocumentoId);
    formData.append('NumeroDocumento', this.medicoEditar.numeroDocumento);
    formData.append('ColegioMedico', this.medicoEditar.colegioMedico);
    formData.append('Telefono', this.medicoEditar.telefono);
    formData.append('Celular', this.medicoEditar.celular);
    formData.append('Direccion', this.medicoEditar.direccion);
    formData.append('Email', this.medicoEditar.email);
    formData.append('FechaNacimiento', this.medicoEditar.fechaNacimiento.toISOString().split('T')[0]);
    formData.append('Sexo', this.medicoEditar.sexo);
    formData.append('ClinicaId', this.medicoEditar.clinicaId);
    formData.append('UsuarioId', this.medicoEditar.usuarioId);
    console.log(formData);
    this.medicoService.crearMedico(formData).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire({
            title: 'Registrando...',
            allowOutsideClick: false,
          })
          Swal.showLoading();
          Swal.close();
          Swal.fire('Correcto', 'Médico registrado en el sistema correctamente.', 'success');
          this.router.navigate(['/medico/lista-medico']);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}
