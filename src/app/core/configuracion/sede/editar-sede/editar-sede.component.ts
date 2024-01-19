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
  sedeSeleccionada! :string;
  public routes = routes;
  form: FormGroup;
  public mostrarErrores = false;
  departamentos!: Idepartamento[];
  provincias!: Iprovincia[];
  distritos!: Idistrito[];
  departamento!: string;
  provincia!: string;
  isFormSubmitted = false;
  isLoading = false;

  constructor(
    public bsModalRef: BsModalRef, 
    public ubicacionService: UbicacionService, 
    private sedeService: SedeService, 
    public fb: FormBuilder
    ) {
    
    this.form = this.fb.group({
      departamento: ['', [Validators.required, Validators.maxLength(100)]],
      provincia: ['', [Validators.required, Validators.maxLength(100)]],
      ubigeo: ['', [Validators.required, Validators.maxLength(100)]],
      nombre: ['', Validators.required],
      codigo: ['', Validators.required],
      direccion: ['', Validators.required],
      estado: ['Activo', Validators.required],
    });
  }
  

  ngOnInit() {
    this.isLoading = true;
    this.ubicacionService.obtenerDepartamentos().subscribe(data => { this.departamentos = data; })
    if(this.sedeSeleccionada != ''){
    this.sedeService.obtenerSede(this.sedeSeleccionada).subscribe(sede => {
      if (sede){
      this.sede = sede ;

      this.form.patchValue({
        nombre: this.sede.nombre,
        codigo: this.sede.codigo,
        direccion: this.sede.direccion,
        ubigeo: this.sede.ubigeo,
        estado: this.sede.estado == '1' ? 'Activo' : 'Inactivo',
      });
      const departamentoId = (sede.ubigeo.substring(0, 2));
      const provinciaId = (sede.ubigeo.substring(0, 4));
      this.cargarUbicacion(departamentoId, provinciaId);
        }
      }) 
    }
  }

  actualizarProvincias(id?: string) {
    if (this.departamento) {
      if (id) {
        this.ubicacionService.obtenerProvincias(id).subscribe(data => {
          this.provincias = data;
        })
      }
        const departamentoEncontrado = this.departamentos.find(dep => dep.nombre === this.departamento!.toString())!.departamentoId;
        this.ubicacionService.obtenerProvincias(departamentoEncontrado).subscribe(data => {
          this.provincias = data;
        })
      }
      this.form.patchValue({
        provincia: '',
      });
      
    
  }
  
  actualizarDistritos(id?: string) {
    if (this.provincia) {
      if (id) {
        this.ubicacionService.obtenerDistritos(id).subscribe(data => {
          this.distritos = data;
        })
      }
        const provinciaEncotrada = this.provincias.find(prov => prov.nombre == this.provincia!.toString())!.provinciaId;
        this.ubicacionService.obtenerDistritos(provinciaEncotrada).subscribe(data => {
          this.distritos = data;
        })
      }
      this.form.patchValue({
        ubigeo: '',
      });
    
  }
  
  cargarUbicacion(departamento: string, provincia: string) {
    if (this.departamentos) {this.departamento = this.departamentos.find(dep => dep.departamentoId === departamento)!.nombre;
    }
    this.ubicacionService.obtenerProvincias(departamento).subscribe(data => {
      this.provincias = data;
      this.provincia = this.provincias.find(prov => prov.provinciaId === provincia)!.nombre;
      this.ubicacionService.obtenerDistritos(provincia).subscribe(data => {
        this.distritos = data;
        this.form.patchValue({
          departamento: this.departamento,
          provincia: this.provincia,
        });
      });
    })
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
    if (!this.sede|| this.form.invalid) {
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