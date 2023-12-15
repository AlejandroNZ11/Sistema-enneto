import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Isede } from 'src/app/shared/models/sede';
import { routes } from 'src/app/shared/routes/routes';
import { SedeService } from 'src/app/shared/services/sede.service';
import { Idepartamento } from 'src/app/shared/models/departamento';
import { Iprovincia } from 'src/app/shared/models/provincia';
import { Idistrito } from 'src/app/shared/models/distrito';
import { UbicacionService } from 'src/app/shared/services/ubicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-sede',
  templateUrl: './editar-sede.component.html',
  styleUrls: ['./editar-sede.component.scss']
})
export class EditarSedeComponent implements OnInit {
  sede!: Isede;
  sedeSeleccionada ?:string;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  departamentos!: Idepartamento[];
  provincias!: Iprovincia[];
  distritos!: Idistrito[];
  departamento!: string;
  provincia!: string;
  isFormSubmitted = false;
  

  constructor(public bsModalRef: BsModalRef, public ubicacionService: UbicacionService, private sedeService: SedeService, public fb: FormBuilder) {
    this.form = this.fb.group({
      
      ubigeo: ['', Validators.required, ],
      nombre: ['', Validators.required],
      codigo: ['', Validators.required],
      direccion: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  
  }
  

  ngOnInit() {
    this.sedeService.obtenerSede(this.sedeSeleccionada!).subscribe(sede => {
      this.sede = sede || this.departamentos ;
      this.form.patchValue({
        nombre: this.sede.nombre,
        codigo: this.sede.codigo,
        direccion: this.sede.direccion, 
        ubigeo: this.sede.ubigeo,
        estado: this.sede.estado == '1' ? 'Activo' : 'Inactivo',
      });
    }) 

  }

  actualizarProvincias() {
    if (this.departamento) {
      const departamentoSeleccionado = this.departamentos.find(dep => dep.nombre === this.departamento);
      if (departamentoSeleccionado) {
        this.ubicacionService.obtenerProvincias(departamentoSeleccionado.departamentoId).subscribe(data => {
          this.provincias = data;  
        });
      }
    }
  }
  
  actualizarDistritos() {
    if (this.provincia) {
      const provinciaSeleccionada = this.provincias.find(prov => prov.nombre === this.provincia);
      if (provinciaSeleccionada) {
        this.ubicacionService.obtenerDistritos(provinciaSeleccionada.provinciaId).subscribe(data => {
          this.distritos = data;  
        });
      }
    }
  }
  
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }

  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }

  validarLongitudCodigo(): boolean {
    const control = this.form.get('codigo');
    return control?.value.length !== 4;
  }
  Cancelar() {
    this.bsModalRef.hide();
  }

  guardarSede() {
    if (!this.sede|| this.departamentos || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    
    const sedeActualizada: Isede = {
      sedeId: this.sede.sedeId,
      nombre: this.form.value.nombre,
      codigo: this.form.value.codigo,
      direccion: this.form.value.direccion,
      ubigeo: this.sede.ubigeo = this.form.get('ubigeo')?.value,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.sedeService.actualizarSede(sedeActualizada).subscribe(
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