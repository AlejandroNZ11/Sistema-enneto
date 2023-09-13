import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getMonth } from 'ngx-bootstrap/chronos';
import { parseTwoDigitYear } from 'ngx-bootstrap/chronos/units/year';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { DoctorRequest } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from 'src/app/shared/services/doctor.service';
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

  constructor(public formBuilder: FormBuilder, public doctorService: DoctorService,) { }

  doctor: DoctorRequest = new DoctorRequest();
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
      usuario: ['', [Validators.required, Validators.maxLength(50)]],
      contrasena: ['', [Validators.required, Validators.maxLength(50)]],
      celular: ['', [Validators.maxLength(9), Validators.minLength(9)]],
      telefono: ['', [Validators.maxLength(7), Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      tipoDocumento: ['', [Validators.required, Validators.maxLength(40)]],
      numeroDocumento: ['', [Validators.required, Validators.maxLength(20)]],
      ruc: ['', [Validators.maxLength(50)]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      fechaNacimiento: ['', [Validators.required]],
      sexo: [getCheckedSexo, [Validators.required]],
      estado: [getCheckedEstado, [Validators.required]],
      especialidades: ['', [Validators.required, Validators.maxLength(100)]],
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
  especialidad_LISTA: dataGuid[] = [
    { value: 'Ortodoncia', guid: '6b9e5b30-9b94-4f78-a090-6e01d5b16201' },
    { value: 'Odontopediatría', guid: '8a0a6a3e-7315-45d7-a54d-c6473c5f8d17' },
    { value: 'Implantología', guid: '69121893-3AFC-4F92-85F3-40BB5E7C7E29' },
    { value: 'General', guid: 'CB77CCE6-C2CB-471B-BDD4-5DAC8C93B756' },
    { value: 'Endodoncia', guid: '4B900A74-E2D9-4837-B9A4-9E828752716E' },
    { value: 'Cirugia bocal y Maxilofacial', guid: 'AEDC617C-D035-4213-B55A-DAE5CDFCA366' },
  ];
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
    if (this.form.invalid) {
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
    console.log(this.doctor);

    this.doctor.especialidades = this.especialidades;

    switch (this.form.get('tipoDocumento')!.value) {
      case 'DNI': this.doctor.tipoDocumento = '01'; break;
      case 'RUC': this.doctor.tipoDocumento = '06'; break;
      case 'PASAPORTE': this.doctor.tipoDocumento = '07'; break;
      case 'CARNET EXTRANJERIA': this.doctor.tipoDocumento = '04'; break;
      case 'OTROS': this.doctor.tipoDocumento = '00'; break;
    }
    console.log(this.doctor);
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