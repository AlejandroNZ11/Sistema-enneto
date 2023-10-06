import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { PacienteRequest, PacienteListData,PacienteResponse } from 'src/app/shared/models/paciente';
import { routes } from 'src/app/shared/routes/routes';
import { PacienteService } from 'src/app/shared/services/paciente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface data {
  value: string ;
}
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit{
  constructor(public formBuilder: FormBuilder, public pacienteService: PacienteService, public router: Router) { 

  }
  public routes = routes;
  public selectedValue! : string  ;
  paciente: PacienteRequest = new PacienteRequest();
  form!: FormGroup;
  cantidad!: number;
  imagenSubirFoto!: File;
  readerFoto = new FileReader();
  isFormSubmitted = false;
  public tipoDocumento !: string;
  public deleteIcon = true;
  ngOnInit(): void {

  }
  sexo_LISTA = [
    { name: 'Masculino', value: 'Masculino', checked: false },
    { name: 'Femenino', value: 'Femenino', checked: false },
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

  /* C R E A R - P A C I E N T E */
  crearPaciente() {
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.markAllFieldsAsTouched();
      return;
    }
    this.isFormSubmitted = false;
    if (this.form.get("sexo")!.value == "Masculino") {
      this.paciente.Sexo = 'M'
    } else {
      this.paciente.Sexo = 'F'
    }
    switch (this.form.get('tipoDocumento')!.value) {
      case 'DNI': this.paciente.DniPaciente = '01'; break;
      case 'RUC': this.paciente.DniPaciente = '06'; break;
      case 'PASAPORTE': this.paciente.DniPaciente = '07'; break;
      case 'CARNET EXTRANJERIA': this.paciente.DniPaciente = '04'; break;
      case 'OTROS': this.paciente.DniPaciente = '00'; break;
    }

    const formData = new FormData();
    formData.append('fotoForm', this.imagenSubirFoto, this.imagenSubirFoto.name)

    console.log(this.paciente);
    formData.append('Nombre', this.paciente.Nombre);
    formData.append('apellido', this.paciente.Apellido);
    formData.append('edad', this.paciente.Edad);
    formData.append('dniPaciente', this.paciente.DniPaciente);
    formData.append('ocupacion', this.paciente.Ocupacion);
    formData.append('lugarNacimiento', this.paciente.LugarNacimiento);
    formData.append('telefono', this.paciente.Telefono);
    formData.append('celular', this.paciente.Celular);
    formData.append('direccion', this.paciente.Direccion);
    formData.append('email', this.paciente.Email);
    formData.append('fechaNacimiento', this.paciente.FechaNacimiento.toISOString().split('T')[0]);
    formData.append('sexo', this.paciente.Sexo);
    formData.append('clinicaId', this.paciente.ClinicaId);
    formData.append('usuarioId', this.paciente.UsuarioId);
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
