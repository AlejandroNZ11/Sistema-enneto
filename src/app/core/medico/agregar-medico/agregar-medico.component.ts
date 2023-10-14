import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DataEspecialidad, Iespecialidad } from 'src/app/shared/models/especialidades';
import { MedicoRequest } from 'src/app/shared/models/medico';
import { routes } from 'src/app/shared/routes/routes';
import { MedicoService } from 'src/app/shared/services/medico.service';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface data {
  value: string;
}
@Component({
  selector: 'app-agregar-medico',
  templateUrl: './agregar-medico.component.html',
  styleUrls: ['./agregar-medico.component.scss']
})
export class AgregarMedicoComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public medicoService: MedicoService, public especialidadService: EspecialidadesService, public router: Router) { }
  especialidad_LISTA: Array<Iespecialidad> = [];
  doctor: MedicoRequest = new MedicoRequest();
  form!: FormGroup;
  cantidad!: number;
  imagenSubirFoto!: File;
  imagenSubirFirma!: File;
  readerFoto = new FileReader();
  readerFirma = new FileReader();
  isFormSubmitted = false;
  public routes = routes;
  public tipoDocumento !: string;
  public especialidades !: string[];
  public deleteIcon = true;
  ngOnInit(): void {
    this.especialidadService.obtenerEspecialidades("D30C2D1E-E883-4B2D-818A-6813E15046E6", 1, 100).subscribe((data: DataEspecialidad) => {
      this.especialidad_LISTA = data.data;
    });
    this.isFormSubmitted = false;
    let getCheckedSexo = null
    this.sexo_LISTA.forEach((o) => {
      if (o.checked) getCheckedSexo = o.value;
    });
    this.form = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.maxLength(100)]],
      apellidos: ['', [Validators.required, Validators.maxLength(100)]],
      abreviatura: ['', [Validators.required, Validators.maxLength(4)]],
      celular: ['', [Validators.maxLength(9), Validators.minLength(9), Validators.required]],
      telefono: ['', [Validators.maxLength(7), Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      tipoDocumento: ['', [Validators.required, Validators.maxLength(40)]],
      numeroDocumento: ['', [Validators.required, Validators.maxLength(this.cantidad), Validators.minLength(this.cantidad), Validators.pattern('^[0-9]+$')]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      fechaNacimiento: ['', [Validators.required, this.fechaNacimientoValidator()]],
      sexo: [getCheckedSexo, [Validators.required]],
      especialidades: ['', [Validators.required]],
      colegioMedico: ['', [Validators.required, Validators.maxLength(4)]],
      foto: ['', Validators.required],
      firma: ['', Validators.required]
    })
  }
  sexo_LISTA = [
    { name: 'Masculino', value: 'Masculino', checked: false },
    { name: 'Femenino', value: 'Femenino', checked: false },
  ]
  estado_LISTA = [
    { name: 'Activo', value: 1, checked: true },
    { name: 'Inactivo', value: 0, checked: false },
  ]
  tipoDoc_LISTA: data[] = [
    { value: 'DNI', },
    { value: 'RUC' },
    { value: 'PASAPORTE' },
    { value: 'CARNET EXTRANJERIA' },
    { value: 'OTROS' },
  ];
  obtenerCliente() {
    if (this.doctor.NumeroDocumento) {
      this.medicoService.getMedico(this.doctor.NumeroDocumento).subscribe(medico => {
        if (medico.success == true) {
          this.doctor.Nombres = medico.data.nombres;
          this.doctor.Apellidos = medico.data.apellido_paterno + " " + medico.data.apellido_materno
        }
        else {
          this.doctor.Nombres = "";
          this.doctor.Apellidos = "";
          Swal.fire({
            icon: 'info',
            title: medico.message.toString(),
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }

  }
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
  imagenTempFoto!: string | ArrayBuffer | null;
  imagenTempFirma!: string | ArrayBuffer | null;

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
  crearMedico() {
    console.log(this.doctor.FechaNacimiento.toISOString().split('T')[0]);
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.markAllFieldsAsTouched();
      return;
    }
    this.isFormSubmitted = false;
    if (this.form.get("sexo")!.value == "Masculino") {
      this.doctor.Sexo = 'M'
    } else {
      this.doctor.Sexo = 'F'
    }
    this.doctor.Especialidades = this.especialidades;
    switch (this.form.get('tipoDocumento')!.value) {
      case 'DNI': this.doctor.TipoDocumento = '01'; break;
      case 'RUC': this.doctor.TipoDocumento = '06'; break;
      case 'PASAPORTE': this.doctor.TipoDocumento = '07'; break;
      case 'CARNET EXTRANJERIA': this.doctor.TipoDocumento = '04'; break;
      case 'OTROS': this.doctor.TipoDocumento = '00'; break;
    }

    const formData = new FormData();
    formData.append('fotoForm', this.imagenSubirFoto, this.imagenSubirFoto.name)
    formData.append('firmaForm', this.imagenSubirFirma, this.imagenSubirFirma.name)

    for (let i = 0; i < this.doctor.Especialidades.length; i++) {
      formData.append('Especialidades', this.doctor.Especialidades[i]);
    }
    console.log(this.doctor.FechaNacimiento.toISOString().split('T')[0]);
    formData.append('Nombres', this.doctor.Nombres);
    formData.append('Apellidos', this.doctor.Apellidos);
    formData.append('Abreviatura', this.doctor.Abreviatura);
    formData.append('TipoDocumento', this.doctor.TipoDocumento);
    formData.append('NumeroDocumento', this.doctor.NumeroDocumento);
    formData.append('ColegioMedico', this.doctor.ColegioMedico);
    formData.append('Telefono', this.doctor.Telefono);
    formData.append('Celular', this.doctor.Celular);
    formData.append('Direccion', this.doctor.Direccion);
    formData.append('Email', this.doctor.Email);
    formData.append('FechaNacimiento', this.doctor.FechaNacimiento.toISOString().split('T')[0]);
    formData.append('Sexo', this.doctor.Sexo);
    formData.append('ClinicaId', this.doctor.ClinicaId);
    formData.append('UsuarioId', this.doctor.UsuarioId);
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
