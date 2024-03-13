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
    this.obtenerDataClinicaService();
  }

  obtenerDataClinicaService(){
    this.clinicasService.obtenerClinica(env.clinicaId).subscribe((data: Iclinicas) => {
      this.clinica = data;

      console.log(this.clinica);
      this.form = this.formBuilder.group({
        nombre: [this.clinica.nombre],
        direccion: [this.clinica.direccion],
        celular: [this.clinica.celular],
        email:[this.clinica.email],
        ruc: [this.clinica.ruc],
        fecha: [this.clinica.fecha],
        foto: [this.clinica.foto]
      });
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

  crearClinica() {
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      this.markAllFieldsAsTouched();
      return;
    }
    const formData = new FormData();
    formData.append('Nombres', this.clinica.nombre);
    formData.append('NumeroDocumento', this.clinica.ruc);
    formData.append('Celular', this.clinica.celular);
    formData.append('Direccion', this.clinica.direccion);
    formData.append('Email', this.clinica.email);
    formData.append('Fecha', this.clinica.fecha.toISOString().split('T')[0]);
    if (this.imagenSubirFoto) { formData.append('Foto', this.imagenSubirFoto, this.imagenSubirFoto.name) }
  }

  guardarClinica(){
    // if(!this.clinica || this.form.invalid){
    //   this.mostrarErrores = true;
    //   return;
    // }

    const clinicaActualizada: Iclinicas ={
      clinicaId: this.clinica.clinicaId,
      nombre: this.form.value.nombre,
      direccion: this.form.value.direccion,
      celular: this.form.value.celular,
      email: this.form.value.email,
      ruc: this.form.value.ruc,
      fecha: this.form.value.fecha,
      foto: this.form.value.foto,
      // foto: this.imagenSubirFoto ? this.imagenSubirFoto.split(',')[1] : null,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    }

    this.clinicasService.actualizarClinica(clinicaActualizada).subscribe(
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