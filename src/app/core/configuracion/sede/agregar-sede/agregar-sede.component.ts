import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { sede } from 'src/app/shared/models/sede';
import { routes } from 'src/app/shared/routes/routes';
import { SedeService } from 'src/app/shared/services/sede.service';
import { Idepartamento } from 'src/app/shared/models/departamento';
import { Iprovincia } from 'src/app/shared/models/provincia';
import { Idistrito } from 'src/app/shared/models/distrito';
import { UbicacionService } from 'src/app/shared/services/ubicacion.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-sede',
  templateUrl: './agregar-sede.component.html',
  styleUrls: ['./agregar-sede.component.scss']
})
export class AgregarSedeComponent implements OnInit{
  sedeAgregada$: Subject<boolean> = new Subject<boolean>();
  Sede: sede = new sede();
  public routes = routes;
  
  constructor(public formBuilder: FormBuilder, public ubicacionService: UbicacionService,public bsModalRef: BsModalRef, private sedeService: SedeService,
    ) {}

  form!: FormGroup;
  isFormSubmitted = false;
  public mostrarErrores = false;
  departamentos!: Idepartamento[];
  provincias!: Iprovincia[];
  distritos!: Idistrito[];
  departamento!: string;
  provincia!: string;
  
  ngOnInit(): void { 
    this.ubicacionService.obtenerDepartamentos().subscribe(data => { this.departamentos = data; })
    this.form = this.formBuilder.group({
      departamento: ['', [Validators.required, Validators.maxLength(100)]],
      provincia: ['', [Validators.required, Validators.maxLength(100)]],
      ubigeo: ['', [Validators.required, Validators.maxLength(100)]],
      nombre: ['', Validators.required],
      codigo: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  actualizarProvincias() {
    if (this.departamento) {
      const departamentoEncontrado = this.departamentos.find(dep => dep.nombre === this.departamento)!.departamentoId;
      this.ubicacionService.obtenerProvincias(departamentoEncontrado).subscribe(data => {
        this.provincias = data;
      })
    }
  }
  actualizarDistritos() {
    if (this.provincia) {
      const provinciaEncotrada = this.provincias.find(prov => prov.nombre == this.provincia)!.provinciaId;
      this.ubicacionService.obtenerDistritos(provinciaEncotrada).subscribe(data => {
        this.distritos = data;
      })
    }
  }
  
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }

  validarLongitudCodigo(): boolean {
    const control = this.form.get('codigo');
    return control?.value.length !== 4;
  }

  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
  Cancelar() {
    this.sedeAgregada$.next(false);
    this.bsModalRef.hide()
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearSede() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    const formData = new FormData();
    this.Sede.nombre = this.form.get("nombre")?.value;
    this.Sede.codigo = this.form.get("codigo")?.value;
    this.Sede.direccion = this.form.get("direccion")?.value;
    this.Sede.estado= 1;
    formData.append('ubigeo', this.Sede.ubigeo.toString());
    console.log(this.Sede);
    this.sedeService.crearSede(this.Sede).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
          this.sedeAgregada$.next(true);
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.error(error);
      });
  }
}

