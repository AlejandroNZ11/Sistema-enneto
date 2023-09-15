import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
interface dataGuid {
  value: string;
  guid: string;
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
  imagenSubir!: File;
  readerFoto = new FileReader();
  readerFirma = new FileReader();
  isFormSubmitted = false;
  dd: number = new Date().getDate();
  mm: number = new Date().getMonth();
  yyyy: number = new Date().getFullYear();
  hoy: string = this.dd + '/' + this.mm + '/' + this.yyyy;

  ngOnInit(): void {
    this.especialidadService.obtenerEspecialidades("D30C2D1E-E883-4B2D-818A-6813E15046E6",1,100).subscribe((data: DataEspecialidad) => {
      this.especialidad_LISTA = data.data;
    });
    this.isFormSubmitted = false;
    let getCheckedSexo = null
    let getCheckedEstado = null
    this.sexo_LISTA.forEach((o) => {
      if (o.checked) getCheckedSexo = o.value;
    });
    this.estado_LISTA.forEach((o) => {
      if (o.checked) getCheckedEstado = o.value;
    });

    this.form = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.maxLength(100)]],
      apellidos: ['', [Validators.required, Validators.maxLength(100)]],
      abreviatura: ['', [Validators.required, Validators.maxLength(15)]],
      celular: ['', [Validators.maxLength(9), Validators.minLength(9)]],
      telefono: ['', [Validators.maxLength(7), Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      tipoDocumento: ['', [Validators.required, Validators.maxLength(40)]],
      numeroDocumento: ['', [Validators.required, Validators.maxLength(20)]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      fechaNacimiento: ['', [Validators.required]],
      sexo: [getCheckedSexo, [Validators.required]],
      especialidades: ['', [Validators.required]],
      colegioMedico: ['', [Validators.required, Validators.maxLength(4)]],
      foto: [''],
      firma: ['']
    })
  }
  public routes = routes;
  public tipoDocumento !: string;
  public especialidades !: string[];
  public deleteIcon = true;

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
  deleteIconFuncFoto() {
    this.imagenTempFoto = "assets/img/user.jpg"
  }
  deleteIconFuncFirma() {
    this.imagenTempFirma = "assets/img/user.jpg"
  }
  imagenTempFoto!: string | ArrayBuffer | null;
  imagenTempFirma!: string | ArrayBuffer | null;

  cargarImagenFoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const nombreArchivo = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target!.result as string;
        image.onload = () => {
          this.imagenTempFoto = image.src;
          this.doctor.foto = nombreArchivo;
        };
      };
      reader.readAsDataURL(file);
    } else {
      this.imagenTempFoto = null;
      this.doctor.foto = '';
    }
  }
  cargarImagenFirma(event: any) {
    const file = event.target.files[0];
    if (file) {
      const nombreArchivo = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target!.result as string;
        image.onload = () => {
          this.imagenTempFirma = image.src;
          this.doctor.firma = nombreArchivo;
        };
      };
      reader.readAsDataURL(file);
    } else {
      this.imagenTempFirma = null;
      this.doctor.firma = '';
    }
  }

  markAllFieldsAsTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  crearDoctor() {
    console.log(this.form);

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
    if (this.form.get("sexo")!.value == "Masculino") {
      this.doctor.sexo = "M"
    } else {
      this.doctor.sexo = "F"
    }
    this.doctor.especialidades = this.especialidades;

    switch (this.form.get('tipoDocumento')!.value) {
      case 'DNI': this.doctor.tipoDocumento = '01'; break;
      case 'RUC': this.doctor.tipoDocumento = '06'; break;
      case 'PASAPORTE': this.doctor.tipoDocumento = '07'; break;
      case 'CARNET EXTRANJERIA': this.doctor.tipoDocumento = '04'; break;
      case 'OTROS': this.doctor.tipoDocumento = '00'; break;
    }
    console.log(this.doctor);
    this.isFormSubmitted = false;
    this.doctorService.crearDoctor(this.doctor).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire({
            title: 'Registrando...',
            allowOutsideClick: false,
          })
          Swal.showLoading()
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}