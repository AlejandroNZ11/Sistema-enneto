import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { getMonth } from 'ngx-bootstrap/chronos';
import { parseTwoDigitYear } from 'ngx-bootstrap/chronos/units/year';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { DataEspecialidad, Iespecialidad } from 'src/app/shared/models/especialidades';
import { MedicoListData, MedicoRequest, MedicoResponse } from 'src/app/shared/models/medico';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import Swal from 'sweetalert2';

interface data {
  value: string;
}

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public doctorService: DoctorService, public especialidadService: EspecialidadesService) { }
  especialidad_LISTA: Array<Iespecialidad> = [];
  doctor: MedicoRequest = new MedicoRequest();
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
      celular: ['', [Validators.maxLength(9), Validators.minLength(9)]],
      telefono: ['', [Validators.maxLength(7), Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      tipoDocumento: ['', [Validators.required, Validators.maxLength(40)]],
      numeroDocumento: ['', [Validators.required, Validators.maxLength(this.cantidad), Validators.minLength(this.cantidad), Validators.pattern('^[0-9]+$')]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      fechaNacimiento: ['', [Validators.required, this.fechaNacimientoValidator()]],
      sexo: [getCheckedSexo, [Validators.required]],
      especialidades: ['', [Validators.required]],
      colegioMedico: ['', [Validators.required, Validators.maxLength(4)]],
      foto: [''],
      firma: ['']
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
          //this.doctor.foto = nombreArchivo;
          this.imagenSubirFoto = file;
        };
      };
      reader.readAsDataURL(file);
    } else {
      this.imagenTempFoto = null;
      //this.doctor.foto = '';
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
          //this.doctor.firma = nombreArchivo;
          this.imagenSubirFirma = file;
        };
      };
      reader.readAsDataURL(file);
    } else {
      this.imagenTempFirma = null;
      //this.doctor.firma = '';
    }
  }
  /* C R E A R - D O C T O R */ 
  crearDoctor() {
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.markAllFieldsAsTouched();
      return;
    }
    /* if (this.readerFoto.result != null) {
       this.doctor.foto = this.readerFoto.result as string;
       //this.doctor.foto = this.doctor.foto.replace(/^data:image\/[a-z]+;base64,/, "");
     }
     if (this.readerFirma.result != null) {
       this.doctor.firma = this.readerFirma.result as string;
       //this.doctor.firma = this.doctor.firma.replace(/^data:image\/[a-z]+;base64,/, "");
     }*/
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
    formData.append('fotoForm',this.imagenSubirFoto,this.imagenSubirFoto.name)
    formData.append('firmaForm',this.imagenSubirFirma,this.imagenSubirFirma.name)
    formData.append('Especialidades',JSON.stringify(this.doctor.Especialidades));
    formData.append('Nombres',JSON.stringify(this.doctor.Nombres));
    formData.append('Apellidos',JSON.stringify(this.doctor.Apellidos));
    formData.append('Abreviatura',JSON.stringify(this.doctor.Abreviatura));
    formData.append('TipoDocumento',JSON.stringify(this.doctor.TipoDocumento));
    formData.append('NumeroDocumento',JSON.stringify(this.doctor.NumeroDocumento));
    formData.append('ColegioMedico',JSON.stringify(this.doctor.ColegioMedico));
    formData.append('Telefono',JSON.stringify(this.doctor.Telefono));
    formData.append('Celular',JSON.stringify(this.doctor.Celular));
    formData.append('Direccion',JSON.stringify(this.doctor.Direccion));
    formData.append('Email',JSON.stringify(this.doctor.Email));
    formData.append('FechaNacimiento',JSON.stringify(this.doctor.FechaNacimiento));
    formData.append('Sexo',JSON.stringify(this.doctor.Sexo));
    formData.append('ClinicaId',JSON.stringify(this.doctor.ClinicaId));
    formData.append('UsuarioId',JSON.stringify(this.doctor.UsuarioId)); 
    console.log(formData);
    this.doctorService.crearDoctor(formData).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire({
            title: 'Registrando...',
            allowOutsideClick: false,
          })
          Swal.showLoading();
          Swal.close();
          Swal.fire('Correcto', 'Médico registrado en el sistema correctamente.', 'success');
          return;
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}