import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataRoles, Iroles, roles } from 'src/app/shared/models/rol';
import { routes } from 'src/app/shared/routes/routes';
import { RolesService } from 'src/app/shared/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-roles',
  templateUrl: './agregar-roles.component.html',
  styleUrls: ['./agregar-roles.component.scss']
})
export class AgregarRolesComponent implements OnInit{

  Roles: roles = new roles();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  ngOnInit(): void { }

  constructor(public bsModalRef: BsModalRef, private rolService: RolesService,
    public fb: FormBuilder,) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
  Cancelar() {
    this.bsModalRef.hide()
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearRol() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Roles.nombre = this.form.get("nombre")?.value; 
    this.Roles.estado = 1
    console.log(this.Roles);
    this.rolService.crearRoll(this.Roles).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.error(error);
      });
  }
}


