import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { ClinicasService } from 'src/app/shared/services/clinicas.service';
import { DataClinicas, Clinicas, Iclinicas, ClinicasResponse } from 'src/app/shared/models/clinicas';
import { AgregrarClinicaComponent } from './agregrar-clinica/agregrar-clinica.component';
import { EditarClinicaComponent } from './editar-clinica/editar-clinica.component';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { Subject } from 'rxjs';
import { Route, Routes } from '@angular/router';

@Component({
  selector: 'app-clinica',
  templateUrl: './clinica.component.html',
  styleUrls: ['./clinica.component.scss']
})
export class ClinicaComponent implements OnInit {
  isFormSubmitted = false;
  clinica!: Iclinicas;
  cantidadruc!: 11;
  public routes= routes;
  columnas: string[] = []
  acciones: string[] = []
  clinicaSeleccionado: Clinicas = new Clinicas();
  dataSource!:MatTableDataSource<Iclinicas>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef!: BsModalRef;
  limit: number = this.pageSize;
  imagenSubirFoto!: File;
  form!: FormGroup;
  public deleteIcon = true;
  
  constructor(public clinicasService: ClinicasService,private formBuilder: FormBuilder ){
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: [''],
      direccion: [''],
      celular: [''],
      email:[''],
      ruc: [''],
      fecha: [''],
      foto: ['']
    });
    this.obtenerDataClinicaService();
  }

  obtenerDataClinicaService(){
    this.clinicasService.obtenerClinica(env.clinicaId).subscribe((data: Iclinicas) => {
      this.clinica = data;

      console.log(this.clinica);
      this.form.patchValue(data)
    });
  }

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
  
  isCantidadNroRuc(controlName: string) {
    const control = this.form.get(controlName);
    console.log(this.cantidadruc);
    if (control && control.value) {
      const cantidadCorrecta = this.cantidadruc;
      return control.value.length !== cantidadCorrecta;
    }
    return false;
  }

  guardarClinica(){
    console.log(this.clinica);

    const formData = new FormData();
    formData.append('Nombre', this.form.controls["nombre"].value);
    formData.append('RUC', this.form.controls["ruc"].value);
    formData.append('Celular', this.form.controls["celular"].value);
    formData.append('Direccion', this.form.controls["direccion"].value);
    formData.append('Email', this.form.controls["email"].value);
    formData.append('Fecha', this.form.controls["fecha"].value.toString().split('T')[0]);
    if (this.imagenSubirFoto) { formData.append('Foto', this.imagenSubirFoto, this.imagenSubirFoto.name) }

    this.clinicasService.actualizarClinica(formData, this.clinica.clinicaId).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
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