import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from 'src/app/shared/services/doctor.service';
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

  constructor(public formBuilder: FormBuilder, public doctorService: DoctorService,) { }

  doctor: Doctor = new Doctor();
  form!: FormGroup;
  imagenTemp!: string;
  imagenSubir!: File;
  reader = new FileReader();
  isFormSubmitted = false;
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
      usuario: ['', [Validators.required, Validators.maxLength(50)]],
      contrasena: ['', [Validators.required, Validators.maxLength(50)]],
      celular: ['', [Validators.maxLength(9), Validators.minLength(9)]],
      telefono: ['', [Validators.maxLength(7), Validators.minLength(7)]],
      correo: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      tipoDoc: ['', [Validators.required, Validators.maxLength(40)]],
      nroDoc: ['', [Validators.required, Validators.maxLength(20)]],
      ruc: ['', [Validators.maxLength(50)]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      fechaNac: ['', [Validators.required]],
      fechaReg: ['', [Validators.required]],
      sexo: [getCheckedSexo, [Validators.required]],
      estado: [getCheckedEstado, [Validators.required]],
      especialidad: ['', [Validators.required, Validators.maxLength(100)]],
      colegiatura: ['', [Validators.required, Validators.maxLength(100)]],
      foto: [''],
    })
  }
  public routes = routes;
  public tipoDoc !: string;
  public especialidad !: string;
  public deleteIcon = true;

  sexo_LISTA = [
    { name: 'Masculino', value: 'Masculino', checked: false },
    { name: 'Femenino', value: 'Femenino', checked: false },
  ]
  estado_LISTA = [
    { name: 'Activo', value: 'Activo', checked: false },
    { name: 'Inactivo', value: 'Inactivo', checked: false },
  ]
  tipoDoc_LISTA: data[] = [
    { value: 'Orthopedics' },
    { value: 'Radiology' },
    { value: 'Dentist' },
  ];
  especialidad_LISTA: data[] = [
    { value: 'DNI' },
    { value: 'Carnet de Extranjeria' },
    { value: 'Pasaporte' },
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
  deleteIconFunc() {
    this.imagenTemp = "assets/img/favicon.png"
  }
  seleccionImage(event: any) {
    const archivo = event.target.files[0]
    if (!archivo) {
      this.imagenSubir = null as any;
      return;
    }
    //validar que solo sea imagen 
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null as any;
      return;
    }
    this.imagenSubir = archivo;

    let urlImagenTemp = this.reader.readAsDataURL(archivo);

    this.reader.onload = () => {
      this.imagenTemp = this.reader.result as any;
    }
  }

  crearDoctor() {
    this.isFormSubmitted = true;
    if (this.form.invalid) {
      Swal.fire('Error', 'Complete todos los campos requeridos (*)', 'warning');
      return;
    }
    if (this.reader.result != null) {
      this.doctor.foto = this.reader.result as string;
      this.doctor.foto = this.doctor.foto.replace(/^data:image\/[a-z]+;base64,/, "");
    }
    this.doctor.especialidad = this.especialidad;
    this.doctor.tipoDoc = this.tipoDoc;

    Swal.fire({
      title: 'Registrando...',
      allowOutsideClick: false,
    })
    Swal.showLoading()
    this.doctorService.crearDoctor(this.doctor);
  }
}
