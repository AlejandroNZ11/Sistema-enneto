import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Iaseguradoras } from 'src/app/shared/models/aseguradoras';
import { Idepartamento } from 'src/app/shared/models/departamento';
import { Idistrito } from 'src/app/shared/models/distrito';
import { PacienteEditar } from 'src/app/shared/models/paciente';
import { Ipais } from 'src/app/shared/models/pais';
import { Iprovincia } from 'src/app/shared/models/provincia';
import { routes } from 'src/app/shared/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {
  constructor(public formBuilder: FormBuilder) { }
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
  sexoPaciente!: string;
  estadoPaciente!: number;
  form!: FormGroup;
  date = new FormControl(new Date());
  paises!: Ipais[];
  departamentos!: Idepartamento[];
  provincias!: Iprovincia[];
  distritos!: Idistrito[];
  aseguradoras!: Iaseguradoras[];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      apellido: ['', [Validators.required, Validators.maxLength(100)]],
      edad: [{ value: '', disabled: true }, [Validators.maxLength(2), Validators.minLength(1), Validators.required]],
      ocupacion: ['', [Validators.required, Validators.maxLength(100)]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      sexo: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required, Validators.maxLength(100)]],
      fotoPaciente: ['', Validators.required],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      estudios: ['', [Validators.required, Validators.maxLength(100)]],
      pais: ['', [Validators.required, Validators.maxLength(100)]],
      departamento: ['', [Validators.required, Validators.maxLength(100)]],
      provincia: ['', [Validators.required, Validators.maxLength(100)]],
      distrtito: ['', [Validators.required, Validators.maxLength(100)]],
      lugarNacimiento: ['', [Validators.maxLength(100)]],
      tipoPaciente: ['', [Validators.required, Validators.maxLength(100)]],
      celular: ['', [Validators.maxLength(9), Validators.minLength(9), Validators.required]],
      afiliacion: ['', [Validators.required, Validators.maxLength(100)]],
      informacionClinica: ['', [Validators.required, Validators.maxLength(100)]],
      fechaNacimiento: ['', [Validators.required, this.fechaNacimientoValidator()]],
      historia: ['', [Validators.required, Validators.maxLength(100)]],
      empresa: ['', [Validators.required, Validators.maxLength(100)]],
      observacion: ['', [Validators.required, Validators.maxLength(100)]],
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
  infoClinica_LISTA: data[] = [
    { value: 'Por redes sociales', },
    { value: 'Por un amigo' },
  ];
  historia_LISTA: data[] = [
    { value: 'ANTIGUO', },
    { value: 'NUEVO' },
  ];
  tipoPaciente_LISTA: data[] = [
    { value: 'Clásico', },
    { value: 'Platinum' },
    { value: 'Golden' },
    { value: 'Black' },
  ];
  estadoCivil_LISTA: data[] = [
    { value: 'Casado(a)', },
    { value: 'Soltero(a)' },
    { value: 'Viudo(a)' },
    { value: 'Divorciado(a)' },
  ];
  gradoInstruccion_LISTA: data[] = [
    { value: 'Secundaria Completa', },
    { value: 'Universitaria Superior' },
    { value: 'Primaria Completa' },
    { value: 'No especifica' },
  ];
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
      console.log(edad);
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
  actualizarPaciente(){}
}
